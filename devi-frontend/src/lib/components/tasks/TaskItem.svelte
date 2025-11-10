<script lang="ts">
	export let task: Tasks;

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
</script>

<div
	class="flex gap-2 rounded-md border-t-3 bg-dark/10 p-3 {getBorderColor(task.status)}"
>
	<span class="flex flex-col grow gap-2">
		<h3 class="text-2xl font-bold">{task.name}</h3>
        <p>
            {task.description || 'No description'}
        </p>
	</span>
	<div class="flex flex-col gap-2 items-end">
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
        <p class={`capitalize rounded-md px-2 py-1 ${getStatusColor(task.status)}`}>{task.status}</p>
		<p> Assigned to: {task.user?.name || 'No user'}</p>
	</div>
</div>
