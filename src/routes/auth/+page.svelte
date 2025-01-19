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
			<CardFooter>
				<div class="w-full space-y-4">
					<Separator />
					<div class="text-center text-sm text-gray-600">Or continue with</div>
					<div class="flex space-x-4">
						<Button variant="outline" class="w-full">
							<svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								><title>GitHub</title><path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								/></svg
							>
							<span class="hidden md:inline">Github</span>
						</Button>
						<Button variant="outline" class="w-full">
							<svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								><title>Discord</title><path
									d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
								/></svg
							>
							<span class="hidden md:inline">Discord</span>
						</Button>
						<Button variant="outline" class="w-full">
							<svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								><title>GitLab</title><path
									d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"
								/></svg
							>
							<span class="hidden md:inline">GitLab</span>
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	</div>
</div>
