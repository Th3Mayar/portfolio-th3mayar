<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { routes } from "../../../public/routeImg";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: Number,
  strokeWidth: Number,
  className: {
    type: String,
    default: "",
  },
  fetchpriority: {
    type: String,
    default: undefined,
  },
});

const imageSrc = computed(() => {
  const imageName = props.name;
  let modifyUrl = "/";
  if (routes.logos[imageName as keyof typeof routes.logos]) {
    return modifyUrl + routes.logos[imageName as keyof typeof routes.logos];
  } else if (routes.projects[imageName as keyof typeof routes.projects]) {
    return modifyUrl + routes.projects[imageName as keyof typeof routes.projects];
  } else {
    console.error(`Image not found for name: ${imageName}`);
    return "";
  }
});
</script>

<template>
  <img
    :src="imageSrc"
    :alt="props.name"
    :width="size"
    :height="size"
    :class="className"
    :style="{ 'stroke-width': strokeWidth + 'px' }"
    loading="lazy"
    decoding="async"
    :fetchpriority="props.fetchpriority || 'low'"
  />
</template>
