<script lang="ts">
  import Icon from '../global/Icon.svelte';

  interface NavbarItemProps {
    name: string;
    href: string;
    collapsed: boolean;
  }
  const { name, href, collapsed }: NavbarItemProps = $props();
</script>

<li class="flex items-center justify-center">
  <a href={href} class="w-1/2 text-center flex items-center justify-between hover:text-gray-300 hover:underline">
    <Icon name={name} width="24" height="24" fill="white" />
    <p class={collapsed ? 'hidden' : 'block' + ' capitalize'}>
      {name}
    </p>
  </a>
</li>