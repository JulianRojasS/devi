<script lang="ts">
	const {
		property,
		name,
		isLink,
	}: { property?: string; name: string; isLink: boolean } = $props();
</script>

<div class="flex flex-col justify-center gap-2">
	{#if property}
		{#if isLink}
			<span class="flex gap-2">
				<b class="text-accent">{name}:</b> 
				<a href={property} target="_blank" class="underline text-accent">Go to {name}</a>
			</span>
		{:else}
			<span class="flex gap-2">
				<b class="text-light">{name}:</b> 
				<p class="text-light">{property}</p>
			</span>
		{/if}
	{:else}
		<span class="flex gap-2">
			<b class="text-light">{name}:</b> 
			<p class="text-light">No {name}</p>
		</span>
	{/if}
</div>
