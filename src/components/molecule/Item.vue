<script lang="ts">
import { defineComponent } from 'vue';
import Typography from "@/components/atoms/Typography.vue";

export default defineComponent({
  props: {
    title: String,
    href: String,
    customClass: {
      type: [String, Object, Array],
      default: "",
    },
    classLink: {
      type: String,
      default: "",
    },
    IconPosition: {
      type: String,
      default: "left",
      validator: (value: string) => ["left", "right", "top", "bottom"].includes(value),
    },
  },
  components: {
    Typography,
  },
});
</script>

<template>
  <li :class="['flex items-center cursor-pointer', customClass]">
    <a
      :href="href"
      :class="[
        'flex items-center w-full rounded-lg transition-all',
        'text-gray-300 ',
        classLink,
      ]"
    >
      <div v-if="IconPosition === 'top'" class="flex justify-center mb-2">
        <slot />
      </div>

      <div
        :class="[
          'flex items-center gap-2 w-full',
          IconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
        ]"
      >
        <slot v-if="IconPosition === 'left' || IconPosition === 'right'" />
        <Typography variant="FiraCode" as="h5" class="text-sm text-gray-300 pointer-events-none">
          {{ title }}
        </Typography>
        <slot v-if="IconPosition === 'right'" />
      </div>

      <div v-if="IconPosition === 'bottom'" class="flex justify-center mt-2">
        <slot />
      </div>
    </a>
  </li>
</template>

<style scoped>
/* Mobile optimizations */
@media (max-width: 768px) {
  a {
    padding: 0.75rem;
  }
}
</style>
