<script lang="ts">
	import DegradedSection from '../global/DegradedSection.svelte';
	export let apps: Apps[];
	let completedApps = apps.filter((app) => app.status === 'completed');
	let incompleteApps = apps.filter((app) => app.status === 'incomplete');
	let pendingApps = apps.filter((app) => app.status === 'pending');
	let totalApps = apps.length;
	import Icon from '../global/Icon.svelte';
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-500';
			case 'incomplete':
				return 'bg-red-500';
			case 'pending':
				return 'bg-yellow-500';
		}
	};

	const getStatusTextClass = (status: string) => {
		switch (status) {
			case 'completed':
				return 'text-green-500';
			case 'incomplete':
				return 'text-red-500';
			case 'pending':
				return 'text-yellow-500';
			default:
				return 'text-gray-500';
		}
	};
</script>

<DegradedSection>
	<div class="flex grow flex-col gap-2 p-2">
		<h2 class="text-lg font-bold text-center">Statistics:</h2>
		<div class="flex justify-between gap-5">
			<div class="flex flex-col gap-2">
				<div
					class="flex flex-col gap-4 text-light [&>span]:flex [&>span]:items-center [&>span]:justify-between [&>span]:gap-2 [&>span]:text-sm [&>span]:font-bold"
				>
					<span class="rounded-md bg-light p-2 text-black">
						<p>Total Apps:</p>
						<p>{totalApps}</p>
					</span>
					<span class="rounded-md p-2 {getStatusColor('completed')}">
						<p>Completed Apps:</p>
						<p>{completedApps.length}</p>
					</span>
					<span class="rounded-md p-2 {getStatusColor('incomplete')}">
						<p>Incomplete Apps:</p>
						<p>{incompleteApps.length}</p>
					</span>
					<span class="rounded-md p-2 {getStatusColor('pending')}">
						<p>Pending Apps:</p>
						<p>{pendingApps.length}</p>
					</span>
				</div>
			</div>
			<div class="flex grow flex-col gap-2">
				<h2 class="text-lg font-bold">Last Apps:</h2>
				<div class="flex flex-col gap-2 text-background">
					{#if apps.length > 0}
						{#each apps.slice(0, 3) as app}
							<a
								href="apps/{app.id}"
								class="grid grid-cols-3 hover:border border-light rounded-sm bg-light/30 p-1 text-center transition-all duration-200 hover:scale-102"
							>
								<span
									class="col-start-1 font-bold capitalize text-light"
									>{app.name}</span
								>
								<p class="col-start-2 text-sm text-light">
									{new Date(app.createdAt).toLocaleDateString()}
								</p>
								<span class="col-start-3 font-extrabold {getStatusTextClass(app.status)}"
									>{app.status}</span
								>
							</a>
						{/each}
					{:else}
						<div class="flex flex-col items-center justify-center gap-2 text-light">
							<Icon name="info" width="20" height="20" fill="white" />
							<p class="text-lg font-bold">No apps found</p>
							<p>Please create a new app to get started</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</DegradedSection>
