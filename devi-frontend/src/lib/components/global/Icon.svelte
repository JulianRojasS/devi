<script lang="ts">
  interface IconProps {
    name: string;
    width: string;
    height: string;
    fill: string;
    onClick?: () => void;
    hover?: boolean;
  }

  const { name, width, height, fill, onClick, hover }: IconProps = $props();
</script>

<button onclick={onClick} aria-label={name}>
  <svg  width={width} height={height} fill={fill} class="mx-auto {hover ? 'hover:fill-accent cursor-pointer' : ''}">
    <use href={`/icons/icons.svg#${name}`} />
  </svg>
</button>