<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 z-index"
    role="dialog"
    aria-modal="true"
    aria-labelledby="welcomeTitle"
  >
    <div
      class="bg-bg-background rounded-s-lg rounded-e-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center ring-2 ring-limongrass/40 animate-fade-in"
    >
      <h2 id="welcomeTitle" class="text-2xl font-bold mb-4 text-limongrass">Welcome!</h2>
      <!-- paragraph con typewriter -->
      <p class="mb-6 text-center text-light min-h-[3rem]">
        <span aria-live="polite">{{ typedText }}</span><span class="cursor" v-if="typing">|</span>
      </p>
      <div class="flex gap-6">
        <transition name="btn-pop" appear>
          <Button
            v-if="showButton1"
            ref="btn1"
            @click="select('developer')"
            variant="simple"
            size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors"
          >
            developer ?
          </Button>
        </transition>

        <transition name="btn-pop" appear>
          <Button
            v-if="showButton2"
            @click="select('recruiter')"
            variant="secondary"
            size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors"
          >
            recruiter ?
          </Button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { userType, setUserType } from "@/stores/userType";
import Button from "./Button.vue";

const show = ref(false);

// Typewriter state
const fullText = "Are you a Developer or a Recruiter?";
const typedText = ref("");
const typing = ref(true);

// Buttons
const showButton1 = ref(false);
const showButton2 = ref(false);
const btn1 = ref(null);

onMounted(async () => {
  if (!userType.value) {
    show.value = true;
    await runTypewriter();
    showButton1.value = true;
    await nextTick();
    if (btn1.value && btn1.value.$el) {
      try { btn1.value.$el.focus(); } catch (e) { /* ignore */ }
    }
    setTimeout(() => {
      showButton2.value = true;
    }, 1000);
  }
});

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function runTypewriter() {
  typing.value = true;
  typedText.value = "";

  for (let i = 0; i < fullText.length; i++) {
    typedText.value += fullText[i];
    const base = 35;
    const variance = Math.random() * 40;
    await sleep(base + variance);
  }

  await sleep(300);
  typing.value = false;
}

function select(type) {
  setUserType(type);
  show.value = false;
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.z-index {
  z-index: 1000;
}

.cursor {
  display: inline-block;
  width: 0.6rem;
  margin-left: 0.15rem;
  animation: blink 900ms steps(1) infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.btn-pop-enter-active,
.btn-pop-leave-active {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms;
}

.btn-pop-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}

.btn-pop-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>