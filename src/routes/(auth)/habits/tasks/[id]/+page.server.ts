import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import sql, { Task, type Habit } from '$lib/db'

export const load: PageServerLoad = async ({ locals: { user }, params: { id } }) => {
	if (!user) redirect(302, '/auth')

	const [task] = await sql<
		(Task & { name: Habit['name'] })[]
	>`SELECT t.*, h.name FROM tasks t, habits h WHERE t.id = ${id} AND h.id = t.habit_id AND t.user_id = ${user.id}`
	if (!task) error(404, 'Could not find task')

	const subtasks = await sql<
		Task[]
	>`SELECT * FROM tasks WHERE task_id = ${id} AND user_id = ${user.id}`

	return {
		task,
		subtasks
	}
}

export const actions: Actions = {
	default: async ({ params: { id }, locals: { user } }) => {
		if (!user) redirect(302, '/auth')

		const cur = await sql`SELECT is_completed FROM tasks WHERE id = ${id} AND user_id = ${user.id}`
		if (cur.count != 1) error(404, 'Could not find task')
		if (!cur[0].is_completed) {
			// check if all subtasks are completed
			const su =
				await sql`SELECT count(id) as count FROM tasks WHERE task_id = ${id} AND user_id = ${user.id} AND is_completed = false`
			if (su[0].count > 0) error(400, 'You must complete all subtasks before completing this task')
		}
		await sql`UPDATE tasks SET is_completed = NOT is_completed WHERE id = ${id} AND user_id = ${user.id}`
	}
}
