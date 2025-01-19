<script lang="ts">
	import { CheckCircle } from 'lucide-svelte'
	import { Button } from '$lib/c/ui/button'
	let { children } = $props()
</script>

<header class="flex h-14 items-center px-4 lg:px-6">
	<a class="flex items-center justify-center" href="/">
		<CheckCircle class="mr-2 h-6 w-6" />
		<span class="font-bold">I wanna Do!</span>
	</a>
	<nav class="ml-auto flex items-center gap-4 sm:gap-6">
		<a class="text-sm font-medium underline-offset-4 hover:underline" href="/#features">
			Features
		</a>
		<Button href="/auth" class="text-sm font-medium">Get Started</Button>
	</nav>
</header>
{@render children()}
