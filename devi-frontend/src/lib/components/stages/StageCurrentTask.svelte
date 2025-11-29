<script lang="ts">
    import Icon from '../global/Icon.svelte';
	export let stage: Stages;
    export let handleSetIsOpen: () => void;
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
    const getDaysDifference = (startDate: string, endDate: string) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
</script>

<div
	class="flex h-full w-100 flex-col items-center justify-center gap-2 self-start rounded-md bg-light/8 p-2"
>
	{#if stage.currentTask}
		<div class="flex h-full w-full flex-col gap-1 p-3">
			<span class="flex justify-between">
				<p>Current Task:</p>
				<p class="{getStatusColor(stage.currentTask.status)} rounded-md p-1 capitalize">
					{stage.currentTask.status}
				</p>
			</span>
			<span class="flex justify-between">
				<b class="text-lg font-bold capitalize">
					{stage.currentTask.name}
				</b>
				<p>
					{getDaysDifference(new Date().toISOString(), stage.currentTask.endDate || '')} days left
				</p>
			</span>
            <span>
                <b class="text-lg font-bold capitalize">Description:</b>
                <p>
                    {stage.currentTask.description}
                </p>
            </span>
		</div>
	{:else}
		<Icon name="info" width="24" height="24" fill="white" hover />
		<p>No current task</p>
		<button
			class="cursor-pointer self-center rounded-md bg-accent px-5 py-1 font-semibold text-light transition-all duration-300 hover:scale-103 hover:bg-accent/70 hover:text-light"
			onclick={handleSetIsOpen}
		>
			Create new task
		</button>
	{/if}
</div>
