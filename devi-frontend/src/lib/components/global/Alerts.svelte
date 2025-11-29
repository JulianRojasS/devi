<script lang="ts">
  import { alerts } from '$lib/stores/alerts';
  import AlertItem from './AlertItem.svelte';
  $: alertsList = $alerts;
</script>

<div class="absolute top-0 right-0 w-100 z-50 flex flex-col gap-2 p-2">
  {#each alertsList as alert, index}
    <AlertItem alert={alert} />
  {/each}
</div>