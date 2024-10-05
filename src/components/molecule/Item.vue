<script setup>
import Typography from "@/components/atoms/Typography.vue";
</script>

<template>
  <li :class="['link-card', customClass]">
    <!-- Dynamic class binding with default 'link-card' -->
    <a :href="href">
      <!-- Title Rendering -->
      <Typography variant="FiraCode" as="h5" color="dark" caseType="normal">
        {{ title }}
      </Typography>
      <!-- Slot for additional content like Icons or other elements -->
      <slot />
    </a>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    href: String,
    customClass: {
      type: [String, Object, Array], // Class binding can accept string, object, or array
      default: "",
    },
  },
};
</script>

<style scoped>
.link-card {
  list-style: none;
  display: flex;
  cursor: pointer;
}

.link-card > a {
  width: 100%;
  text-decoration: none;
  line-height: 1.4;
  color: var(--color-dark);
  background-color: var(--color-light);
  opacity: 0.8;
}

h5:hover {
  color: var(--lightHover); /* Fixed typo */
}

@media (max-width: 752px) {
  .link-card > a:hover {
    border-bottom: none;
    margin-bottom: 0;
  }
  .item-name {
    color: var(--color-light);
  }
}
</style>
