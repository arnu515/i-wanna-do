import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import * as v from 'valibot'
import FIRST_PROMPT from './prompt.txt?raw'
import { ALLOWED_MODELS, doChat } from '$lib/ai'
import { hobby, type Hobby, type Task as LLMTask } from './util'
import sql, { type Goal, type Habit } from '$lib/db'
import { ulid } from 'ulid'
import type postgres from 'postgres'

const SYSTEM_PROMPT =
	'You are an expert at designing structured goals and tasks to help users build and sustain habits effectively.'

async function addTask(
	sql: postgres.TransactionSql,
	task: LLMTask,
	habit_id: Habit['id'],
	user_id: string,
	goal_id: string | null
) {
	const id = ulid()
	await sql`INSERT INTO tasks ${sql({
		id,
		title: task.title,
		description: task.description,
		habit_id,
		user_id,
		goal_id,
		is_completed: false,
		created_at: new Date(),
		reminder_multiplier: task.reminder?.multiplier ?? null,
		reminder_unit: task.reminder?.unit ?? null,
		reminder_subunit: task.reminder?.start_at ?? null
	})}`
	return sql`INSERT INTO tasks ${sql(task.subtasks.map(i => ({ id: ulid(), title: i.title, description: i.description, reminder_multiplier: i.reminder?.multiplier ?? null, reminder_unit: i.reminder?.unit ?? null, reminder_subunit: i.reminder?.start_at ?? null, task_id: id })))}`
}

async function createHabit(data: Hobby, explanation: string, userId: string) {
	return await sql.begin(async sql => {
		const id = ulid()
		await sql`INSERT INTO habits ${sql({ id, name: data.name, description: data.description, ai_explanation: explanation, user_id: userId })}`
		const goalIds = await sql<{ id: Goal['id'] }[]>`INSERT INTO goals ${sql(
			data.goals.map(i => ({
				id: ulid(),
				title: i.title,
				habit_id: id,
				user_id: userId,
				description: i.description
			}))
		)} RETURNING id`
		data.goals.flatMap(async ({ tasks }, idx) => {
			return tasks.map(t => addTask(sql, t, id, userId, goalIds[idx].id))
		})
		data.tasks.map(t => addTask(sql, t, id, userId, null))
		return id
	})
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) redirect(302, '/auth')
		const fd = await request.formData()
		const habitParseRes = v.safeParse(
			v.pipe(
				v.string('Habit must be a string'),
				v.trim(),
				v.minLength(20, 'Please describe your habit in more detail. (Atleast 20 characters)'),
				v.maxLength(2047, 'Habit must be a maximum of 2047 characters')
			),
			fd.get('habit')
		)
		if (!habitParseRes.success)
			return fail(400, {
				done: false,
				errors: habitParseRes.issues.map(i => i.message),
				messages: undefined
			})
		let modelIdx = 0
		while (modelIdx < ALLOWED_MODELS.length) {
			const res = await doChat(ALLOWED_MODELS[modelIdx], [
				{ role: 'system', content: SYSTEM_PROMPT },
				{ role: 'user', content: FIRST_PROMPT },
				{ role: 'user', content: habitParseRes.output }
			])
			console.log(res)
			if (res.error === 'ratelimit') {
				// TODO: send message to user about rate limit
				modelIdx++
				if (modelIdx === ALLOWED_MODELS.length)
					return fail(429, {
						done: false,
						errors: [
							`All models are rate limited! Please try again in ${res.timeRemaining} seconds`
						],
						messages: undefined
					})
				continue
			}
			if (res.error === 'other') {
				return fail(res.status, { done: false, errors: [res.message], messages: undefined })
			}
			const message = res.messages
				.filter(i => i.role === 'assistant')
				.map(i => i.content)
				.join('\n\n')
				.match(/```json((?:.|\n)*)```((?:.|\n)*)/im)
			if (!message) {
				return fail(500, {
					done: false,
					errors: ['The LLM did not provide an expected response.'],
					messages: res.messages.map(i => i.content).join('\n\n')
				})
			}
			console.log('JSON:\n')
			console.log(message[1])
			console.log('-------')
			console.log('Explanation:')
			console.log(message[2])
			const parseRes = v.safeParse(hobby, JSON.parse(message[1].trim()))
			if (!parseRes.success)
				return fail(400, {
					done: false,
					errors: ['Could not parse LLM output', ...parseRes.issues.map(i => i.message)],
					messages: message[1].trim() + '\n\n' + message[2].trim()
				})
			const habitId = await createHabit(parseRes.output, message[2].trim(), locals.user.id)
			redirect(302, '/habits/' + habitId)
			// return { done: true, data: parseRes.output, explanation: message[2].trim() }
		}
	}
}
