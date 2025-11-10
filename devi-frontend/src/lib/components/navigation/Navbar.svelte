<script lang="ts">
	import Icon from '../global/Icon.svelte';
	import NavbarItem from './NavbarItem.svelte';
	$: collapsed = true;
</script>

<header class="grid grid-rows-6 border-r px-2 text-center {collapsed ? 'w-16' : 'w-44'} transition-all duration-300 {collapsed ? 'bg-gradient-to-r from-background to-transparent' : 'bg-white/5'}">
	<div class="row-span-1 py-3 flex flex-col items-center gap-3">
		<Icon
			hover
			name={collapsed ? 'expand' : 'collapse'}
			width="24"
			height="24"
			fill="white"
			onClick={() => (collapsed = !collapsed)}
		/>
		{#if collapsed}
			<img src="/logo.svg" alt="Devi" class="w-10 h-10" />
		{:else}
			<img src="/logo.svg" alt="Devi" class="w-12 h-12 self-center transition-all duration-300" />
		{/if}
	</div>
	<nav class="row-span-4 grow justify-end">
		<ul class="flex flex-col justify-center gap-3">
			<NavbarItem name="home" href="/sesion/home" collapsed={collapsed} />
			<NavbarItem name="apps" href="/sesion/apps" collapsed={collapsed} />
			<NavbarItem name="otps" href="/sesion/otps" collapsed={collapsed} />
			<NavbarItem name="docker" href="/sesion/docker" collapsed={collapsed} />
		</ul>
	</nav>
	<ul class="row-span-1 flex flex-1 flex-col justify-center gap-3">
		<NavbarItem name="user" href="/sesion/user" collapsed={collapsed} />
		<NavbarItem name="exit" href="/api/sesion/logout" collapsed={collapsed} />
	</ul>
</header>
