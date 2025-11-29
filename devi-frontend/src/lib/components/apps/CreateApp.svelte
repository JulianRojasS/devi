<script lang="ts">
	import Forms from '../global/Forms.svelte';
	import FormItem from '../global/FormItem.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	$: name = '';
	$: description = '';

	const handleSubmit = async () => {
		try {
			const data = {
				name,
				description
			};
			const res = await fetch('/api/apps/create', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			const response = validator(
				await res.json(),
				'App created successfully'
			);
			if (response) {
				window.location.reload();
			}
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error creating app');
		}
	};
</script>

<div class="w-70">
	<Forms>
		<h2 class="text-lg font-bold">New App</h2>
		<FormItem name="name" label="Name">
			<input type="text" name="name" placeholder="Name" bind:value={name} />
		</FormItem>
		<FormItem name="description" label="Description">
			<textarea name="description" placeholder="Description" bind:value={description}></textarea>
		</FormItem>
		<button
			on:click|preventDefault={handleSubmit}
		>
			Create
		</button>
	</Forms>
</div>
