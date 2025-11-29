<script lang="ts">
	import DegradedSection from '../global/DegradedSection.svelte';
	import Icon from '../global/Icon.svelte';
	interface OtpsLinkedAppsProps {
		linkedApps: Apps[];
	}
	const { linkedApps }: OtpsLinkedAppsProps = $props();

	const handleGo = (app: string) => {
		window.location.href = `/sesion/apps/${app}`;
	};
</script>

<DegradedSection>
	<h2 class="text-lg font-bold">Linked Apps ({linkedApps.length}):</h2>
	{#if linkedApps.length > 0}
		<ul class="">
			{#each linkedApps as app}
				<li>
					<button onclick={() => handleGo(app.id)} class="rounded-md bg-light/30 p-2 text-light hover:bg-light/50 transition-all duration-300 cursor-pointer">
						{app.name}
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex h-full flex-col items-center justify-center gap-2">
			<Icon name="info" width="24" height="24" fill="white" hover />
			<p>No linked apps found</p>
			<p class="flex items-center gap-2">
                Click on <Icon name="link" width="24" height="24" fill="white" hover /> to link an app
            </p>
		</div>
	{/if}
</DegradedSection>
