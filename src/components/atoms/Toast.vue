<template>
  <transition name="toast-fade">
    <div
      :class="[
        'fixed top-6 right-6 z-50 min-w-md max-w-lg flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all',
        type === 'success'
          ? 'bg-green/70 border-green-500 text-green-900'
          : type === 'error'
          ? 'bg-red-100 border-red-500 text-red-900'
          : 'bg-yellow-100 border-yellow-500 text-yellow-900',
      ]"
      role="alert"
    >
      <slot />
      <button
        @click="close"
        class="ml-auto text-xl font-bold opacity-60 hover:opacity-100 px-2"
        aria-label="Cerrar"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  type?: 'success' | 'error' | 'warning';
  show: boolean;
  duration?: number; // ms
}>();

const emit = defineEmits(['close']);

const visible = ref(props.show);

watch(() => props.show, (val) => {
  visible.value = val;
  if (val && props.duration !== 0) {
    setTimeout(close, props.duration || 3000);
  }
});

onMounted(() => {
  if (props.show && props.duration !== 0) {
    setTimeout(close, props.duration || 3000);
  }
});

function close() {
  visible.value = false;
  emit('close');
}
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.toast-fade-enter-to, .toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
