<script lang="ts">
	import Icon from '../global/Icon.svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';

	export let stage: Stages;
	export let index: number;

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
</script>

<li class="rounded-xl bg-dark p-3">
	<div class={`flex w-full flex-col items-center justify-between gap-3`}>
		<div class="flex w-full grow items-start justify-between gap-4">
			<a href={`/sesion/apps/${stage.appId}/stage/${stage.id}`} class="flex flex-col group">
				<b class="group-hover:text-accent">
					{index + 1}. {stage.name}
				</b>
				{#if stage.currentTask}
					<p class="text-sm text-light group-hover:text-accent">
						Current Task: {stage.currentTask.name}
					</p>
				{:else}
					<p class="text-sm text-gray-500 group-hover:text-accent">No current task</p>
				{/if}
			</a>
			<span
				class={`text-sm text-gray-500 ${getStatus(stage.status)} rounded-md px-2 py-1 font-bold capitalize`}
				>{stage.status}</span
			>
		</div>
		<div class="flex w-full items-center justify-between gap-4">
			<p class="flex text-sm text-light">
				Assigned to: {stage.user?.name}
			</p>
			<div class="flex grow items-center gap-2">
				<div class="h-[10px] grow rounded-sm bg-gray-300">
					<div class="h-full bg-green-500" style="width: {stage.progress}%"></div>
				</div>
				<p class="text-sm text-gray-500">{stage.progress}%</p>
			</div>
			<Icon onClick={handleDelete} name="trash" width="20" height="20" fill="white" hover />
		</div>
	</div>
</li>
