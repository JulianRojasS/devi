<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import validator from '../../../utils/validator';
	import { addAlert } from '$lib/stores/alerts';
	let code = $state('');

	interface OptItemProps {
		otp: Otps;
		progress: number;
	}

	const { otp, progress }: OptItemProps = $props();

	const refreshCode = () => {
		fetch(`/api/opt?secret=${otp.secret}`)
			.then((res) => res.json())
			.then((data) => {
				code = data.code;
			});
	};

	/* Cada que progress llegue a 0, se debe llamar a refreshCode */
	$effect(() => {
		if (progress === 30) {
			refreshCode();
		}
	});

	onMount(() => {
		refreshCode();
	});

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/opt/delete?id=${otp.id}`, {
				method: 'DELETE'
			});
			validator(await res.json(), 'Otp deleted successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error deleting otp');
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		addAlert('success', 'Code copied to clipboard');
	};
</script>

<div class="otp-item text-dark px-3 py-2">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-bold">{otp.name}</h2>
		<div class="flex items-center gap-2">
			<button
				onclick={handleCopy}
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-1 text-white transition-all duration-300 hover:scale-105"
				aria-label="Copy code"
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 0.5C3.07174 0.5 2.1815 0.868749 1.52513 1.52513C0.868749 2.1815 0.5 3.07174 0.5 4V13C0.5 13.9283 0.868749 14.8185 1.52513 15.4749C2.1815 16.1312 3.07174 16.5 4 16.5H6V9C6 7.34315 7.34315 6 9 6H16.5V4C16.5 3.07174 16.1312 2.1815 15.4749 1.52513C14.8185 0.868749 13.9283 0.5 13 0.5H4Z"
						fill="white"
					/>
					<path
						d="M8 10.8125C8 9.2592 9.2592 8 10.8125 8H20.1875C21.7408 8 23 9.2592 23 10.8125V20.1875C23 21.7408 21.7408 23 20.1875 23H10.8125C9.2592 23 8 21.7408 8 20.1875V10.8125Z"
						fill="white"
					/>
				</svg>
			</button>
			<button
				onclick={handleDelete}
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 text-white transition-all duration-300 hover:scale-105"
				aria-label="Delete code"
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z"
						fill="white"
					/>
					<path
						d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z"
						fill="white"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Barra de progreso -->
	<div class="flex items-center gap-2">
		<p class="text-center text-xl font-bold">{code}</p>
		<div class="progress-container">
			<div class="progress-bar" style="width: {(progress * 100) / 30}%"></div>
		</div>
		<div class="time-remaining">
			{Math.round(progress)}s
		</div>
	</div>
</div>

<style>
	.otp-item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 2px solid #e5e7eb;
		border-radius: 0.375rem;
		background: white;
		overflow: hidden;
	}

	.progress-container {
		width: 100%;
		height: 4px;
		background-color: #f3f4f6;
		border-radius: 2px;
		overflow: hidden;
		position: relative;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #5eedbe, #10b981);
		border-radius: 2px;
		transition: width 0.05s linear;
		position: relative;
	}

	.progress-bar::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 2px;
		height: 100%;
		background: #5eedbe;
		box-shadow: 0 0 4px #5eedbe;
	}

	.time-remaining {
		text-align: center;
		font-size: 1rem;
		color: #6b7280;
		font-weight: 500;
	}
</style>
