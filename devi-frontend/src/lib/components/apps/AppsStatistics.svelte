<script lang="ts">
	export let apps: Apps[];
	let activeApps = apps.filter((app) => app.status === 'active');
	let inactiveApps = apps.filter((app) => app.status === 'inactive');
	let pendingApps = apps.filter((app) => app.status === 'pending');
	let totalApps = apps.length;

	const getStatusBgClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-500';
			case 'inactive':
				return 'bg-red-500';
			case 'pending':
				return 'bg-yellow-500';
			case 'total':
				return 'bg-gray-500';
			default:
				return 'bg-gray-500';
		}
	};

	const getStatusTextClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'text-green-500';
			case 'inactive':
				return 'text-red-500';
			case 'pending':
				return 'text-yellow-500';
			case 'total':
				return 'text-gray-500';
			default:
				return 'text-gray-500';
		}
	};
</script>

<div class="text-sm bg-gradient-to-b from-primary to-black/40 rounded-sm p-3 grow">
	<div class="flex items-start gap-5 grow justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Apps Statistics:</h2>
			<div class="flex gap-4 text-light">
				<p class="rounded-md p-2 {getStatusBgClass('active')}">Active Apps: {activeApps.length}</p>
				<p class="rounded-md p-2 {getStatusBgClass('inactive')}">Inactive Apps: {inactiveApps.length}</p>
				<p class="rounded-md p-2 {getStatusBgClass('pending')}">Pending Apps: {pendingApps.length}</p>
				<p class="rounded-md p-2 {getStatusBgClass('total')}">Total Apps: {totalApps}</p>
			</div>
		</div>
		<div class="flex flex-col grow gap-2">
			<h2 class="text-lg font-bold">Last Apps:</h2>
			<div class="text-background flex flex-col gap-2">
				{#each apps.slice(0, 5) as app}
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
