<template>
  <form
    class="w-full max-w-2xl bg-card/80 rounded-md p-6 flex flex-col gap-4 animate-slide-down z-50"
    @submit.prevent="submitContactForm"
  >
    <label class="flex flex-col gap-1 mb-2">
      <span class="font-FiraCode text-xs text-light">{{ fields.name }}</span>
      <input
        type="text"
        name="name"
        required
        v-model="contactForm.name"
        class="bg-dark/30 text-light rounded px-3 py-3 outline-none focus:ring-2 focus:ring-orange focus:shadow-none rounded-lg shadow-md shadow-orange"
        :placeholder="fields.namePlaceholder"
      />
    </label>
    <label class="flex flex-col gap-1 mb-2">
      <span class="font-FiraCode text-xs text-light">{{ fields.email }}</span>
      <input
        type="email"
        name="email"
        required
        v-model="contactForm.email"
        class="bg-dark/30 text-light rounded px-3 py-3 outline-none focus:ring-2 focus:ring-orange focus:shadow-none rounded-lg shadow-md shadow-orange"
        :placeholder="fields.emailPlaceholder"
      />
    </label>
    <label class="flex flex-col gap-1 mb-2">
      <span class="font-FiraCode text-xs text-light">{{ fields.message }}</span>
      <textarea
        name="message"
        rows="4"
        required
        v-model="contactForm.message"
        class="bg-dark/30 text-light rounded px-3 py-3 outline-none focus:ring-2 focus:ring-orange focus:shadow-none rounded-lg shadow-md shadow-orange"
        :placeholder="fields.messagePlaceholder"
      ></textarea>
    </label>
    <Button
      variant="orange"
      size="md"
      :disabled="sending"
      class:list="self-end mt-2 w-full"
      type="submit"
    >
      <span class="flex items-center gap-2 font-bold">
        <IconByName name="Send" color="light" className="w-4 h-4" />
        <span v-if="sending">{{ fields.sending }}...</span>
        <span v-else>{{ fields.send }}</span>
      </span>
    </Button>
    <Alert v-if="alert" :type="alert.type" @close="alert = null">
      {{ alert.message }}
    </Alert>
  </form>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import IconByName from "@/components/atoms/IconByName.vue";
import Alert from "@/components/atoms/Alert.vue";
import { contactForm, sending, alert, submitContactForm } from "@/stores/contact";
import { useTranslations } from "@/i18n/utils";

const props = defineProps<{
  lang: "en" | "es";
}>()

const { contact: TContact } = useTranslations(props.lang);
const { fields } = TContact;
</script>