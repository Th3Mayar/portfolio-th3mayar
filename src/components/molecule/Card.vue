<template>
  <div class="card">
    <div class="card-header">
      <div class="image-container" @click="openImageModal">
        <ImageByName :name="image" :stroke-width="1" :className="className + ' card-img'" />
        <div class="logo">
          <ImageByName :name="icon" :stroke-width="1" :className="className" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div class="card-footer">
      <Button
        :variant="ButtonVariant"
        :size="size"
        :disabled="false"
        class="w-44 rounded-xl"
        @click="openUrl(url)"
      >
        {{ button }}
      </Button>
    </div>
    <div v-if="showModal" class="modal-bg" @click="showModal = false">
      <div class="modal-img-wrapper" @click.stop>
        <ImageByName :name="image" :stroke-width="1" className="modal-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import ImageByName from "../atoms/ImageByName.vue";
import Button from "../atoms/Button.vue";

interface Props {
  image: string;
  icon: string;
  className?: string;
  ButtonVariant?: string;
  size?: string;
  button: string;
  url: string;
}

withDefaults(defineProps<Props>(), {
  className: "",
  ButtonVariant: "simple",
  size: "medium",
});

const showModal = ref(false);
const openImageModal = () => {
  showModal.value = true;
};
const openUrl = (url: string) => {
  if (url) {
    window.open(url, "_blank");
  }
};
</script>

<style scoped>
.card {
  background-color: var(--card);
  width: 350px;
  min-width: 300px;
  max-width: 350px;
  height: 480px;
  min-height: 480px;
  max-height: 480px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid var(--border);
  gap: 2rem;
  align-items: stretch;
  justify-content: stretch;
}

.card-header {
  display: flex;
  border-bottom: 2px solid var(--border);
  position: relative;
}

.image-container {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  cursor: pointer;
  position: relative;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
  transition: transform 0.2s;
}

.image-container:hover .card-img {
  transform: scale(1.04);
}

.card-body {
  padding: 0 2.5rem 0 2.5rem;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 80px;
  max-height: 120px;
  overflow: hidden;
}

.card-footer {
  display: flex;
  padding: 0 0 2.5rem 2.5rem;
  align-items: flex-end;
  flex: 0 0 auto;
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

.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img-wrapper {
  background: var(--card);
  border-radius: 16px;
  padding: 1rem;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img {
  max-width: 80vw;
  max-height: 70vh;
  border-radius: 12px;
  object-fit: contain;
}

@media (max-width: 600px) {
  .card {
    width: 98vw;
    min-width: 0;
    max-width: 100vw;
    height: 340px;
    min-height: 340px;
    max-height: 340px;
  }
}
</style>
