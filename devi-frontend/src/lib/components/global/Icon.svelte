<script lang="ts">
	export let name: string = 'info';
	export let width: string | undefined;
	export let height: string | undefined;
	export let fill: string | undefined;
	export let onClick: (() => void) | undefined = undefined;
	export let hover: boolean | undefined = false;
</script>

<button onclick={onClick} aria-label={name}>
	<svg {width} {height} {fill} class="mx-auto {hover ? 'cursor-pointer hover:fill-accent' : ''}">
		<use href={`/icons/icons.svg#${name}`} />
	</svg>
</button>
