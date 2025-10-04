<script lang="ts">
	export let app: Apps;

	const getGradientClass = (status: string) => {
		switch (status) {
			case 'active':
				return 'from-green-500/20';
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
				return 'bg-green-500';
			case 'inactive':
				return 'bg-red-500';
			case 'pending':
				return 'bg-yellow-500';
			default:
				return 'bg-gray-500';
		}
	};
</script>

<div
	class="flex w-full flex-col gap-2 rounded-md border border-gray-600 bg-gradient-to-br p-3 {getGradientClass(
		app.status
	)} to-primary/10"
>
	<header class="flex w-full justify-between gap-5">
		<img src={app.logoUrl || '/no-image.png'} alt={app.name} class="h-20 w-20 rounded-md" />
		<div class="flex flex-1 flex-col justify-center gap-2">
			<h2 class="text-2xl font-bold underline">
        <a href="apps/{app.id}">
          {app.name}
        </a>
      </h2>
			<p class="text-sm text-gray-500">{app.description}</p>
			{#if app.websiteUrl}
				<a href={app.websiteUrl} target="_blank" class="text-sm text-blue-500">
					{app.websiteUrl}
				</a>
			{/if}
		</div>
		<div class="flex items-center gap-3">
			<span class="flex flex-col items-end">
				<p>Creando el: {new Date(app.createdAt).toLocaleDateString()}</p>
				<p>Ultimo cambio: {new Date(app.updatedAt).toLocaleDateString()}</p>
			</span>
			<p class="{getStatusBgClass(app.status)} rounded-md p-1 text-white">{app.status}</p>
		</div>
	</header>
</div>
