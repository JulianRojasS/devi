<script lang="ts">
	import FormItem from '$lib/components/global/FormItem.svelte';
	import Forms from '$lib/components/global/Forms.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/global/Icon.svelte';
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

	const getStateColor = (state: string) => {
		switch (state) {
			case 'running':
				return 'bg-green-600';
			case 'stopped':
				return 'bg-red-600';
		}
	};

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
		<div
			class="flex grow flex-col gap-2 rounded-md border-b bg-gradient-to-b from-transparent to-light/10 p-2"
		>
			<h3>Connections list</h3>
			<ul class="space-y-2">
				{#each dockers as docker}
					<li class="flex flex-col gap-1 rounded-md bg-light p-1 text-dark">
						<button onclick={() => (connection = docker.id)} class="grid w-full grid-cols-5">
							<span>{docker.name}</span>
							<span>{docker.host}</span>
							<span>{docker.port}</span>
							<span
								class={`text-sm font-bold ${docker.active ? 'text-green-600' : 'text-red-600'} rounded-md px-2 py-1`}
							>
								{docker.active ? 'Active' : 'Inactive'}
							</span>
							<span>
								{#if connection === docker.id}
									<span> selected </span>
								{:else}
									<span> not selected </span>
								{/if}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<h3 class="text-xl font-bold">Containers list</h3>
	<div class="grid grid-cols-4 gap-2">
		{#if !connection}
			<div
				class="flex flex-col items-center justify-center gap-2 rounded-md bg-light/10 p-2 col-span-4"
			>
				<Icon name="info" width="24" height="24" fill="white" hover />
				<p class="text-center">No connection selected</p>
			</div>
		{:else if containers.length > 0}
			{#each containers as container}
				<div class="flex flex-col gap-1 rounded-md bg-light p-2 text-dark">
					<span class="flex items-center justify-between gap-2">
						<b class="capitalize">{container.Names.map((name) => name.split('/')[1]).join(', ')}</b>
						<span
							class={`text-sm font-bold text-light ${getStateColor(container.State)} rounded-md px-2 py-1`}
						>
							{container.State}
						</span>
					</span>
					<p>
						{container.Ports.map(
							(port) => port.PrivatePort + ':' + port.PublicPort + ' ' + port.Type
						).join(', ')}
					</p>
					<p>{container.Image}</p>
					<p>{container.Status}</p>
				</div>
			{/each}
		{:else}
			<div class="flex flex-col items-center justify-center gap-2 rounded-md bg-light/10 p-2 col-span-4">
				<Icon name="info" width="24" height="24" fill="white" hover />
				<p class="text-center">No containers found</p>
			</div>
		{/if}
	</div>
</section>
