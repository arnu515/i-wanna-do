<script lang="ts">
	import * as Card from '$lib/c/ui/card'
	import * as Dialog from '$lib/c/ui/dialog'
	import { parse } from 'marked'
	import { goto } from '$app/navigation'
	let { data } = $props()
	console.log(data.goals)
</script>

<svelte:head>
	<title>{data.habit.name}</title>
</svelte:head>

<h3 class="text-xl font-medium md:text-2xl">{data.habit.name}</h3>
<p class="mb-4 text-muted-foreground">{data.habit.description}</p>

{#if data.habit.ai_explanation}
	<h3 class="my-4 text-xl font-medium md:text-2xl">A detailed explanation</h3>
	<div class="prose">
		{@html parse(data.habit.ai_explanation)}
	</div>
{/if}

<h3 class="mt-6 text-xl font-medium md:text-2xl">Your Goals</h3>

<div class="my-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each data.goals as goal}
		<Card.Root>
			<Card.Header>
				<Card.Title>{goal.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{goal.description}</p>
				<h4 class="mt-2 flex items-center justify-between font-medium">
					Tasks:
					<span class="text-muted-foreground">{goal.done}/{goal.total} done</span>
				</h4>
				<div class="my-2 h-2 rounded-full bg-muted">
					<div
						class="h-2 rounded-full bg-primary"
						style="width: {(Number(goal.done) / Number(goal.total)) * 100}%"
					></div>
				</div>
				<div class="flex flex-col justify-center gap-2">
					{#each goal.tasks as task}
						<a href="/habits/tasks/{task.id}" class:line-through={task.is_completed}>{task.title}</a
						>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<h3 class="mt-6 text-xl font-medium md:text-2xl">Other tasks</h3>

<div class="my-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each data.tasks as task}
		<Card.Root class="cursor-pointer" role="link" onclick={() => goto('/habits/tasks/' + task.id)}>
			<Card.Header>
				<Card.Title>{task.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{task.description}</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
