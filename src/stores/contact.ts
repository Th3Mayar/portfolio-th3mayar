import { ref } from "vue";
import { sendContactMessage } from "@/composables/supabase";

export const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

export const sending = ref(false);
export const alert = ref<{ type: "success" | "error" | "warning"; message: string } | null>(null);

export async function submitContactForm() {
  sending.value = true;
  alert.value = null;

  const { name, email, message } = contactForm.value;
  const result = await sendContactMessage({ name, email, message });

  if (result.success) {
    alert.value = { type: "success", message: "Message sent successfully!" };
    contactForm.value = { name: "", email: "", message: "" };
  } else if (result.reason === "wait") {
    alert.value = {
      type: "warning",
      message: `A recent message with this email already exists. Please wait ${result.minutesLeft} minutes before sending again.`,
    };
  } else {
    alert.value = {
      type: "error",
      message: result.error
        ? `Error: ${result.error}`
        : "An error occurred while sending the message. Please try again.",
    };
  }
  sending.value = false;
}