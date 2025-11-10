<script lang="ts">
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';

	export let app: Apps;

	const getGradientClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'from-green-500/10';
			case 'inactive':
				return 'from-red-500/20';
			case 'pending':
				return 'from-yellow-500/20';
			default:
				return 'from-gray-500/20';
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
	class="flex w-full flex-col gap-2 rounded-md border border-gray-600 bg-gradient-to-br p-3 {getGradientClass(
		app.status
	)} to-primary/10"
>
		<div class="flex items-center justify-between gap-2">
			<h2 class="text-2xl font-bold underline group">
				<a href="apps/{app.id}" class="capitalize group-hover:text-accent">
					{app.name}
				</a>
			</h2>
			<p class="{getStatusBgClass(app.status)} rounded-md p-1 text-white">{app.status}</p>
		</div>
		<div class="flex grow items-start justify-end gap-2">
			<img src={app.logoUrl || '/no-image.png'} alt={app.name} class="h-25 w-25 rounded-md" />
			<div class="flex grow justify-between">
				<span class="grow">
					<p>Creando el: {new Date(app.createdAt).toLocaleDateString()}</p>
					<p>Ultimo cambio: {new Date(app.updatedAt).toLocaleDateString()}</p>
					<button onclick={handleDelete} class="bg-red-500 text-white px-2 py-1 rounded-md font-bold">
						delete app
					</button>
				</span>
			</div>
		</div>
</div>
