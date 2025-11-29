<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  import { alerts } from '$lib/stores/alerts';
  export let alert: { id: string; type: 'success' | 'error'; message: string | string[] };
  $: alertsList = $alerts;
  const removeAlert = (id: string) => {
    alerts.update(alerts => alerts.filter((alert) => alert.id !== id));
  };
  const getAlertColor = (type: 'success' | 'error') => {
    return type === 'success' ? 'bg-green-500' : 'bg-red-500';
  };
  onMount(() => {
    setTimeout(() => {
      alerts.update(alerts => alerts.filter((alert) => alert.id !== alertsList[0].id));
    }, 3000);
  });
</script>

<div class="{getAlertColor(alert.type)} p-2 rounded-md max-w-100 flex gap-2 justify-between items-start">
  <p class="text-base text-light">{@html alert.message}</p>
  <button onclick={() => removeAlert(alert.id)}>
    <Icon name="close" width="16" height="16" fill="white" />
  </button>
</div>