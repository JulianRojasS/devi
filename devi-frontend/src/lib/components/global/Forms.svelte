<script lang="ts">
  export let width: string = 'auto';

  const style = `width: ${width}`;

  const buttonStyles = '[&>button]:bg-accent [&>button]:text-primary [&>button]:rounded-md [&>button]:p-2 [&>button]:self-center [&>button]:w-30 [&>button]:hover:scale-103 [&>button]:hover:bg-accent/70 [&>button]:transition-all [&>button]:duration-300 [&>button]:font-semibold [&>button]:cursor-pointer [&>button]:hover:text-light';
</script>

<form class={`p-3 bg-gradient-to-b from-primary to-black/40 flex flex-col gap-1 rounded-sm ${buttonStyles}`} style={style}>
  <slot />
</form>