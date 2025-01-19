<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Card from '$lib/c/ui/card'
	let { data } = $props()
</script>

<svelte:head>
	<title>Your Habits</title>
</svelte:head>

<h3 class="text-xl font-medium md:text-2xl">Your habits</h3>
<p class="text-muted-foreground">The habits you're gonna do</p>

<div class="mx-auto mt-6 flex w-[90%] max-w-screen-md flex-col gap-4">
	{#each data.habits as habit}
		<Card.Root class="cursor-pointer" role="link" onclick={() => goto(`/habits/${habit.id}`)}>
			<Card.Header>
				<Card.Title>{habit.name}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{habit.description}</p>
			</Card.Content>
			<Card.Footer class="flex items-center justify-between">
				<p>{habit.goal_count} goals</p>
				<p>{habit.task_count} tasks</p>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
