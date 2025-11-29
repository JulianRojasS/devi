<script lang="ts">
	import SendRequest from '../../utils/SendRequest';
	import validator from '../../utils/validator';
	import Circle from '../../lib/components/global/Circle.svelte';
	import { onMount } from 'svelte';
	import { addAlert } from '$lib/stores/alerts';
	
	let circles: {
		id: number;
		size: number;
		color: string;
	}[];

	let name = '';
	let email = '';
	let password = '';

	const handleRegist = async (event: Event) => {
		event.preventDefault();
		const data = {
			name,
			email,
			password
		};
		if (!name || !email || !password) {
			addAlert('error', 'Por favor, ingrese un nombre, email y contraseña válidos.');
			return;
		}
		const res = await fetch('/api/users/create', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const response: User | undefined | null = validator(
			await res.json(),
			'User created successfully'
		);
		if (response) {
			addAlert('success', 'User created successfully');
			window.location.href = '/';
		}
	};

	onMount(() => {
		// Colores basados en la paleta de la app con opacidad suave
		const appColors = [
			'#3b82f6', // primary
			'#10b981', // secondary
			'#06b6d4' // cyan (complementario)
		];

		circles = Array.from({ length: 50 }, (_, i) => {
			const baseColor = appColors[i % appColors.length];
			// Convertir a RGB y agregar opacidad para suavidad
			const opacity = 0.2 + Math.random() * 0.2; // opacidad entre 0.2 y 0.5

			return {
				id: i,
				size: 20 + Math.random() * 40, // tamaños más pequeños y variados (20-60px)
				color: `${baseColor}${Math.floor(opacity * 255)
					.toString(16)
					.padStart(2, '0')}` // hex con alpha
			};
		});
	});
</script>

<section
	class="flex h-screen w-full sm:flex-col md:flex-row"
>
	<div
		class="z-5 flex flex-col items-center justify-center gap-3 p-8 sm:absolute sm:w-full md:relative md:w-1/3"
	>
	<form
	on:submit|preventDefault={handleRegist}
	action=""
	class="bg-dark/40 z-3 flex flex-col gap-3 rounded-2xl px-6 py-5 shadow-2xl shadow-secondary/50 text-light"
	>
		<h1 class="text-center text-3xl font-bold capitalize text-light">Regist on Devi</h1>
            <label for="name">Name:</label>
			<input
				bind:value={name}
				type="text"
				placeholder="Name"
				class="input input-bordered bg-light text-dark w-full max-w-xs rounded-lg p-2"
			/>
            <label for="email">Email:</label>
            <input
				bind:value={email}
				type="email"
				placeholder="Email"
				class="input input-bordered bg-light text-dark w-full max-w-xs rounded-lg p-2"
			/>
            <label for="password">Password:</label>
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="input input-bordered bg-light text-dark w-full max-w-xs rounded-lg p-2"
			/>
			<button
				type="submit"
				class="bg-accent text-light font-bold self-center cursor-pointer rounded-sm py-2 px-10 transition-transform hover:scale-105"
				>Regist</button
			>
		</form>
	</div>
	<div class="relative overflow-hidden sm:w-full md:w-2/3">
		{#each circles as circle (circle.id)}
			<Circle
				size={circle.size}
				color={circle.color}
				containerWidth={1000}
				containerHeight={1000}
				speed={0.01}
			/>
		{/each}
	</div>
</section>
