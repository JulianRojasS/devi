<script lang="ts">
	import DegradedSection from '../global/DegradedSection.svelte';
import AppPropertie from './AppPropertie.svelte';

	export let app: Apps;
	export let editInfo: (value: boolean) => void;
	export let editImage: (value: boolean) => void;
	export let handleRemoveImage: () => void;

	const getStatusColor = (status: string) => {
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
</script>

<section class="flex flex-col gap-5">
	<header class="flex items-center justify-between gap-3">
		<a href="/sesion/apps" class="text-xl underline">Back</a>
		<span class="flex flex-col items-center justify-center gap-1">
			<h1 class="text-2xl font-bold capitalize">{app.name}</h1>
			<div class="text-md w-full text-center text-light">
				<p>{app.description}</p>
			</div>
		</span>
		<div class="flex items-center gap-5">
			<button class="text-xl bg-light/10 text-light hover:scale-105 transition-all duration-300 rounded-md px-3 py-2 cursor-pointer" on:click={() => editInfo(true)}>Modify</button>
			<button class="{getStatusColor(app.status)} rounded-md px-3 py-2 capitalize font-bold">{app.status}</button>
		</div>
	</header>
	<section class="flex justify-between items-end gap-3 p-4 px-0">
		<div class="group flex flex-col items-center justify-center gap-3">
			<img
				src={app.logoUrl || '/no-image.png'}
				alt={app.name}
				class="h-40 w-40 rounded-md bg-light/10 transition-all duration-300 group-hover:bg-light/20"
			/>
			<span
				class="absolute z-1 hidden h-30 w-30 flex-col gap-2 items-center justify-center transition-opacity duration-300 group-hover:flex"
			>
				<button
					class="w-20 rounded-md bg-light/80 text-xl text-primary underline hover:bg-light transition-all duration-300 cursor-pointer hover:scale-105"
					on:click={() => editImage(true)}>Edit</button
				>
				<button class="w-20 rounded-md bg-light/80 text-xl text-primary underline hover:bg-light transition-all duration-300 cursor-pointer hover:scale-105" on:click={handleRemoveImage}>Delete</button>
			</span>
		</div>
		<DegradedSection class="flex grow flex-col items-start gap-2 rounded-sm bg-gradient-to-b from-transparent to-light/20 border-b p-2">
			<AppPropertie property={new Date(app.createdAt).toLocaleDateString()} name="Created At" isLink={false} />
			<AppPropertie property={new Date(app.updatedAt).toLocaleDateString()} name="Last Updated" isLink={false} />
			<AppPropertie property={app.websiteUrl} name="Website" isLink={true} />
			<AppPropertie property={app.githubUrl} name="GitHub" isLink={true} />
			{#if app.user}
				<AppPropertie property={app.user.name} name="Created by" isLink={false} />
			{/if}
		</DegradedSection>
	</section>
</section>
