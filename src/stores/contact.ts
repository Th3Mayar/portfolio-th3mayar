import { ref } from "vue";
import { sendContactMessage } from "@/composables/supabase";
import { getClientLang } from "@/composables/client/getLang";

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
    alert.value = { type: "success", message: getClientLang() === "en" 
        ? "Message sent successfully!" 
        : "¡Mensaje enviado con éxito!" };
    contactForm.value = { name: "", email: "", message: "" };
  } else if (result.reason === "wait") {
    alert.value = {
      type: "warning",
      message: getClientLang() === "en" 
        ? `A recent message with this email already exists. Please wait ${result.minutesLeft} minutes before sending again.` 
        : `Ya existe un mensaje reciente con este correo electrónico. Por favor espera ${result.minutesLeft} minutos antes de enviar otro.`,
    };
  } else {
    alert.value = {
      type: "error",
      message: result.error
        ? `Error: ${result.error}`
        : getClientLang() === "en" 
            ? "An error occurred while sending the message. Please try again." 
            : "Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    };
  }
  sending.value = false;
}