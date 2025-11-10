<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../../utils/validator';
	import Modal from '$lib/components/global/Modal.svelte';
	import Forms from '$lib/components/global/Forms.svelte';
	import FormItem from '$lib/components/global/FormItem.svelte';
	import AppInfo from '$lib/components/apps/AppInfo.svelte';
	import AppStages from '$lib/components/stages/AppStages.svelte';
	export let data;
	$: app = {} as Apps;
	$: editImage = false;
	$: editInfo = false;
	$: logoUrl = app.logoUrl;
	$: description = app.description;
	$: websiteUrl = app.websiteUrl;
	$: githubUrl = app.githubUrl;
	$: name = app.name;
	$: stages = [] as Stages[];
	$: appId = app.id;
	$: users = [] as User[];
	const handleEdit = async () => {
		const data = {
			...app,
			logoUrl,
			description,
			websiteUrl,
			githubUrl,
			name,
			user: null
		};
		const res = await fetch(`/api/apps/update`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
		const response = validator(await res.json(), 'App updated successfully');
		if (response) {
			window.location.reload();
		}
	};

	const handleRemoveImage = async () => {
		logoUrl = '';
		handleEdit();
	};

	onMount(() => {
		const appRes = validator(data.app);
		const stagesRes = validator(data.stages);
		const usersRes = validator(data.users);
		if (appRes && stagesRes && usersRes) {
			app = appRes;
			stages = stagesRes;
			users = usersRes;
		}
	});
</script>

<section class="flex flex-col gap-2">
	<AppInfo
		{app}
		editInfo={(value) => (editInfo = value)}
		editImage={(value) => (editImage = value)}
		handleRemoveImage={() => handleRemoveImage()}
	/>
	<AppStages {stages} {appId} {users} />
	<Modal isOpen={editImage} onClose={() => (editImage = false)}>
		<Forms width="100%">
			<FormItem name="Logo" label="Logo">
				<input type="text" name="logoUrl" placeholder="Logo" bind:value={logoUrl} />
			</FormItem>
			<button class="rounded-md bg-accent p-2 text-primary" on:click={handleEdit}>Edit</button>
		</Forms>
	</Modal>
	<Modal isOpen={editInfo} onClose={() => (editInfo = false)}>
		<Forms width="100%">
			<FormItem name="Name" label="Name">
				<input type="text" bind:value={name} />
			</FormItem>
			<FormItem name="Description" label="Description">
				<textarea name="description" placeholder="Description" bind:value={description}></textarea>
			</FormItem>
			<FormItem name="Website" label="Website">
				<input type="text" bind:value={websiteUrl} />
			</FormItem>
			<FormItem name="GitHub" label="GitHub">
				<input type="text" name="githubUrl" placeholder="GitHub" bind:value={githubUrl} />
			</FormItem>
			<button class="rounded-md bg-accent p-2 text-primary" on:click={handleEdit}>Edit</button>
		</Forms>
	</Modal>
</section>
