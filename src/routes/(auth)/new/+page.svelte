<script lang="ts">
	import { Button } from '$lib/c/ui/button'
	import { WandSparkles } from 'lucide-svelte'
	import { Alert, AlertTitle, AlertDescription } from '$lib/c/ui/alert'
	import { enhance } from '$app/forms'
	let { form } = $props()
</script>

<svelte:head>
	<title>Create a new Habit</title>
</svelte:head>

<form
	class="absolute mx-auto mt-10 w-[95%] max-w-screen-lg"
	use:enhance
	method="POST"
	enctype="multipart/form-data"
>
	{#if Array.isArray(form?.errors)}
		<Alert variant="destructive" class="mb-4">
			<AlertTitle>An error occured</AlertTitle>
			<AlertDescription>
				{#each form.errors as error}
					<p>{error}</p>
				{/each}
			</AlertDescription>
		</Alert>
	{/if}
	<label class="relative left-4 top-3 bg-white px-2 py-1 font-mono text-sm" for="habit"
		>i wanna do ...</label
	>
	<textarea
		id="habit"
		rows={10}
		placeholder="Type something you wanna do"
		name="habit"
		class="block w-full rounded-xl border-2 border-muted-foreground px-2 pb-6 pt-3 font-mono text-lg text-muted-foreground"
	></textarea>

	<div
		class="relative -top-[50%] left-[50%] w-min -translate-x-[50%] -translate-y-[50%] bg-white px-2"
	>
		<Button type="submit" class="flex items-center rounded-full">
			<WandSparkles /> Create habit
		</Button>
	</div>
	<p class="mx-auto w-[90%] max-w-screen-lg text-center text-muted-foreground">
		Be sure to enter essential information like how much time you want to spend on the habit a day,
		by when do you want to reach the habit, etc. Giving more information will get you a better plan!
	</p>
	<!-- <p class="text-center">
		<Button
			value="true"
			class="text-muted-foreground underline-offset-4 hover:underline"
			name="without-ai"
			variant="link"
			type="submit">Create without AI</Button
		>
	</p> -->
</form>
