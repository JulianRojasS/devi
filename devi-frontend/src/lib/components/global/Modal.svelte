<script lang="ts">
	export let isOpen: boolean = false;
	export let onClose: () => void;
	export let title: string = '';
</script>

<div class="absolute left-0 top-0 w-screen bottom-0 flex justify-center items-center {isOpen ? 'block' : 'hidden'}" >
	<span class="absolute left-0 top-0 bottom-0 w-screen bg-light/30" on:click={onClose} />
  <div class="absolute z-10 w-100 bg-background p-3">
    <div>
      {title}
      <button class="text-xl underline" on:click={onClose}>Close</button>
    </div>
    <div class="flex justify-between items-center  p-1">
      <slot />
    </div>
  </div>
</div>