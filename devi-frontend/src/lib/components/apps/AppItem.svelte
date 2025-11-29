<script lang="ts">
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	import Icon from '../global/Icon.svelte';

	export let app: Apps;

	const getGradientClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'from-green-500/10';
			case 'inactive':
				return 'from-red-500/10';
			case 'pending':
				return 'from-yellow-500/10';
			default:
				return 'from-gray-500/10';
		}
	};

	const getStatusBgClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-600';
			case 'inactive':
				return 'bg-red-600';
			case 'pending':
				return 'bg-yellow-600';
			default:
				return 'bg-gray-600';
		}
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/apps/delete?id=${app.id}`, {
				method: 'DELETE'
			});
			const response = validator(await res.json(), 'App deleted successfully');
			if (response) {
				window.location.reload();
			}
		}
		catch (error) {
			addAlert('error', 'Error deleting app ' + error);
		}
	};
</script>

<div
	class="flex w-full hb flex-col gap-2 rounded-md border border-light/30 bg-gradient-to-br p-2 {getGradientClass(
		app.status
	)} to-light/5"
>
		<div class="flex items-start justify-between gap-1">
			<h2 class="text-2xl font-bold underline group">
				<a href="apps/{app.id}" class="capitalize group-hover:text-accent">
					{app.name}
				</a>
			</h2>
			<p class="{getStatusBgClass(app.status)} rounded-md p-1 capitalize font-bold text-white">{app.status}</p>
		</div>
		<div class="flex items-start justify-between gap-3">
			<img src={app.logoUrl || '/no-image.png'} alt={app.name} class="h-20 w-20 rounded-md bg-light/5" />
			<div class="flex justify-between grow">
				<span class="grow flex flex-col">
					<p>Created at: {new Date(app.createdAt).toLocaleDateString()}</p>
					<p>Last updated: {new Date(app.updatedAt).toLocaleDateString()}</p>
					<p>Asigned to: {app.user?.name || 'No user'}	</p>
				</span>
				<span class="flex flex-col">
					<button onclick={handleDelete} class="bg-red-500 rounded-full text-white self-start p-2 w-10 h-10 font-bold hover:scale-105 hover:bg-red-500/70 cursor-pointer transition-all duration-300">
						<Icon name="trash" width="20" height="20" fill="white" />
					</button>
				</span>
			</div>
		</div>
</div>
