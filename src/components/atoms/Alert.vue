<template>
  <transition name="alert-fade">
    <div
      :class="[
        'fixed z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all -mt-[80px] justify-between w-full left-[.1%] top-[1rem]',
        type === 'success'
          ? 'bg-green/30 border-green/90 text-green/90'
          : type === 'error'
          ? 'bg-destructive-50 border-destructive-90 text-destructive-90'
          : 'bg-yellow-200 border-yellow-400 text-yellow-800',
      ]"
      role="alert"
    >
      <slot />
      <button
        @click="$emit('close')"
        class="ml-2 text-xl font-bold opacity-60 hover:opacity-100"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<style scoped>
.alert-fade-enter-active, .alert-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.alert-fade-enter-from, .alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.alert-fade-enter-to, .alert-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
<script setup lang="ts">
defineProps<{
  type?: "success" | "error" | "warning";
}>();
</script>