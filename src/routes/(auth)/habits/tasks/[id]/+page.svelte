<script lang="ts">
	import { Button } from '$lib/c/ui/button'
	import { ArrowLeft, Calendar, Clock } from 'lucide-svelte'
	import * as Card from '$lib/c/ui/card'
	import { goto } from '$app/navigation'
	let { data } = $props()
</script>

<h3 class="flex items-center gap-4 text-xl font-medium md:text-2xl">
	<Button
		variant="ghost"
		href={data.task.task_id
			? `/habits/tasks/${data.task.task_id}`
			: `/habits/${data.task.habit_id}`}
		size="icon"><ArrowLeft class="size-7" /></Button
	>
	{data.task.name}
</h3>

<h2 class="mt-8 text-2xl font-medium md:text-3xl">{data.task.title}</h2>
<p class="my-4 text-lg md:text-xl">{data.task.description}</p>

{#if data.task.reminder_unit || data.task.reminder_subunit}
	<div class="flex items-center gap-4 text-muted-foreground">
		{#if data.task.reminder_unit}<Calendar class="size-5" /><span>
				every {data.task.reminder_value || 1}
				{data.task.reminder_unit}</span
			>{/if}
		{#if data.task.reminder_subunit}<Clock />
			<span> at {data.task.reminder_subunit.replace('-', ':')}</span>{/if}
	</div>
{/if}

{#if !data.task.is_completed}
	{#if data.subtasks?.every(i => i.is_completed)}
		<form method="POST" class="my-4 flex justify-end">
			<Button type="submit">Mark as Complete</Button>
		</form>
	{:else}
		<p class="text-end text-muted-foreground">
			Complete all subtasks to mark this task as complete
		</p>
	{/if}
{:else}
	<form method="POST" class="my-4 flex items-center justify-end gap-4">
		<span class="text-green-500">This task has been completed!</span>
		<Button type="submit" size="sm">Mark as Incomplete</Button>
	</form>
{/if}

{#if data.subtasks.length}
	<h3 class="text-xl font-medium md:text-2xl">Subtasks</h3>
	{#if !data.task.is_completed}
		<p class="mb-4 text-muted-foreground">Complete these subtasks to complete this task</p>
	{/if}

	<div class="my-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
		{#each data.subtasks as task}
			<Card.Root
				class="cursor-pointer"
				role="link"
				onclick={() => goto('/habits/tasks/' + task.id)}
			>
				<Card.Header>
					<Card.Title>{task.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>{task.description}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
{/if}
