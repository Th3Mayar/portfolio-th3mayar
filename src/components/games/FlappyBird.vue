<template>
  <div class="flappy-container">
    <canvas ref="canvas" :width="width" :height="height" class="flappy-canvas terminal-bg"></canvas>
    <div class="flappy-ui">
      <span class="font-FiraCode">{{ games.score }}: {{ score }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFlappyBird } from '@/composables/gamePanel';
import { useTranslations } from "@/i18n/utils";
import { getClientLang } from "@/composables/client/getLang";

const lang = getClientLang() as "en" | "es";

const { about: TAbout } = useTranslations(lang);
const { games } = TAbout;

const canvas = ref(null);
const { width, height, score } = useFlappyBird(canvas);
</script>

<style scoped>
.flappy-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 60dvh;
  gap: 0.5rem;
}

.flappy-canvas {
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 5/4;
  min-width: 300px;
  min-height: 300px;
  max-height: 80vh;
  display: block;
  border: 2px solid var(--border);
}

.flappy-ui {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}
</style>
