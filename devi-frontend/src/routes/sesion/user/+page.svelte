<script lang="ts">
  import { onMount } from 'svelte';
  import validator from '../../../utils/validator';
  export let data;
  $: user = {} as User;

  onMount(() => {
    const userRes = validator(data.user);
    if (userRes) {
      user = userRes;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'inactive':
        return 'bg-red-600';
      case 'banned':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };
</script>

<section class="flex flex-col gap-2 p-5">
  <header class="flex items-center justify-between gap-2">
    <h2 class="text-2xl font-bold">Your profile</h2>
    <button class="bg-accent rounded-md px-2 py-1 text-light">
      Modify
    </button>
  </header>
  <section class="flex gap-5 w-full justify-between">
    <img src={user.profilePictureUrl || '/no-image.png'} alt="profile" class="w-40 h-40 rounded-full" >
    <div class="w-100 flex flex-col gap-2 items-start justify-between">
      <h1 class="text-4xl font-bold">{user.name}</h1>
      <p>{user.email}</p>
      <p>Last conection {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never logged in'}</p>
      <ul>
        {#each user.roles as role}
          <li>
            <span class="rounded-md px-2 py-1 bg-primary/80 text-light capitalize">{role}</span>
          </li>
        {/each}
      </ul>
      <span class={`rounded-md px-2 py-1 text-sm ${getStatusColor(user.status)} text-light capitalize`}>
        {user.status}
      </span>
    </div>
    <div class="bg-light/10 grow rounded-md p-2 flex flex-col gap-1">
      <h2>Bio</h2>
      <p class="text-light">{user.bio || 'No bio'}</p>
    </div>
  </section>
  <section>
    <h3 class="text-xl font-bold">Github repositories</h3>
    <ul class="w-full">
      <li class="underline">In development</li>
    </ul>
  </section>
</section>