<script lang="ts">
	const {
		property,
		name,
		isLink,
		editable = false
	}: { property: string; name: string; isLink: boolean; editable: boolean } = $props();
</script>

<div class="flex items-center gap-2">
	{#if property}
		{#if isLink}
			<a href={property} target="_blank" class="text-xl underline">{name}</a>
		{:else}
			<p>{name}: {property}</p>
		{/if}
	{:else}
		<p>No {name}</p>
	{/if}
	{#if editable}
		<button class="text-xl underline">Edit</button>
	{/if}
</div>
