<script setup lang="ts">
import { defineProps, computed } from "vue";
import { routes } from "public/routeImg";

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

  if (routes.logos[imageName]) {
    imageSrc = modifyUrl + routes.logos[imageName];
  } else if (routes.projects[imageName]) {
    imageSrc = modifyUrl + routes.projects[imageName];
  } else {
    console.error(`Image not found for name: ${imageName}`);
  }

  console.log(imageSrc);

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
  />
</template>
