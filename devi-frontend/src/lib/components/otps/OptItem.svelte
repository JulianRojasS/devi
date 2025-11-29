<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	import Modal from '../global/Modal.svelte';
	import Forms from '../global/Forms.svelte';
	import FormItem from '../global/FormItem.svelte';
	import StageItem from '../stages/StageItem.svelte';
	import Icon from '../global/Icon.svelte';
	let code = $state('');

	interface OptItemProps {
		otp: Otps;
		progress: number;
		apps: Apps[];
	}

	const { otp, progress, apps }: OptItemProps = $props();

	let isOpen = $state(false);
	let selectedApp = $state<string | null>(null);
	const refreshCode = () => {
		fetch(`/api/opt?secret=${otp.secret}`)
			.then((res) => res.json())
			.then((data) => {
				code = data.code;
			});
	};

	/* Cada que progress llegue a 0, se debe llamar a refreshCode */
	$effect(() => {
		if (progress === 30) {
			refreshCode();
		}
	});

	onMount(() => {
		refreshCode();
	});

	const handleLink = async (e: Event) => {
		e.preventDefault();
		if (!selectedApp) {
			addAlert('error', 'Please select an app');
			return;
		}
		const data = {
			name: otp.name,
			appId: selectedApp,
			secret: otp.secret
		};
		const res = await fetch(`/api/opt/update?id=${otp.id}`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
		validator(await res.json(), 'Otp linked successfully');
		window.location.reload();
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/opt/delete?id=${otp.id}`, {
				method: 'DELETE'
			});
			validator(await res.json(), 'Otp deleted successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error deleting otp');
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		addAlert('success', 'Code copied to clipboard');
	};
</script>

<div class="rounded-md bg-light px-3 py-2 text-dark">
	<div class="flex items-center justify-between">
		<span>
			<h2 class="text-lg font-bold">{otp.name}</h2>
			{#if otp.app}
				<a href={`/sesion/apps/${otp.app.id}`} class="text-accent underline">
					{otp.app.name}
					<Icon name="arrow-right" width="16" height="16" fill="white" />
				</a>
			{:else}
				<u>Unlinked</u>
			{/if}
		</span>
		<div class="flex items-center gap-2">
			{#if !otp.app}
				<button
					onclick={() => (isOpen = true)}
					class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-1 text-white transition-all duration-300 hover:scale-105"
					aria-label="Copy code"
				>
					<Icon name="link" width="16" height="16" fill="white" />
				</button>
			{/if}

			<button
				onclick={handleCopy}
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-1 text-white transition-all duration-300 hover:scale-105"
				aria-label="Copy code"
			>
				<Icon name="copy" width="16" height="16" fill="white" />
			</button>
			<button
				onclick={handleDelete}
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 text-white transition-all duration-300 hover:scale-105"
				aria-label="Delete code"
			>
				<Icon name="trash" width="16" height="16" fill="white" />
			</button>
		</div>
	</div>

	<!-- Barra de progreso -->
	<div class="flex items-center gap-2">
		<p class="text-center text-xl font-bold">{code}</p>
		<div class="h-2 w-full rounded-full bg-gray-200">
			<div
				class="h-full rounded-full bg-gradient-to-l from-green-500 to-green-300"
				style="width: {(progress * 100) / 30}%"
			></div>
		</div>
		<div class="text-sm text-gray-500">
			{Math.round(progress)}s
		</div>
	</div>
	{#if apps.length > 0}
		<Modal {isOpen} onClose={() => (isOpen = false)}>
			<div class="w-full text-light">
				<Forms width="100%">
					<FormItem name="App" label="App">
						<select name="appId" bind:value={selectedApp}>
							{#each apps as app}
								<option value={app.id}>{app.name}</option>
							{/each}
						</select>
					</FormItem>
					<button onclick={handleLink}>Link</button>
				</Forms>
			</div>
		</Modal>
	{/if}
</div>
