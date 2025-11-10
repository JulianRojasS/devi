<script lang="ts">
	import { onMount } from "svelte";
	import validator from "../../../utils/validator";
	import CreateOtp from "../../../lib/components/otps/CreateOtp.svelte";
	import OptItem from "../../../lib/components/otps/OptItem.svelte";
	interface OtpsPageProps {
		data: {
			otps: result<Otps[] | null | undefined>;
			apps: result<Apps[] | null | undefined>;
		}
	}
	const { data }: OtpsPageProps = $props();
  let otps: Otps[] = $state([]);
  let apps: Apps[] = $state([]);
  let progress = $state(0);
  onMount(() => {
		otps = validator(data.otps) || [];
		apps = validator(data.apps) || [];
	});
  const refreshCode = () => {
    fetch(`/api/opt?secret=0`)
      .then((res) => res.json())
      .then((data) => {
        progress = data.timeRemaining; // Reset progress when code updates
      });
  }

	onMount(() => {
    refreshCode();
    
    setInterval(() => {
			refreshCode();
		}, 1000); // refresh every 5 seconds
	});
</script>

<section class="flex flex-col gap-2">
	<h1>Otps</h1>
  <CreateOtp />
  <div class="p-3 grid grid-cols-4 gap-2">
    {#if otps}
      {#each otps as otp}
        <OptItem {otp} {progress} {apps} />
      {/each}
    {/if}
  </div>
</section>