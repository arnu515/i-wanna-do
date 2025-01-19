<script lang="ts">
	import { ArrowLeft, UserCircle } from 'lucide-svelte'
	import NavTabs from './NavTabs.svelte'
	import MobileBottomNav from './MobileBottomNav.svelte'
	import { page } from '$app/state'

	let { children } = $props()
</script>

<header class="mx-auto mb-4 mt-8 hidden max-w-screen-lg items-center justify-between px-4 md:flex">
	<h1 class="text-4xl font-bold">I wanna Do!</h1>
	<NavTabs />
</header>

<header
	class="fixed left-0 right-0 top-0 z-20 flex items-center justify-between bg-white px-4 py-2 shadow-md md:hidden"
>
	<h1 class="flex items-center gap-2 text-xl font-bold">
		{#if page.url.pathname.startsWith('/profile')}
			<a href="/app" title="Back" aria-label="Back">
				<ArrowLeft class="size-5" />
			</a>
		{/if}
		I wanna Do!
	</h1>
	<a href="/profile" title="Your profile" aria-label="Your profile">
		<UserCircle class="size-5" />
	</a>
</header>

<main
	class="mb-16 mt-16 h-screen max-w-screen-lg overflow-y-auto px-2 md:px-6 md:pb-4 md:pt-4 lg:mx-auto lg:px-4"
>
	{@render children()}
</main>

<MobileBottomNav />
