<script lang="ts">
	import { Button } from '$lib/c/ui/button'
	import { Card, CardTitle, CardHeader, CardContent } from '$lib/c/ui/card'
	import { Calendar, TrendingUp, Clock } from 'lucide-svelte'
</script>

<main class="flex-1">
	<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
		<div class="container px-4 md:px-6">
			<div class="flex flex-col items-center space-y-4 text-center">
				<div class="space-y-2">
					<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						I wanna Do _____ !
					</h1>
					<p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
						Track your habits, stay motivated, and transform your life with our intuitive habit
						tracking app.
					</p>
				</div>
				<div class="space-x-4">
					<Button href="/auth">Get Started</Button>
				</div>
			</div>
		</div>
	</section>
	<section class="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
		<div class="container px-4 md:px-6">
			<h2
				id="features"
				class="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
			>
				Key Features
			</h2>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<TrendingUp class="mb-2 h-6 w-6" />
						<CardTitle>Progress Tracking</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							Visualize your habit streaks and progress over time with intuitive charts and graphs.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Calendar class="mb-2 h-6 w-6" />
						<CardTitle>Reminders</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Get constant reminders about your habits so you stay on track!</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Clock class="mb-2 h-6 w-6" />
						<CardTitle>AI Integration</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Use AI to build your habits in efficient ways!</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
	<section class="w-full py-12 md:py-24 lg:py-32">
		<div class="container px-4 md:px-6">
			<div class="flex flex-col items-center gap-4 text-center">
				<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Do?</h2>
				<p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
					It's as easy as signing up and getting started. Track your habits, stay motivated, and
					transform into a better you!
				</p>
				<Button size="lg" href="/auth">Start Now</Button>
			</div>
		</div>
	</section>
</main>
<footer
	class="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6"
>
	<p class="text-xs text-gray-500 dark:text-gray-400">I wanna Do!</p>
	<nav class="flex gap-4 sm:ml-auto sm:gap-6">
		<a
			class="text-xs underline-offset-4 hover:underline"
			href="https://github.com/arnu515/i-wanna-do">Source Code</a
		>
	</nav>
</footer>
