<script lang="ts">
	import Icon from '../global/Icon.svelte';
	import { goto } from '$app/navigation';

	export let stage: Stages;

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-600';
		}
	};
</script>

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