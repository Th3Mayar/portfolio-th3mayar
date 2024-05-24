<!-- Create component Item ul, li, a -->
<script setup>
import Typography from "@/components/atoms/Typography.vue";
</script>

<template>
  <li class="link-card">
    <a :href="href">
      <Typography variant="FiraCode" as="h5" color="dark" caseType="normal">
        _{{ title }}
      </Typography>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    body: String,
    href: String,
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
.link-card > a:hover {
 border-bottom: 4px solid var(--orangeHover);
 margin-bottom: -18px;
}
</style>
