
<script lang="ts">
  import Icon from '../global/Icon.svelte';
  import { page } from '$app/state';
  interface NavbarItemProps {
    name: string;
    href: string;
    collapsed: boolean;
  }

  const { name, href, collapsed }: NavbarItemProps = $props();
  let currentPath = $state(page.url.pathname);
  const isActive = $derived(currentPath === href);
  
  $effect(() => {
    currentPath = page.url.pathname;
  });
</script>

<li class="flex items-center justify-center cursor-pointer">
  <a href={href} class="w-1/2 text-center flex items-center justify-start gap-3 hover:text-gray-300 hover:underline">
    <Icon name={name} width="30" height="30" fill={isActive ? 'var(--accent)' : 'white'} hover />
    <p class={collapsed ? 'hidden' : 'block' + ' capitalize' + (isActive ? ' text-accent' : ' text-white')}>
      {name}
    </p>
  </a>
</li>