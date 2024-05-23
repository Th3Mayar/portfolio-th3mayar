<script setup>
import { defineProps, computed } from 'vue';
import * as icons from "lucide-vue-next";

const colorClasses = {
  light: "text-light",
  dark: "text-dark",
  purple: "text-purple",
  limongrass: "text-limongrass",
  green: "text-green",
  orange: "text-orange",
  pink: "text-pink",
  primary: "text-primary",
  secondary: "text-secondary",
  neutral: "text-neutral-300",
};

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: Number,
  strokeWidth: Number,
  defaultClass: String,
  color: {
    type: String,
    default: "light",
  },
  className: {
    type: String,
    default: "",
  },
});

const iconComponent = computed(() => icons[props.name]);

</script>

<template>
  <iconComponent
    :size="size"
    :class="colorClasses[color] || colorClasses.dark"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>