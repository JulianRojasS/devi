<script lang="ts">
	import DegradedSection from "./DegradedSection.svelte";

  export let width: string = 'auto';

  const style = `width: ${width}`;

  const buttonStyles = '[&>button]:bg-accent [&>button]:text-light [&>button]:rounded-md [&>button]:py-1 [&>button]:self-center [&>button]:px-5 [&>button]:hover:scale-103 [&>button]:hover:bg-accent/70 [&>button]:transition-all [&>button]:duration-300 [&>button]:font-semibold [&>button]:cursor-pointer [&>button]:hover:text-light';
</script>

<DegradedSection>
  <form class={`flex flex-col min-w-60 gap-2 ${buttonStyles}`} style={style}>
    <slot />
  </form>
</DegradedSection>