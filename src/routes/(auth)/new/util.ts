import * as v from 'valibot'

export const reminder = v.nullish(
	v.object({
		unit: v.nullish(v.picklist(['minutes', 'hours', 'days'] as const)),
		multiplier: v.nullish(v.number()),
		start_at: v.nullish(v.pipe(v.string(), v.regex(/^\d\d-\d\d$/)))
	})
)
export const tasks = v.array(
	v.object({
		title: v.string(),
		description: v.string(),
		reminder,
		subtasks: v.array(
			v.object({
				title: v.string(),
				description: v.string(),
				reminder
			})
		)
	})
)

export const hobby = v.object({
	name: v.string(),
	description: v.string(),
	tasks,
	goals: v.array(
		v.object({
			title: v.string(),
			description: v.string(),
			tasks
		})
	)
})

export type Hobby = v.InferInput<typeof hobby>
export type Task = v.InferInput<typeof tasks>[number]
