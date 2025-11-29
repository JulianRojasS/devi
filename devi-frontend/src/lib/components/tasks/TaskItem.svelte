<script lang="ts">
	import Icon from '../global/Icon.svelte';
	import Modal from '../global/Modal.svelte';
	import Forms from '../global/Forms.svelte';
	import FormItem from '../global/FormItem.svelte';
	import { addAlert } from '$lib/stores/alerts';
	import validator from '../../../utils/validator';

	export let task: Tasks;

	let isOpen = false;
	let name = task.name;
	let description = task.description;

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-600';
			case 'incomplete':
				return 'bg-red-600';
			case 'pending':
				return 'bg-yellow-600';
		}
	};

	const getBorderColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'border-green-500';
			case 'incomplete':
				return 'border-red-500';
			case 'pending':
				return 'border-yellow-500';
		}
	};

	const getDaysDifference = (startDate: string, endDate: string) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const handleUpdateTask = async () => {
		try {
			const data = {
				name,
				description,
				stageId: task.stageId,
				creatorId: task.creatorId,
				userId: task.userId,
				status: task.status,
				startDate: task.startDate,
				endDate: task.endDate
			};
			const res = await fetch(`/api/tasks/update?id=${task.id}`, {
				method: 'PUT',
				body: JSON.stringify(data)
			});
			const response = validator(await res.json(), 'Task updated successfully');
			if (response) {
				window.location.reload();
				isOpen = false;
			}
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error updating task');
		}
	};

	const handleCompleteTask = async () => {
		try {
			const res = await fetch(`/api/tasks/complete?id=${task.id}`, {
				method: 'PUT'
			});
			const response = validator(await res.json(), 'Task completed successfully');
			if (response) {
				window.location.reload();
			}
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error completing task');
		}
	};
</script>

<div class="border-t-3 bg-dark/10 flex gap-2 rounded-md p-3 {getBorderColor(task.status)}">
	<span class="flex grow flex-col gap-2">
		<h3 class="text-2xl font-bold">{task.name}</h3>
		<p>
			{task.description || 'No description'}
		</p>
	</span>
	<div class="flex flex-col items-end gap-2">
		<div>
			{#if task.startDate && task.endDate}
				<p>Remaining {getDaysDifference(task.startDate, task.endDate)} days</p>
			{:else}
				<p>No start or end date</p>
			{/if}
		</div>
		{#if task.startDate && task.endDate}
			<p>
				start {new Date(task.startDate).toLocaleDateString()} end {new Date(
					task.endDate
				).toLocaleDateString()}
			</p>
		{:else}
			<p>No start or end date</p>
		{/if}
		<p class={`rounded-md px-2 py-1 capitalize ${getStatusColor(task.status)}`}>{task.status}</p>
		<p>Assigned to: {task.user?.name || 'No user'}</p>
		{#if task.status !== 'completed'}
			<Icon name="edit" fill="white" width="25" height="25" onClick={() => (isOpen = true)} />
			<Icon name="check" fill="white" width="25" height="25" onClick={() => handleCompleteTask()} />
		{/if}
	</div>
	<Modal {isOpen} onClose={() => (isOpen = false)}>
		<Forms width="100%">
			<FormItem name="Name" label="Name">
				<input type="text" name="name" placeholder="Name" bind:value={name} />
			</FormItem>
			<FormItem name="Description" label="Description">
				<textarea name="description" placeholder="Description" bind:value={description}></textarea>
			</FormItem>
			<button on:click|preventDefault={handleUpdateTask}>Update Task</button>
		</Forms>
	</Modal>
</div>
