<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../utils/validator';
	import CreateOtp from '../../../lib/components/otps/CreateOtp.svelte';
	import OptItem from '../../../lib/components/otps/OptItem.svelte';
	import Icon from '../../../lib/components/global/Icon.svelte';
	import DegradedSection from '$lib/components/global/DegradedSection.svelte';
	import OtpsLinkedApps from '$lib/components/otps/OtpsLinkedApps.svelte';
	interface OtpsPageProps {
		data: {
			otps: result<Otps[] | null | undefined>;
			apps: result<Apps[] | null | undefined>;
		};
	}
	const { data }: OtpsPageProps = $props();
	let otps: Otps[] = $state([]);
	let apps: Apps[] = $state([]);
	let progress = $state(0);
	onMount(() => {
		otps = validator(data.otps) || [];
		apps = validator(data.apps) || [];
	});
	const refreshCode = () => {
		fetch(`/api/opt?secret=0`)
			.then((res) => res.json())
			.then((data) => {
				progress = data.timeRemaining; // Reset progress when code updates
			});
	};

	let linkedApps = $state<Apps[]>([]);

	$effect(() => {
		linkedApps = otps.reduce((acc, otp) => {
			if (otp.app && !acc.some((app) => app.id === otp.app.id)) {
				acc.push(otp.app);
			}
			return acc;
		}, [] as Apps[]);
	});

	onMount(() => {
		refreshCode();

		setInterval(() => {
			refreshCode();
		}, 1000); // refresh every 5 seconds
	});
</script>

<section class="flex flex-col gap-3">
	<h1>Otps</h1>
	<section class="flex gap-2">
		<CreateOtp />
		<OtpsLinkedApps {linkedApps} />
	</section>
	<DegradedSection>
		{#if otps.length > 0}
			<div class="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each otps as otp}
					<OptItem {otp} {progress} {apps} />
				{/each}
			</div>
		{:else}
			<div class="col-span-4 flex h-full flex-col items-center justify-center gap-2">
				<Icon name="info" width="24" height="24" fill="white" hover />
				<p>No otps found</p>
				<p>Create a new otp to get started</p>
			</div>
		{/if}
	</DegradedSection>
</section>
