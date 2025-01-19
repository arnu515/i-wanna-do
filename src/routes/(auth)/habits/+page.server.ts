import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import sql, { type Habit } from '$lib/db'

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (!user) redirect(302, '/auth')

	return {
		habits: await sql<
			(Habit & { task_count: string; goal_count: string })[]
		>`SELECT *, coalesce((select count(g.id) FROM goals g WHERE g.habit_id = h.id), 0) as goal_count, coalesce((select count(t.id) FROM tasks t WHERE t.habit_id = h.id), 0) as task_count FROM habits h WHERE user_id = ${user.id}`
	}
}
