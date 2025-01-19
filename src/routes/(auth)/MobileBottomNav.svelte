<script lang="ts">
	import { Home, Plus, List } from 'lucide-svelte'
	import { page } from '$app/state'
	const route = $derived(page.url.pathname)
</script>

<nav class="z-20 flex items-center justify-around">
	<a href="/app" class:active={route.startsWith('/app')}>
		<Home class="size-6" />
	</a>
	<a href="/new" class:active={route.startsWith('/new')} class="plus">
		<Plus class="size-6" />
	</a>
	<a href="/habits" class:active={route.startsWith('/habits')}>
		<List class="size-6" />
	</a>
</nav>

<style>
	nav {
		@apply fixed bottom-0 left-0 right-0 bg-white md:hidden;
		box-shadow: 0px -4px 8px -1px rgba(0, 0, 0, 0.1);
	}
	a {
		@apply p-4;
	}
	a.plus {
		@apply my-1 rounded-full bg-primary p-3 text-white;
	}
	a:not(.plus).active {
		@apply rounded-full bg-muted px-4 py-2 text-muted-foreground;
	}
</style>
