<script lang="ts">
	import Navbar from '../../lib/components/navigation/Navbar.svelte';
	let { children } = $props();
</script>

<section class="flex min-h-screen">
	<Navbar />
	{@render children?.()}
</section>
