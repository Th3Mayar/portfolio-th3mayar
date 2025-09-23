<template>
  <div class="card">
    <div class="card-header">
      <div class="image-container" @click="openModal">
        <img
          v-if="props.video"
          :src="`/videos/${props.video}.gif`"
          class="card-gif"
          alt="Project GIF"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
        />
        <ImageByName
          v-else-if="props.image"
          :name="props.image"
          :stroke-width="1"
          :className="className + ' card-img'"
          fetchpriority="high"
        />
        <div class="logo">
          <ImageByName
            :name="icon"
            :stroke-width="1"
            :className="className"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
    <div class="card-body min-h-fit">
      <slot />
    </div>
    <div class="card-tags flex flex-wrap gap-2 mb-16 justify-center p-2">
      <slot name="tags" />
    </div>
    <div class="justify-end flex bottom-0 absolute w-full">
      <Button
        :variant="ButtonVariant"
        :size="size"
        class="w-44 !rounded-[0px] !rounded-tl-lg"
        @click="openUrl(url)"
        :disabled="url === ''"
      >
        {{ button }}
      </Button>
    </div>
    <teleport to="body">
      <div v-if="showModal" class="modal-bg" @click="showModal = false">
        <div class="modal-img-wrapper" @click.stop>
          <img
            v-if="props.video && showModal"
            :src="`/videos/${props.video}.gif`"
            class="modal-gif"
            alt="Project GIF"
          />
          <template v-else-if="props.image && showModal">
            <ImageByName
              :name="props.image"
              :stroke-width="1"
              className="modal-img"
              fetchpriority="high"
              @error="imageError = true"
            />
            <div
              v-if="imageError"
              class="flex flex-col items-center justify-center w-full h-full p-8"
            >
              <span class="text-light text-lg font-mono mb-2">Image not found</span>
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="text-orange"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </template>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";
import ImageByName from "../atoms/ImageByName.vue";
import Button from "../atoms/Button.vue";

interface Props {
  image?: string;
  video?: string;
  icon: string;
  className?: string;
  ButtonVariant?: string;
  size?: string;
  button: string;
  url: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  ButtonVariant: "simple",
  size: "medium",
  image: "",
  video: "",
});

const showModal = ref(false);
const imageError = ref(false);

const openModal = () => {
  if (props.image || props.video) {
    showModal.value = true;
    imageError.value = false;
  }
};

function handleEsc(e: KeyboardEvent) {
  if (e.key === "Escape") showModal.value = false;
}

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEsc);
});

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
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid var(--border);
  gap: 2rem;
  align-items: stretch;
  justify-content: stretch;
  height: auto;
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
  object-fit: contain;
  border-radius: 16px 16px 0 0;
}

.image-container:hover .card-img {
  transform: none;
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
  padding: 0;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.modal-img {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 12px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.card-gif {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
}

.modal-gif {
  max-width: 80vw;
  max-height: 70vh;
  border-radius: 12px;
}

.gif-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
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
