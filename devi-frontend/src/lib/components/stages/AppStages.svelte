<script lang="ts">
	import StageItem from './StageItem.svelte';
	import Modal from '../global/Modal.svelte';
	import Forms from '../global/Forms.svelte';
	import FormItem from '../global/FormItem.svelte';
	import validator from '../../../utils/validator';

	export let stages: Stages[];
	export let appId: string;
	export let addStage: boolean = false;
	export let users: User[];
	$: name = '';
	$: description = '';
	$: expectedCompletionDate = '';
	$: userId = '';

	const handleAddStage = async () => {
		const data = {
			name,
			description,
			appId,
			expectedCompletionDate,
			status: 'pending',
			userId
		};
		const res = await fetch('/api/stages/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const response = validator(await res.json(), 'Stage created successfully');
		if (response) {
			window.location.reload();
		}
	};

</script>

<section class="flex flex-col gap-2 p-3 bg-light/5 rounded-sm">
	<header class="flex items-center justify-between gap-3">
		<h1 class="text-2xl font-bold capitalize">Stages</h1>
		<button class="bg-accent text-light rounded-md p-1 hover:bg-accent/80 transition-all duration-300 cursor-pointer hover:scale-105" on:click={() => (addStage = true)}>Add Stage</button>
	</header>
	<ul class="p-2 border-t border-gray-500 space-y-2">
		{#if stages}
			{#each stages as stage, index}
				<StageItem {stage} {index} />
			{/each}
		{/if}
	</ul>
	<Modal isOpen={addStage} onClose={() => (addStage = false)}>
		<Forms width="100%">
			<FormItem name="Name" label="Name">
				<input type="text" name="name" placeholder="Name" bind:value={name} />
			</FormItem>
			<FormItem name="Description" label="Description">
				<textarea name="description" placeholder="Description" bind:value={description}></textarea>
			</FormItem>
			<FormItem name="Expected Completion Date" label="Expected Completion Date">
				<input type="date" name="expectedCompletionDate" placeholder="Expected Completion Date" bind:value={expectedCompletionDate} />
			</FormItem>
			<FormItem name="User" label="User">
				<select name="userId" bind:value={userId}>
					{#each users as user}
						<option value={user.id}>{user.name}</option>
					{/each}
				</select>
			</FormItem>
			<button class="bg-accent text-primary rounded-md p-2" on:click|preventDefault={handleAddStage}>Add Stage</button>
		</Forms>
	</Modal>
</section>