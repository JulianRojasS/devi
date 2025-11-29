<script lang="ts">
	import validator from '../../../utils/validator';
	import Icon from '../global/Icon.svelte';
	export let docker: Docker;
	export let connection: string | null;
	export let selectConnection: ((connection: string | null) => void) | undefined;
	const deleteDocker = async (id: string) => {
		const res = await fetch(`/api/docker/delete?id=${id}`, {
			method: 'DELETE'
		});
		const response = validator(await res.json(), 'Docker deleted successfully');
		if (response) {
			window.location.reload();
		}
	};
</script>

<li class="flex flex-col gap-1 rounded-md items-center bg-light/10 p-2 text-light">
	<div class="grid w-full grid-cols-4 items-center">
		<input
			checked={connection == docker.id}
			type="checkbox"
			onclick={() => {
				if (selectConnection) {
					selectConnection(connection == docker.id ? null : docker.id);
				}
			}}
		/>
		<span>{docker.name}</span>
		<span>{`${docker.host}:${docker.port}`}</span>
		<div class="flex items-center gap-2">
			<button class="h-10 w-10 rounded-full bg-red-400">
				<Icon
					name="trash"
					width="20"
					height="20"
					fill="white"
					hover
					onClick={() => deleteDocker(docker.id)}
				/>
			</button>
			<span
				class={`w-20 self-center text-center text-sm font-bold ${docker.active ? 'bg-green-600' : 'bg-red-600'} rounded-md px-2 py-1`}
			>
				{docker.active ? 'Active' : 'Inactive'}
			</span>
		</div>
	</div>
</li>
