<template>
  <div class="card">
    <div class="card-header">
      <div class="image-container">
        <ImageByName :name="image" stroke-width="1" :className="className" />
        <div class="logo">
          <ImageByName :name="icon" stroke-width="1" :className="className" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <slot name="content" />
    </div>
    <div class="card-footer">
      <Button
        :variant="ButtonVariant"
        :size="size"
        :disabled="false"
        class="w-44 rounded-xl"
      >
        <slot />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ImageByName from "../atoms/ImageByName.vue";
import Button from "../atoms/Button.vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  ButtonVariant: {
    type: String,
    default: "simple",
  },
  size: {
    type: String,
    default: "medium",
  },
});
</script>

<style scoped>
.card {
  background-color: var(--card);
  width: 500px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid var(--border);
  gap: 2rem;
}

.card-header {
  display: flex;
  border-bottom: 2px solid var(--border);
  position: relative;
}

.image {
  align-self: flex-start;
  width: max-content;
}

.image-container img {
  width: 100%;
}

.card-body {
  padding: 0 2.5rem 0 2.5rem;
}

.card-footer {
  display: flex;
  padding: 0 0 2.5rem 2.5rem;
}

.design-logo {
  position: absolute;
  background-color: var(--border);
  padding: 5px;
  align-items: end;
}

.logo {
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 10%;
  background-color: var(--border);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  padding: 10px;
}
</style>
