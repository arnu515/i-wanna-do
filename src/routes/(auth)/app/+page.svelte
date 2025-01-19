<script lang="ts">
	import * as Card from '$lib/c/ui/card'
	import { goto } from '$app/navigation'
	let { data } = $props()
</script>

<svelte:head>
	<title>I wanna do ... !</title>
</svelte:head>

<h3 class="text-xl font-medium md:text-2xl">Let's Do!</h3>
<p class="text-muted-foreground">Here are some tasks you can make progress on</p>

<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each data.tasks as task}
		<Card.Root class="cursor-pointer" role="link" onclick={() => goto('/habits/tasks/' + task.id)}>
			<Card.Header>
				<Card.Title>{task.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="truncate">{task.description}</p>
			</Card.Content>
			<Card.Footer>
				<p class="text-medium text-sm text-muted-foreground"><strong>Habit:</strong> {task.name}</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

<h3 class="text-xl font-medium md:text-2xl">Your goals</h3>
<p class="text-muted-foreground">Here's your goal progress:</p>

<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each data.goals as goal}
		<Card.Root class="cursor-pointer" role="link" onclick={() => goto(`/habits/${goal.habit_id}`)}>
			<Card.Header>
				<Card.Title>{goal.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="truncate">{goal.description}</p>
				<p class="text-right text-muted-foreground">{goal.done}/{goal.total} done</p>
				<div class="h-2 rounded-full bg-muted">
					<div
						class="h-2 rounded-full bg-primary"
						style="width: {(Number(goal.done) / Number(goal.total)) * 100}%"
					></div>
				</div>
			</Card.Content>
			<Card.Footer>
				<p class="text-medium text-sm text-muted-foreground"><strong>Habit:</strong> {goal.name}</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
