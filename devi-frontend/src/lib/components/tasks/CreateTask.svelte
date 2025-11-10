<script lang="ts">
	import FormItem from '../global/FormItem.svelte';
	import Forms from '../global/Forms.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';

	export let stageId: string = '';
	export let users: User[] = [];
	$: name = '';
	$: description = '';
	$: userId = '';
	$: startDate = '';
	$: endDate = '';
	const handleSubmit = async () => {
		const data = {
			name,
			description,
			stageId,
			userId,
			startDate,
			endDate
		};
		const res = await fetch('/api/tasks/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const response: Tasks | undefined | null = validator(
			await res.json(),
			'Task created successfully'
		);
		if (response) {
			window.location.reload();
		}
	};
</script>

<div class="flex flex-col gap-2 max-h-[80vh] overflow-y-auto w-full">
	<Forms width="100%">
		<FormItem label="Name" name="name">
			<input type="text" name="name" bind:value={name} />
		</FormItem>
		<FormItem label="Description" name="description">
			<textarea name="description" bind:value={description}></textarea>
		</FormItem>
		<FormItem label="Start Date" name="startDate">
			<input type="date" name="startDate" bind:value={startDate} />
		</FormItem>
		<FormItem label="End Date" name="endDate">
			<input type="date" name="endDate" bind:value={endDate} />
		</FormItem>
		<FormItem label="User" name="userId">
			<select name="userId" bind:value={userId}>
				<option value="">Select a user</option>
				{#each users as user}
					<option value={user.id}>{user.name}</option>
				{/each}
			</select>
		</FormItem>
		<button on:click|preventDefault={handleSubmit}>Create Task</button>
	</Forms>
</div>
