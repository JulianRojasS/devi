<script lang="ts">
	import Icon from './Icon.svelte';

	export let isOpen: boolean = false;
	export let onClose: () => void;
	export let title: string = '';
</script>

<div
	class="absolute top-0 bottom-0 left-0 flex w-screen items-center justify-center {isOpen
		? 'block'
		: 'hidden'}"
>
	<button
		aria-label="Close"
		class="absolute top-0 bottom-0 left-0 w-screen backdrop-blur-xs"
		on:click={onClose}
	>
	</button>
	<div class="absolute z-10 w-100 rounded-md bg-background p-3">
		<div class="flex items-center justify-between">
			{title}
			<button class="text-xl underline" on:click={onClose}
				><Icon name="close" width="20" height="20" fill="white" hover /></button
			>
		</div>
		<div class="flex items-center justify-between p-1">
			<slot />
		</div>
	</div>
</div>
