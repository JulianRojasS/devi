<script lang="ts">
  import { onMount } from 'svelte';

  export let size = 50; // diámetro en px
  export let color = "#3498db";
  export let containerWidth = 400; // ancho del contenedor
  export let containerHeight = 400; // alto del contenedor
  export let speed = 0.03; // velocidad de interpolación (0.01 = muy lento, 0.1 = muy rápido)

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let animationId: number;

  function getRandomTarget() {
    // Generar nueva posición aleatoria dentro de los límites del contenedor
    targetX = Math.random() * (containerWidth - size);
    targetY = Math.random() * (containerHeight - size);
  }

  function animate() {
    // Interpolación suave hacia la posición objetivo
    x += (targetX - x) * speed;
    y += (targetY - y) * speed;

    // Si estamos cerca del objetivo, generar uno nuevo
    const distanceToTarget = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
    if (distanceToTarget < 5) {
      getRandomTarget();
    }

    animationId = requestAnimationFrame(animate);
  }

  onMount(() => {
    // Posición inicial aleatoria
    x = Math.random() * (containerWidth - size);
    y = Math.random() * (containerHeight - size);
    getRandomTarget();
    animate();

    // Cleanup al desmontar el componente
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });
</script>

<style>
  .circle {
    border-radius: 50%;
    position: absolute;
    transition: none; /* Deshabilitamos las transiciones CSS para usar animación JS */
    will-change: transform; /* Optimización para el rendimiento */
    z-index: 1;
  }
</style>

<div
  class="circle"
  style="
    width: {size}px; 
    height: {size}px; 
    background: {color};
    left: {x}px;
    top: {y}px;
  "
></div>