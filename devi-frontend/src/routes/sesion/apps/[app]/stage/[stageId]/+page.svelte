<script lang="ts">
	import { onMount } from 'svelte';
	import validator from '../../../../../../utils/validator';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';
	import Modal from '$lib/components/global/Modal.svelte';
	import CreateTask from '$lib/components/tasks/CreateTask.svelte';
	import Icon from '$lib/components/global/Icon.svelte';
	import { goto } from '$app/navigation';
	import DegradedSection from '$lib/components/global/DegradedSection.svelte';
	import StageHeader from '$lib/components/stages/StageHeader.svelte';
	import StageInfo from '$lib/components/stages/StageInfo.svelte';
	import StageCurrentTask from '$lib/components/stages/StageCurrentTask.svelte';
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

	const handleSetIsOpen = () => {
		isOpen = true;
	};
</script>

<section class="flex flex-col gap-2 p-3">
	<StageHeader {stage} />
	<DegradedSection>
		<div class="flex justify-between gap-5 to-light/5 p-5">
			<StageInfo {stage} />
			<StageCurrentTask {stage} {handleSetIsOpen} />
		</div>
	</DegradedSection>
	<div class="flex h-full flex-col gap-2 p-2">
		<h2 class="text-lg font-bold">Tasks:</h2>
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
		{#if tasks.length > 0}
			{#each tasks as task}
				<TaskItem {task} />
			{/each}
		{:else}
			<div
				class="flex h-full w-full flex-col items-center justify-center gap-2 self-center rounded-md bg-white/10 p-2"
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
