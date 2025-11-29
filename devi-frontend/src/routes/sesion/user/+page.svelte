<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../utils/validator';
	import Modal from '$lib/components/global/Modal.svelte';
	import Forms from '$lib/components/global/Forms.svelte';
	import FormItem from '$lib/components/global/FormItem.svelte';
	import RepoItem from '$lib/components/repos/RepoItem.svelte';
	export let data;
	$: user = {} as User;
	$: githubRepositories = [] as GithubRepository[];
	$: connectGithub = false;
	$: updateUser = false;

	$: githubToken = user.githubToken;
	$: name = user.name;
	$: email = user.email;
	$: bio = user.bio;
	$: location = user.location;
	$: website = user.website;

	onMount(() => {
		const userRes = validator(data.user);
		const githubRepositoriesRes = validator(data.githubRepositories);
		if (userRes) {
			user = userRes;
		}
		if (githubRepositoriesRes) {
			githubRepositories = githubRepositoriesRes;
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

	const handleUpdateUser = async (e: Event) => {
		e.preventDefault();
		const data = {
			...user,
			name,
			email,
			bio,
			location,
			website,
			githubToken: githubToken
		};
		const res = await fetch(`/api/users/update`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
		const response = validator(await res.json(), 'User updated successfully');
		if (response) {
			window.location.reload();
		}
	};
</script>

<section class="flex flex-col gap-2 p-5">
	<header class="flex items-center justify-between gap-2">
		<h2 class="text-2xl font-bold">Your profile</h2>
		<button class="rounded-md bg-accent px-2 py-1 text-light" onclick={() => (updateUser = true)}>
			Modify
		</button>
	</header>
	<section class="flex w-full justify-between gap-5">
		<img
			src={user.profilePictureUrl || '/no-image.png'}
			alt="profile"
			class="h-40 w-40 rounded-full"
		/>
		<div class="flex w-100 flex-col items-start justify-between gap-2 p-3">
			<h1 class="text-4xl font-bold">{user.name}</h1>
			<p>{user.email}</p>
			<p>
				Last conection {user.lastLogin
					? new Date(user.lastLogin).toLocaleDateString()
					: 'Never logged in'}
			</p>
			<ul class="flex gap-2">
				{#each user.roles as role}
					<li>
						<span class="rounded-md bg-primary/80 px-2 py-1 text-light capitalize">{role}</span>
					</li>
				{/each}
			</ul>
			<span
				class={`rounded-md px-2 py-1 text-sm ${getStatusColor(user.status)} text-light capitalize`}
			>
				{user.status}
			</span>
		</div>
		<div class="flex grow flex-col gap-1 rounded-md bg-light/10 p-2">
			<h2>Bio</h2>
			<p class="text-light">{user.bio || 'No bio'}</p>
		</div>
	</section>
	<section
		class="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-light/10 p-2"
	>
		{#if user.githubToken}
			<div class="flex h-full w-full flex-col gap-2">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold">Github repositories</h3>
					<button
						class="rounded-md bg-accent px-2 py-1 text-light"
						onclick={() => (connectGithub = true)}
					>
						Modify
					</button>
				</div>
				<ul class="h-140 w-full space-y-2 overflow-y-auto p-3">
					{#each githubRepositories as repository}
						<RepoItem {repository} />
					{/each}
				</ul>
			</div>
		{:else}
			<p>Connect your Github account to access your repositories</p>
			<button
				onclick={() => (connectGithub = true)}
				class="rounded-md bg-accent px-2 py-1 text-light"
			>
				Connect to Github
			</button>
		{/if}
	</section>
	<Modal isOpen={connectGithub} onClose={() => (connectGithub = false)}>
		<Forms width="100%">
			<FormItem name="Github Token" label="Github Token">
				<input type="text" name="githubToken" placeholder="Github Token" bind:value={githubToken} />
			</FormItem>
			<button type="submit" onclick={handleUpdateUser}>Connect</button>
		</Forms>
	</Modal>
	<Modal isOpen={updateUser} onClose={() => (updateUser = false)}>
		<Forms width="100%">
			<FormItem name="Name" label="Name">
				<input type="text" name="name" placeholder="Name" bind:value={name} />
			</FormItem>
			<FormItem name="Email" label="Email">
				<input type="email" name="email" placeholder="Email" bind:value={email} />
			</FormItem>
			<FormItem name="Bio" label="Bio">
				<textarea name="bio" placeholder="Bio" bind:value={bio}></textarea>
			</FormItem>
			<FormItem name="Location" label="Location">
				<input type="text" name="location" placeholder="Location" bind:value={location} />
			</FormItem>
			<FormItem name="Website" label="Website">
				<input type="text" name="website" placeholder="Website" bind:value={website} />
			</FormItem>
			<button type="submit" onclick={handleUpdateUser}>Update</button>
		</Forms>
	</Modal>
</section>
