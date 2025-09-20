<template>
  <div class="tetris-container">
    <canvas ref="canvas" :width="width" :height="height" class="tetris-canvas terminal-bg"></canvas>
    <div class="tetris-ui">
      <span class="font-FiraCode">Score: {{ score }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTetris } from '@/composables/gamePanel';

const canvas = ref(null);
const { width, height, score } = useTetris(canvas);
</script>

<style scoped>
.tetris-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tetris-canvas {
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
  border: 2px solid var(--border);
}

.tetris-ui {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}
</style>
