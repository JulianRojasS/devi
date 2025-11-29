<script lang="ts">
	import OptItem from '../otps/OptItem.svelte';
	import { onMount } from 'svelte';
	import Icon from '../global/Icon.svelte';
	interface AppOtpsProps {
		otps: Otps[];
	}
	const { otps }: AppOtpsProps = $props();
	let progress = $state(0);
	const refreshCode = () => {
		fetch(`/api/opt?secret=0`)
			.then((res) => res.json())
			.then((data) => {
				progress = data.timeRemaining; // Reset progress when code updates
			});
	};
	onMount(() => {
		refreshCode();

		setInterval(() => {
			refreshCode();
		}, 1000); // refresh every 5 seconds
	});
</script>

<div class="h-full w-150 rounded-sm bg-light/10 p-3">
	<h2 class="border-b py-1 text-2xl font-bold">Otps</h2>
	{#if otps.length > 0}
		<ul class="h-full overflow-y-auto py-2">
			{#each otps as otp}
				<OptItem {otp} apps={[]} {progress} />
			{/each}
		</ul>
	{:else}
		<div class="flex h-full flex-col gap-3 items-center justify-center">
			<Icon name="info" width="24" height="24" fill="white" />
			<p class="text-lg font-bold">No otps found</p>
			<p>Please create a new otp to get started</p>
			<button class="bg-accent text-light rounded-md p-1 hover:bg-accent/80 transition-all duration-300 cursor-pointer hover:scale-105" onclick={() => (window.location.href = '/sesion/otps')}> Create new otp </button>
		</div>
	{/if}
</div>
