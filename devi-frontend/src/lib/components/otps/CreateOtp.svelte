<script lang="ts">
	import FormItem from '../global/FormItem.svelte';
	import Forms from '../global/Forms.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	let name = '';
	let secret = '';
	const handleSubmit = async () => {
		try {
			const data = {
				name,
				secret
			};
			const res = await fetch('/api/opt/create', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			const response: Otps | undefined | null = validator(await res.json(), 'Otp created successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error creating otp');
		}
	};
</script>

<Forms width="300px">
	<FormItem label="Name" name="name">
		<input type="text" name="name" placeholder="Name" bind:value={name} />
	</FormItem>
	<FormItem label="Secret" name="secret">
		<input type="text" name="secret" placeholder="Secret" bind:value={secret} />
	</FormItem>
	<button
		class="bg-accent self-center rounded-md px-2 py-1 text-white"
		type="submit"
		on:click|preventDefault={handleSubmit}>Create</button
	>
</Forms>
