import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import sql, { type Habit, type Task } from '$lib/db'
import { Goal } from 'lucide-svelte'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth')
	const tasks = await sql<
		{
			id: Task['id']
			description: Task['description']
			title: Task['title']
			name: Habit['name']
		}[]
	>`SELECT t.id, t.title, t.description, h.name FROM tasks t, habits h WHERE t.user_id = ${locals.user.id} AND t.task_id IS NULL AND t.is_completed = false AND t.habit_id = h.id ORDER BY random() LIMIT 12`

	const goals = await sql<
		{
			id: Goal['id']
			description: Goal['description']
			title: Goal['title']
			name: Habit['name']
			habit_id: Habit['id']
			done: string // is actually number
			total: string // is actually number
		}[]
	>`SELECT g.id, g.description, g.title, h.name, g.habit_id, coalesce((select count(t.id) from tasks t where t.is_completed = true AND t.goal_id = g.id), 0)::text as done, coalesce((select count(t.id) from tasks t where t.goal_id = g.id), 0)::text as total FROM goals g, habits h WHERE g.user_id = ${locals.user.id} AND g.habit_id = h.id ORDER BY random() LIMIT 4`
	return { tasks, goals }
}
