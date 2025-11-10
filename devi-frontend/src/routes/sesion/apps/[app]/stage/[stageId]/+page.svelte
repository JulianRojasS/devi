<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../../../../utils/validator';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';
	import Modal from '$lib/components/global/Modal.svelte';
	import CreateTask from '$lib/components/tasks/CreateTask.svelte';
	import Icon from '$lib/components/global/Icon.svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: isOpen = false;
	$: stage = {} as Stages;
	$: tasks = [] as Tasks[];
	$: users = [] as User[];
	$: taskCount = tasks.length;
	$: completedTasks = tasks.filter((task) => task.status === 'completed').length;

	onMount(() => {
		const stageRes = validator(data.stage);
		if (stageRes) {
			stage = stageRes;
		}
		const tasksRes = validator(data.tasks);
		if (tasksRes) {
			tasks = tasksRes;
		}
		const usersRes = validator(data.users);
		if (usersRes) {
			users = usersRes;
		}
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-600';
			case 'incomplete':
				return 'bg-red-600';
			case 'pending':
				return 'bg-yellow-600';
		}
	};
	const getDaysDifference = (startDate: string, endDate: string) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
</script>

<section class="flex flex-col gap-2">
	<header class="flex items-center justify-between gap-2">
		<Icon
			onClick={() => goto(`/sesion/apps/${stage.appId}`)}
			name="back"
			width="30"
			height="30"
			fill="white"
			hover
		/>
		<h1 class="flex items-center gap-2 text-2xl font-bold capitalize">
			Stage {stage.name}
		</h1>
		<span class="{getStatusColor(stage.status)} rounded-md p-1">
			<p class="capitalize">
				{stage.status}
			</p>
		</span>
	</header>
	<div
		class="flex justify-between gap-5 rounded-sm border-b bg-gradient-to-b from-transparent to-light/5 p-5"
	>
		<div class="flex grow flex-col gap-2">
			<p>
				{getDaysDifference(new Date().toISOString(), stage.expectedCompletionDate)} days left
			</p>
			<p>
				Expected completion date: {new Date(stage.expectedCompletionDate).toLocaleDateString()}
			</p>
			<p class="h-20 w-full rounded-md bg-light/20 p-2">
				{#if stage.description}
					{stage.description}
				{:else}
					No description
				{/if}
			</p>
			<span class="flex items-center gap-2 font-bold">
				<p>Creator: {stage.creator?.name}</p>
				<p>Assigned to: {stage.user?.name}</p>
			</span>
		</div>
		<div
			class="flex w-100 flex-col items-center justify-center gap-2 self-start rounded-md bg-white/10 p-2"
		>
			{#if stage.currentTask}
				<div class="flex flex-col w-full h-full gap-1">
					<span class="flex justify-between">
						<p>Current Task:</p>
						<p class="{getStatusColor(stage.currentTask.status)} rounded-md p-1 capitalize">
							{stage.currentTask.status}
						</p>
					</span>
					<span class="flex justify-between">
						<b class="text-lg font-bold capitalize">
							{stage.currentTask.name}
						</b>
						<p>
							{getDaysDifference(new Date().toISOString(), stage.currentTask.endDate)} days left
						</p>
					</span>
				</div>
			{:else}
				<Icon name="info" width="24" height="24" fill="white" hover />
				<p>No current task</p>
			{/if}
		</div>
	</div>
	<button
		class="cursor-pointer self-end rounded-md bg-accent px-5 py-1 font-semibold text-light transition-all duration-300 hover:scale-103 hover:bg-accent/70 hover:text-light"
		onclick={() => (isOpen = true)}
	>
		New task
	</button>
	<div class="flex gap-2">
		<p class="rounded-md bg-primary/80 px-5 py-1">Progress: {stage.progress}%</p>
		<p class="rounded-md bg-primary/80 px-5 py-1">Completed Tasks: {completedTasks}</p>
		<p class="rounded-md bg-primary/80 px-5 py-1">Total Tasks: {taskCount}</p>
	</div>
	<div class="flex flex-col gap-2 p-2">
		<h2 class="text-lg font-bold">Tasks:</h2>
		{#if tasks.length > 0}
			{#each tasks as task}
				<TaskItem {task} />
			{/each}
		{:else}
			<div
				class="flex w-100 flex-col items-center justify-center gap-2 self-center rounded-md bg-white/10 p-2"
			>
				<Icon name="info" width="24" height="24" fill="white" hover />
				<p>No tasks</p>
				<p>Create a new task to get started</p>
				<button
					class="cursor-pointer self-center rounded-md bg-accent px-5 py-1 font-semibold text-light transition-all duration-300 hover:scale-103 hover:bg-accent/70 hover:text-light"
					onclick={() => (isOpen = true)}
				>
					New task
				</button>
			</div>
		{/if}
	</div>
	<Modal {isOpen} onClose={() => (isOpen = false)}>
		<CreateTask stageId={stage.id} {users} />
	</Modal>
</section>
