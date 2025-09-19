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
});

const ImageComponent = computed(() => {
  const imageName = props.name;

  let imageSrc = "";
  let modifyUrl = "/";

  if (routes.logos[imageName as keyof typeof routes.logos]) {
    imageSrc = modifyUrl + routes.logos[imageName as keyof typeof routes.logos];
  } else if (routes.projects[imageName as keyof typeof routes.projects]) {
    imageSrc = modifyUrl + routes.projects[imageName as keyof typeof routes.projects];
  } else {
    console.error(`Image not found for name: ${imageName}`);
  }

  return imageSrc;
});
</script>

<template>
  <img
    :src="ImageComponent"
    :alt="props.name"
    :width="size"
    :height="size"
    :class="className"
    :style="{ 'stroke-width': strokeWidth + 'px' }"
    loading="lazy"
  />
</template>
