<script lang="ts">
	import validator from '../../../utils/validator';
	import { onMount } from 'svelte';
	import CreateApp from '../../../lib/components/apps/CreateApp.svelte';
	import AppItem from '../../../lib/components/apps/AppItem.svelte';
	import AppsStatistics from '../../../lib/components/apps/AppsStatistics.svelte';
	export let data;
	let apps: Apps[] = [];
	onMount(() => {
		apps = validator(data.apps) || [];
	});
</script>

<section>
	<h1>Your Apps</h1>
	<div class="p-3 flex gap-3">
    <CreateApp />
    <AppsStatistics {apps} />
  </div>
	<section class="flex flex-col gap-2 p-3">
		{#if apps}
			{#each apps as app}
				<AppItem {app} />
			{/each}
		{/if}
	</section>
</section>
