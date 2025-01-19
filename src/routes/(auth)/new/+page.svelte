<script lang="ts">
	import NotDone from './NotDone.svelte'
	// import Done from './Done.svelte'
	let { form } = $props()
</script>

<svelte:head>
	<title>Create a new Habit</title>
</svelte:head>

<!-- {#if !form?.done} -->
<NotDone {form} />
<!-- {:else}
	<Done data={form.data} explanation={form.explanation} />
{/if} -->
