<script lang="ts">
	import SendRequest from '../utils/SendRequest';
	import validator from '../utils/validator';
	import Circle from '../lib/components/global/Circle.svelte';
	import { onMount } from 'svelte';
	import { addAlert } from '$lib/stores/alerts';
	
	let circles: {
		id: number;
		size: number;
		color: string;
	}[];

	let email = '';
	let password = '';

	const handleLogin = async (event: Event) => {
		event.preventDefault();
		const data = {
			email,
			password
		};

		if (!email || !password) {
			addAlert('error', 'Por favor, ingrese un email y contraseña válidos.');
			return;
		}
		
		try {
			const response = await SendRequest<User>('users/login', 'POST', JSON.stringify(data));
			const validatedData = validator(response);
			
			if (validatedData) {
				addAlert('success', 'Login exitoso');
				/// ir a home
				window.location.href = '/sesion/home';
			}
		} catch (error) {
			console.error('Error en la petición:', error);
			addAlert('error', 'Error de conexión. Intenta nuevamente.');
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
	on:submit|preventDefault={handleLogin}
	action=""
	class="bg-dark/20 z-3 flex flex-col gap-6 rounded-2xl px-6 py-5 shadow-2xl shadow-secondary/20"
	>
		<h1 class="text-center text-3xl font-bold capitalize">Login on Devi</h1>
			<input
				bind:value={email}
				type="email"
				placeholder="Email"
				class="input input-bordered bg-light text-dark w-full max-w-xs rounded-lg p-2"
			/>
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="input input-bordered bg-light text-dark w-full max-w-xs rounded-lg p-2"
			/>
			<button
				type="submit"
				class="bg-accent self-center cursor-pointer rounded-sm py-2 px-10 transition-transform hover:scale-105"
				>Login</button
			>
		</form>
		<a class="hover:underline" href="/regist">Sign in</a>
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
