import { redirect, error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import sql, { type Habit, type Task } from '$lib/db'

export const load: PageServerLoad = async ({ locals: { user }, params: { id } }) => {
	if (!user) redirect(302, '/auth')
	const [habit] = await sql<Habit[]>`SELECT * FROM habits WHERE user_id = ${user.id} AND id = ${id}`
	if (!habit) error(404, 'Not found')
	const goals = await sql`SELECT * FROM goals WHERE habit_id = ${id} AND user_id = ${user.id}`
	await Promise.all(
		goals.map(async ({ id: goal_id }, idx) => {
			const tasks = await sql<
				Task[]
			>`SELECT * FROM tasks WHERE habit_id = ${id} AND goal_id = ${goal_id} AND user_id = ${user.id}`
			goals[idx].tasks = tasks
			goals[idx].total = tasks.count
			goals[idx].done = tasks.filter(i => i.is_completed).length
		})
	)
	const tasks =
		await sql`SELECT * FROM tasks WHERE habit_id = ${id} AND user_id = ${user.id} AND goal_id IS NULL`

	return {
		habit,
		goals,
		tasks
	}
}
