<script lang="ts">
	import '../app.css';
	import Alerts from '$lib/components/global/Alerts.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/logo.svg" />
	<title>Devi</title>
</svelte:head>

<Alerts />
{@render children?.()}
