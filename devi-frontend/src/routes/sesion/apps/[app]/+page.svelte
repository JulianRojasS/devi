<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../../utils/validator';
	import AppPropertie from '../../../../lib/components/apps/AppPropertie.svelte';
	import Modal from '$lib/components/global/Modal.svelte';
	import Forms from '$lib/components/global/Forms.svelte';
	export let data;
	$: app = {} as Apps;
	$: isOpen = false;
	const getStatusColor = (status: string) => {
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

	onMount(() => {
		const res = validator(data.app);
		console.log(res);
		if (res) {
			app = res;
		}
	});
</script>

<section class="flex flex-col gap-2">
	<header class="flex items-center justify-between">
		<span class="flex items-center gap-2">
			<a href="/sesion/apps" class="text-xl underline">Back</a>
			<h1 class="text-2xl font-bold capitalize">{app.name}</h1>
		</span>
		<button class="{getStatusColor(app.status)} rounded-md p-1">{app.status}</button>
	</header>
	<div class="self-center group justify-center flex flex-col items-center">
		<img
			src={app.logoUrl || '/no-image.png'}
			alt={app.name}
			class="w-50 h-50 self-center rounded-md group-hover:opacity-50 transition-opacity duration-300"
		>
		<span class="absolute flex-col gap-2 hidden group-hover:flex transition-opacity duration-300">
			<button class="text-xl underline" on:click={() => isOpen = true}>Edit</button>
			<button class="text-xl underline">Delete</button>
		</span>
	</div>
	<div class="w-full text-center text-xl text-gray-500">
		<p>{app.description}</p>
		<button class="text-xl underline">Edit</button>
	</div>
	<div>
		<AppPropertie property={app.createdAt} name="Created At" isLink={false} editable={false} />
		<AppPropertie property={app.updatedAt} name="Last Updated" isLink={false} editable={false} />
		<AppPropertie property={app.websiteUrl} name="Website" isLink={true} editable={true} />
		<AppPropertie property={app.githubUrl} name="GitHub" isLink={true} editable={true} />
	</div>
	<Modal isOpen={isOpen} onClose={() => isOpen = false}>
		<Forms width="100%">
			<input type="text">
		</Forms>
	</Modal>
</section>
