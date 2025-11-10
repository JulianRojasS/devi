<script lang="ts">
  export let width: string = 'auto';

  const style = `width: ${width}`;

  const buttonStyles = '[&>button]:bg-accent [&>button]:text-light [&>button]:rounded-md [&>button]:py-1 [&>button]:self-center [&>button]:px-5 [&>button]:hover:scale-103 [&>button]:hover:bg-accent/70 [&>button]:transition-all [&>button]:duration-300 [&>button]:font-semibold [&>button]:cursor-pointer [&>button]:hover:text-light';
</script>

<form class={`p-3 flex flex-col gap-2 bg-gradient-to-t from-light/2 to-transparent ${buttonStyles} border-b`} style={style}>
  <slot />
</form>