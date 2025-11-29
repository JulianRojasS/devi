<script lang="ts">
	export let container: Container;

	const getStateColor = (state: string) => {
		if (state === 'running') {
			return 'bg-green-600';
		} else if (state === 'stopped') {
			return 'bg-red-600';
		} else if (state === 'exited') {
			return 'bg-red-600';
		} else {
			return 'bg-gray-600';
		}
	};
</script>

<div class="bg-light/40 text-light flex justify-between rounded-md p-2">
	<div class="flex flex-col justify-between">
		<b class="capitalize">{container.Names.map((name) => name.split('/')[1]).join(', ')}</b>
		<p class="underline">Image: {container.Image}</p>
		<p class="text-sm">
			{container.Ports.map(
				(port) => `${port.PrivatePort} -> ${port.PublicPort} (${port.Type})`
			).join(', ')}
		</p>
	</div>
	<div class="flex flex-col gap-1 items-end">
        <span
            class={`text-light capitalize text-xs font-bold ${getStateColor(container.State)} rounded-md px-2 py-1`}
        >
            {container.State}
        </span>
		<p class="text-xs">
			Created at: {new Date(container.Created * 1000).toLocaleString()}
		</p>
		<p class="text-sm">{container.Status}</p>
	</div>
</div>
