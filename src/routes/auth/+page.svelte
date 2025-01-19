<script lang="ts">
	import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '$lib/c/ui/card'
	import { Label } from '$lib/c/ui/label'
	import { Input } from '$lib/c/ui/input'
	import { Button } from '$lib/c/ui/button'
	import { Separator } from '$lib/c/ui/separator'
	import { Alert, AlertTitle, AlertDescription } from '$lib/c/ui/alert'
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'

	let { form }: { form: ActionData } = $props()
</script>

<svelte:head>
	<title>I wanna Do! | Authenticate</title>
	<meta name="description" content="Sign in or create an account at I wanna Do!" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-extrabold text-gray-900">I wanna Do!</h2>
		</div>
		<Card>
			<CardHeader>
				<CardTitle>
					{#if typeof form?.signUp === 'undefined'}
						Enter your Email
					{:else if form.signUp}
						Create account
					{:else}
						Log in
					{/if}
				</CardTitle>
			</CardHeader>
			<CardContent>
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
				<form method="POST" use:enhance enctype="multipart/form-data" class="space-y-4">
					{#if typeof form?.signUp === 'undefined'}
						<div class="space-y-2">
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="me@example.com"
								value={form?.email}
								required
								minlength={4}
								maxlength={511}
							/>
						</div>
					{:else}
						<p class="flex items-center justify-between">
							<span><strong>Email:</strong> {form.email}</span>
							<a class="text-sm text-blue-500 underline" href="/auth" data-sveltekit-reload
								>Not you?</a
							>
						</p>
						<input type="hidden" name="email" value={form.email} />
						<div class="space-y-2">
							<Label for="password">Password</Label>
							<Input
								id="password"
								type="password"
								name="password"
								placeholder="************"
								required
								minlength={8}
								maxlength={511}
							/>
						</div>
						<input type="hidden" name="signup" value={form.signUp} />
					{/if}
					<Button type="submit" class="w-full">
						{#if typeof form?.signUp === 'undefined'}
							Continue
						{:else if form.signUp}
							Create account
						{:else}
							Log in
						{/if}
					</Button>
				</form>
			</CardContent>
		</Card>
	</div>
</div>
