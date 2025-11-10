<script lang="ts">
	export let apps: Apps[];
	let completedApps = apps.filter((app) => app.status === 'completed');
	let incompleteApps = apps.filter((app) => app.status === 'incomplete');
	let pendingApps = apps.filter((app) => app.status === 'pending');
	let totalApps = apps.length;

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

<div class="text-sm border-b p-3 grow bg-gradient-to-t from-light/2 to-transparent">
	<div class="flex items-start gap-5 grow justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Statistics:</h2>
			<div class="flex gap-4 text-light">
				<p class="rounded-md p-2 {getStatusColor('completed')}">Completed Apps: {completedApps.length}</p>
				<p class="rounded-md p-2 {getStatusColor('incomplete')}">Incomplete Apps: {incompleteApps.length}</p>
				<p class="rounded-md p-2 {getStatusColor('pending')}">Pending Apps: {pendingApps.length}</p>
				<p class="rounded-md p-2 {getStatusColor('total')}">Total Apps: {totalApps}</p>
			</div>
		</div>
		<div class="flex flex-col grow gap-2">
			<h2 class="text-lg font-bold">Last Apps:</h2>
			<div class="text-background flex flex-col gap-2">
				{#each apps.slice(0, 3) as app}
					<a href="apps/{app.id}" class="grid grid-cols-5 bg-light rounded-sm p-1 text-center hover:scale-102 transition-all duration-300 group">
            <span class="col-start-1 capitalize font-bold group-hover:underline group-hover:text-accent">{app.name}</span>
						<p class="col-start-3 text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
            <span class="col-start-5 font-extrabold {getStatusTextClass(app.status)}">{app.status}</span>
          </a>
				{/each}
			</div>
		</div>
	</div>
</div>
