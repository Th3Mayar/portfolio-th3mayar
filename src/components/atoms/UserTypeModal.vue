<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 z-index"
    role="dialog"
    aria-modal="true"
    aria-labelledby="welcomeTitle"
  >
    <ImageByName name="effectCard" className="w-96 h-full absolute mt-7 opacity-60" fetchpriority="high" />
    <div
      class="bg-bg-background rounded-s-lg rounded-e-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center ring-2 ring-limongrass/40 animate-fade-in"
    >
      <h2
        id="welcomeTitle"
        class="text-2xl font-bold mb-4 text-limongrass animate-slide-down select-none"
      >
        {{ TModal.title }}!
      </h2>
      <!-- paragraph con typewriter -->
      <p class="mb-6 text-center text-light min-h-[3rem]">
        <span aria-live="polite">{{ typedText }}...</span
        ><span class="cursor" v-if="typing">|</span>
      </p>
      <div class="flex gap-6">
        <transition name="btn-pop" appear>
          <Button
            v-if="showButtonOne"
            ref="btn1"
            @click="select('developer')"
            variant="simple"
            size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors animate-slide-down"
          >
            {{ TModal.developer }}
          </Button>
        </transition>

        <transition name="btn-pop" appear>
          <span v-if="showOr" class="animate-slide-down select-none">{{ TModal.or }}</span>
        </transition>

        <transition name="btn-pop" appear>
          <Button
            v-if="showButtonTwo"
            @click="select('recruiter')"
            variant="secondary"
            size="sm"
            class="text-orange font-mono hover:text-orange/80 transition-colors animate-panel-in-up"
          >
            {{ TModal.recruiter }} ?
          </Button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from "vue";
import Button from "./Button.vue";
import { getClientLang } from "@/core/helper/getLang";
import { useTranslations } from "@/i18n/utils";
import { useTypeModalUser } from "@/composables/userTypeModal";
import ImageByName from "./ImageByName.vue";

const {
  show,
  showButtonOne,
  showButtonTwo,
  btn,
  typing,
  typedText,
  runTypewriter,
  select,
  userType,
  setFullText,
  showOr,
} = useTypeModalUser();

const { common: TCommon } = useTranslations(getClientLang());
const { components } = TCommon;
const { modal: TModal } = components;

onMounted(async () => {
  if (!userType.value) {
    show.value = true;
    setFullText(TModal.description);
    await runTypewriter();
    showButtonOne.value = true;
    await nextTick();
    if (btn.value && btn.value.$el) {
      try {
        btn.value.$el.focus();
      } catch (e) {
        /* ignore */
      }
    }
    setTimeout(() => {
      showOr.value = true;
      setTimeout(() => {
        showButtonTwo.value = true;
      }, 600);
    }, 600);
  }
});
</script>

<style scoped>
.z-index {
  z-index: 1000;
}

.cursor {
  display: inline-block;
  width: 0.6rem;
  margin-left: 0.15rem;
  animation: blink 900ms steps(1) infinite;
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
