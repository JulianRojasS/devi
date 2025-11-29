<script lang="ts">
	import validator from '../../../utils/validator';
	import { onMount } from 'svelte';
	import CreateApp from '../../../lib/components/apps/CreateApp.svelte';
	import AppItem from '../../../lib/components/apps/AppItem.svelte';
	import AppsStatistics from '../../../lib/components/apps/AppsStatistics.svelte';
	import Icon from '../../../lib/components/global/Icon.svelte';
	export let data;
	let apps: Apps[] = [];
	onMount(() => {
		apps = validator(data.apps) || [];
	});
</script>

<section>
	<h1>Your Apps</h1>
	<div class="flex justify-between items-end gap-3 p-3">
		<CreateApp />
		<AppsStatistics {apps} />
	</div>
	<section class="grid grid-cols-1 gap-3 p-3 md:grid-cols-2 lg:grid-cols-4">
		{#if apps.length > 0}
			{#each apps as app}
				<AppItem {app} />
			{/each}
		{:else}
			<div
				class="col-span-full flex h-100 flex-col items-center justify-center gap-2 rounded-md bg-light/10 p-3 text-light"
			>
				<Icon name="info" width="20" height="20" fill="white" />
				<p class="text-lg font-bold">No apps found</p>
				<p>Please create a new app to get started</p>
			</div>
		{/if}
	</section>
</section>
