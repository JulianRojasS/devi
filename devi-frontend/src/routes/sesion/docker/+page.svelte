<script lang="ts">
	import FormItem from '$lib/components/global/FormItem.svelte';
	import Forms from '$lib/components/global/Forms.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/global/Icon.svelte';
	import ConnectionItem from '$lib/components/docker/ConnectionItem.svelte';
	import ContainerItem from '$lib/components/docker/ContainerItem.svelte';
	interface DockerPageProps {
		data: {
			dockers: result<Docker[] | null | undefined>;
		};
	}
	const { data }: DockerPageProps = $props();
	let dockers: Docker[] = $state([]);
	let name = $state('');
	let host = $state('');
	let port = $state(0);
	let connection = $state<string | null>(null);
	let containers: Container[] = $state([]);
	onMount(() => {
		const dockerRes = validator(data.dockers);
		if (dockerRes) {
			dockers = dockerRes;
		}
	});

	const createDocker = async (event: Event) => {
		event.preventDefault();
		try {
			const res = await fetch('/api/docker/create', {
				method: 'POST',
				body: JSON.stringify({ name, host, port })
			});
			const response = validator(await res.json(), 'Docker created successfully');
			if (response) {
				window.location.reload();
			}
		} catch (error) {
			addAlert('error', 'Failed to create docker ' + (error as Error).message);
		}
	};

	const getContainers = async () => {
		if (!connection) {
			return;
		}
		const res = await fetch(`/api/docker/containers?id=${connection}`);
		const response = validator<Container[]>(await res.json(), 'Containers fetched successfully');
		console.log(response);
		if (response) {
			containers = response || [];
		}
	};

	const selectConnection = (newConnection: string | null) => {
		connection = newConnection;
	};

	$effect(() => {
		containers = [];
		if (connection) {
			getContainers();
		}
	});
</script>

<section class="flex flex-col gap-5">
	<h2 class="text-2xl font-bold">Your docker conections</h2>
	<div class="flex w-full justify-between gap-5">
		<div class="w-100">
			<Forms>
				<h3 class="text-xl font-bold">New connection</h3>
				<FormItem name="Name" label="Name">
					<input type="text" name="name" placeholder="Name" bind:value={name} />
				</FormItem>
				<FormItem name="Host" label="Host">
					<input type="text" name="host" placeholder="Host" bind:value={host} />
				</FormItem>
				<FormItem name="Port" label="Port">
					<input type="number" name="port" placeholder="Port" bind:value={port} />
				</FormItem>
				<button type="submit" onclick={createDocker}>Create</button>
			</Forms>
		</div>
		<div
			class="flex grow flex-col gap-2 rounded-md border-b bg-gradient-to-b from-transparent to-light/10 p-2"
		>
			<h3 class="border-b p-1 text-center text-xl">Connections list</h3>
			{#if dockers.length > 0}
				<ul class="space-y-2">
					{#each dockers as docker}
						<ConnectionItem {docker} {connection} {selectConnection} />
					{/each}
				</ul>
			{:else}
				<div class="col-span-4 flex h-full flex-col items-center justify-center gap-2">
					<Icon name="info" width="24" height="24" fill="white" hover />
					<p class="text-center">No connections found</p>
				</div>
			{/if}
		</div>
	</div>
	<h3 class="text-xl font-bold">Containers list</h3>
	{#if !connection}
		<div
			class="flex flex-col h-full items-center justify-center gap-2 rounded-md bg-light/10 p-2"
		>
			<Icon name="info" width="24" height="24" fill="white" hover />
			<p class="text-center">No connection selected</p>
		</div>
	{:else if containers.length > 0}
		<div class="grid grid-cols-4 gap-2">
			{#each containers as container}
				<ContainerItem {container} />
			{/each}
		</div>
	{:else}
		<div
			class="flex flex-col h-full items-center justify-center gap-2 rounded-md bg-light/10 p-2"
		>
			<Icon name="info" width="24" height="24" fill="white" hover />
			<p class="text-center">No containers found</p>
		</div>
	{/if}
</section>
