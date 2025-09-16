<template>
  <div class="flex h-full w-full">
    <aside class="flex flex-col items-center gap-6 py-8 px-2 bg-bg-background border-r border-border min-w-[80px]">
      <button
        v-for="panel in panels"
        :key="panel.key"
        :class="[
          'flex flex-col items-center group p-2 rounded-lg transition-all',
          activePanel === panel.key ? 'bg-card/80 ring-2 ring-orange' : 'hover:bg-card/60'
        ]"
        @click="activePanel = panel.key"
      >
        <IconByName :name="panel.icon" color="light" className="text-3xl mb-1 group-hover:text-orange" />
        <span class="text-xs text-light group-hover:text-orange">{{ panel.label }}</span>
      </button>
    </aside>
    <section class="flex-1">
      <div v-if="activePanel === 'terminal'">
        <div class="bg-card/80 rounded-lg p-6 text-light font-mono min-h-[300px] flex items-center justify-center">
          <span class="opacity-60">[Linux Terminal]</span>
        </div>
      </div>
      <div v-else-if="activePanel === 'info'">
        <AboutInfoPanel />
      </div>
      <div v-else-if="activePanel === 'game'">
        <div class="bg-background rounded-lg p-6 text-light font-mono min-h-[300px] flex items-center justify-center">
          <span class="opacity-60">[Game Here]</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconByName from '@/components/atoms/IconByName.vue';
import AboutInfoPanel from './AboutInfoPanel.vue';

const activePanel = ref('terminal');
const panels = [
  { key: 'terminal', icon: 'Terminal', label: '' },
  { key: 'info', icon: 'User', label: '' },
  { key: 'game', icon: 'Gamepad', label: '' },
];
</script>