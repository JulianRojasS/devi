<script lang="ts">
	export let stage: Stages;

	const getDaysDifference = (startDate: string, endDate: string) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
</script>

<div class="flex grow flex-col gap-2">
	<p>
		{getDaysDifference(new Date().toISOString(), stage.expectedCompletionDate)} days left
	</p>
	<p>
		Expected completion date: {new Date(stage.expectedCompletionDate).toLocaleDateString()}
	</p>
	<span class="flex items-center gap-2 font-bold">
		<p>Creator: {stage.creator?.name}</p>
		<p>Assigned to: {stage.user?.name}</p>
	</span>
	<p class="h-20 w-full rounded-md bg-light/10 p-2">
		{#if stage.description}
			{stage.description}
		{:else}
			No description
		{/if}
	</p>
</div>
