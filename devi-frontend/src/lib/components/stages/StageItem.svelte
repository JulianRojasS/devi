<script lang="ts">
	import Icon from '../global/Icon.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	import Modal from '../global/Modal.svelte';
	import Forms from '../global/Forms.svelte';
	import FormItem from '../global/FormItem.svelte';

	export let stage: Stages;
	export let index: number;
	$: name = stage.name;
	$: description = stage.description;
	$: isOpen = false;

	const getStatus = (status: string) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-600 text-white';
			case 'completed':
				return 'bg-green-600 text-white';
			case 'incomplete':
				return 'bg-red-600 text-white';
		}
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/stages/delete?id=${stage.id}`, {
				method: 'DELETE'
			});
			const response = validator(await res.json(), 'Stage deleted successfully');
			console.log(response);
			if (response) {
				window.location.reload();
			}
		} catch (error) {
			addAlert('error', 'Error deleting stage ' + error);
		}
	};

	const handleUpdateStage = async () => {
		const data = {
			id: stage.id,
			name,
			description,
			appId: stage.appId,
			creatorId: stage.creatorId,
			userId: stage.userId,
			status: stage.status,
			expectedCompletionDate: new Date(stage.expectedCompletionDate),
			completionDate: new Date(stage.completionDate),
			currentTaskId: stage.currentTaskId,
			progress: stage.progress
		};
		const res = await fetch(`/api/stages/update?id=${stage.id}`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
		const response = validator(await res.json(), 'Stage updated successfully');
		if (response) {
			window.location.reload();
		}
	};
</script>

<li class="bg-light/30 rounded-md p-2">
	<div class={`flex w-full flex-col items-center justify-between gap-1`}>
		<div class="flex w-full grow items-start justify-between">
			<a href={`/sesion/apps/${stage.appId}/stage/${stage.id}`} class="group flex flex-col gap-1">
				<b class="group-hover:text-accent">
					{index + 1}. {stage.name}
				</b>
				{#if stage.currentTask}
					<p class="text-light group-hover:text-accent text-sm">
						Current Task: {stage.currentTask.name}
					</p>
				{:else}
					<p class="text-light group-hover:text-accent text-sm">No current task</p>
				{/if}
			</a>
			<span
				class={`text-light text-sm ${getStatus(stage.status)} rounded-md px-2 py-1 font-bold capitalize`}
				>{stage.status}</span
			>
		</div>
		<div class="flex w-full items-center justify-between gap-4">
			<p class="text-light flex text-sm">
				Assigned to: {stage.user?.name}
			</p>
			<div class="flex grow items-center gap-2">
				<div class="h-[10px] grow rounded-sm bg-gray-300">
					<div class="h-full bg-green-500" style="width: {stage.progress}%"></div>
				</div>
				<p class="text-light text-sm">{stage.progress}%</p>
			</div>
			<Icon onClick={handleDelete} name="trash" width="20" height="20" fill="white" hover />
			<Icon onClick={() => (isOpen = true)} name="edit" width="25" height="25" fill="white" hover />
		</div>
	</div>
	<Modal {isOpen} onClose={() => (isOpen = false)}>
		<Forms width="100%">
			<FormItem name="Name" label="Name">
				<input type="text" name="name" placeholder="Name" bind:value={name} />
			</FormItem>
			<FormItem name="Description" label="Description">
				<textarea name="description" placeholder="Description" bind:value={description}></textarea>
			</FormItem>
			<button on:click|preventDefault={handleUpdateStage}>Update Stage</button>
		</Forms>
	</Modal>
</li>
