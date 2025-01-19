<script lang="ts">
	import { page } from '$app/state'
	import { Plus } from 'lucide-svelte'

	let route = $derived(page.url.pathname)
</script>

<div class="flex items-center gap-3">
	<a id="new" class:active={route.startsWith('/new')} href="/new" aria-label="New" title="New"
		><Plus class="size-5" /></a
	>
	<nav
		class="flex items-center rounded-full border border-muted-foreground bg-secondary text-sm shadow"
	>
		<a href="/app" class:active={route.startsWith('/app')}>Home</a>
		<a href="/habits" class:active={route.startsWith('/habits')}>Habits</a>
		<a href="/profile" class:active={route.startsWith('/profile')}>Profile</a>
	</nav>
</div>

<style>
	a#new {
		@apply cursor-pointer rounded-full border border-muted-foreground bg-secondary p-2 text-secondary-foreground transition-colors duration-300;
	}

	a#new.active {
		@apply border-primary bg-primary text-primary-foreground;
	}

	nav a {
		@apply cursor-pointer rounded-full border border-transparent bg-secondary px-4 py-2 text-secondary-foreground transition-colors duration-300;
	}

	nav a:not(.active):hover {
		@apply bg-muted text-muted-foreground;
	}

	nav a.active {
		@apply border-primary bg-primary text-primary-foreground;
	}
</style>
