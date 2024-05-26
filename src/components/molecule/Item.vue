<!-- Create component Item ul, li, a -->
<script setup>
import Typography from "@/components/atoms/Typography.vue";
</script>

<template>
  <li :class="class">
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
    class: String,
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

h5:hover{
  color: var(--lighHover);
}

@media (max-width: 752px) {
  .link-card > a:hover{
    border-bottom: none;
    margin-bottom: 0;
  }
  .item-name{
    color: var(--color-light);
  }
}
</style>
