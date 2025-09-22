<template>
  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border border-border', colorClass, className]">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Badge",
  props: {
    color: {
      type: String,
      default: "gray",
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    colorClass(): string {
      switch (this.color) {
        case "red":
          return "bg-red-700 text-white";
        case "blue":
          return "bg-blue-700 text-white";
        case "green":
          return "bg-green-700 text-white";
        case "yellow":
          return "bg-yellow-600 text-black";
        case "purple":
          return "bg-purple-700 text-white";
        case "pink":
          return "bg-pink-700 text-white";
        case "gray":
          return "bg-gray-700 text-white";
        case "orange":
          return "bg-orange-600 text-white";
        case "primary":
          return "bg-primary text-primary-foreground";
        case "muted":
          return "bg-dark-background text-dark-foreground";
        default:
          return "bg-gray-700 text-white";
      }
    },
  },
});
</script>