<script lang="ts">
	export let label: string;
	export let name: string;
</script>

<span class="p-2 flex flex-col gap-2 w-full">
	<label class="text-sm font-bold" for={name}>{label}</label>
	<div class="[&>*]:bg-light [&>*]:text-dark [&>*]:p-1 [&>*]:border [&>*]:border-gray-300 [&>*]:rounded-md [&>*]:w-full">
    <slot />
  </div>
</span>
