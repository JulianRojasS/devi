<script lang="ts">
	export let container: Container;

    const getStateColor = (state: string) => {
		switch (state) {
			case 'running':
				return 'bg-green-600';
			case 'stopped':
				return 'bg-red-600';
		}
	}
</script>
<div class="flex flex-col gap-1 rounded-md bg-light p-2 text-dark">
    <span class="flex items-center justify-between gap-2">
        <b class="capitalize">{container.Names.map((name) => name.split('/')[1]).join(', ')}</b>
        <span
            class={`text-sm font-bold text-light ${getStateColor(container.State)} rounded-md px-2 py-1`}
        >
            {container.State}
        </span>
    </span>
    <p>
        {container.Ports.map(
            (port) => port.PrivatePort + ':' + port.PublicPort + ' ' + port.Type
        ).join(', ')}
    </p>
    <p>{container.Image}</p>
    <p>{container.Status}</p>
</div>