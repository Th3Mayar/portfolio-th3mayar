<template>
  <div class="flex w-full">
    <aside
      class="w-1/5 min-w-[220px] bg-bg-background border-r border-border flex flex-col gap-4 p-6"
    >
      <div>
        <div class="font-mono text-light text-base mb-2">personal-info</div>
        <ul>
          <li v-for="folder in folders" :key="folder.key" class="mb-2">
            <button
              @click="toggleFolder(folder.key)"
              class="flex items-center gap-2 text-light hover:text-orange font-mono text-sm w-full text-left"
            >
              <span v-if="folder.open"
                ><IconByName
                  name="FolderOpen"
                  color="light"
                  className="text-xs mb-1 group-hover:text-orange"
              /></span>
              <span v-else
                ><IconByName
                  name="Folder"
                  color="light"
                  className="text-xs mb-1 group-hover:text-orange"
              /></span>
              <span>{{ folder.label }}</span>
            </button>
            <ul v-if="folder.open" class="ml-6 mt-1">
              <li v-for="file in folder.files" :key="file.key" class="mb-2">
                <button
                  @click="selectFile(file)"
                  class="flex items-center gap-2 text-light hover:text-green font-mono text-base w-full text-left"
                >
                  <IconByName
                    name="FileText"
                    color="light"
                    className="text-base mb-1 group-hover:text-green"
                  />
                  <span>{{ file.label }}</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <div class="font-mono text-light text-base mb-2">contacts</div>
        <ul>
          <li
            v-for="contact in contacts"
            :key="contact.type + contact.value"
            class="flex items-center justify-between gap-2 text-light font-mono text-base mb-1"
          >
            <div class="flex items-center gap-2">
              <IconByName
                v-if="contact.type === 'email'"
                name="Mail"
                color="light"
                @click="sendEmail(contact.value)"
                class="action-btn cursor-pointer"
                :aria-label="`Send email to ${contact.value}`"
                title="Send email"
                className="text-base mb-1 group-hover:text-orange"
              />
              <IconByName
                v-else
                @click="callNumber(contact.value)"
                name="Phone"
                color="light"
                class="action-btn cursor-pointer"
                className="text-base mb-1 group-hover:text-orange"
                :aria-label="`Call ${contact.value}`"
                title="Call"
              />
              <span
                class="text-base break-words cursor-pointer"
                @click="
                  contact.type === 'email'
                    ? sendEmail(contact.value)
                    : callNumber(contact.value)
                "
              >
                {{ contact.value }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <section class="flex-1 p-6">
      <div
        v-if="selectedFile"
        class="bg-card/80 rounded-lg min-h-[300px] overflow-hidden"
      >
        <div class="text-white p-3 font-mono text-sm border-b border-border">
          {{ selectedFile.label }}
        </div>
        <pre
          class="line-numbers m-0 p-4 text-white font-mono text-md overflow-auto !bg-bg"
        >
          <code ref="codeEl" class="language-javascript">{{ selectedFile.content }}</code>
        </pre>
      </div>
      <div
        v-else
        class="flex items-center justify-center h-full text-muted font-mono opacity-60"
      >
        Select a file to view its content.
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import IconByName from "../atoms/IconByName.vue";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// get prop activeDirectory
withDefaults(defineProps(), {
  activeDirectory: "bio",
});

const folders = ref([
  {
    key: "bio",
    label: "bio",
    open: true,
    files: [
      {
        key: "about-me",
        label: "about-me.js",
        content: `/**

 * Systems Engineering student passionate about technology with years of experience in development

 * fullstack graduated in Development and Maintenance of Computer Applications and since then, I have been

 * committed to advancing in the world of software development through constant academic training and dedicated

 * work towards excellence. My passion for GUI and UX development is reflected in every project.

 */`,
      },
    ],
  },
  {
    key: "interests",
    label: "interests",
    open: false,
    files: [
      {
        key: "interests-file",
        label: "interests.js",
        content: `/**

 * Interests

 * - Coding

 * - Open Source

 * - Gaming

 * - UI/UX

 * - Coffee

 * - Enjoying time with friends

 * - Eating

 * - Listening to music

 * - Inventing new things

 * - Discovering new things

 */`,
      },
    ],
  },
  {
    key: "education",
    label: "education",
    open: false,
    files: [
      {
        key: "high-school",
        label: "high-school.js",
        content: `/**

 * Technician in Development and Maintenance of Computer Applications

 * IATESA, La Vega, Dominican Republic

 */
`,
      },
      {
        key: "university",
        label: "university.js",
        content: `/**

 * University

 * Systems Engineering Student

 * Senior year student of Computer Systems Engineering at UCATECI,

 * La Vega, Dominican Republic.

 * From January 2022 to the present.

 */
`,
      },
    ],
  },
]);

const contacts = ref([
  { type: "email", value: "josehenriquez.02.26@gmail.com" },
  { type: "phone", value: "+1(###) ###-####" },
]);

// sanitize phone number to digits + optional leading +
function sanitizePhone(phone) {
  if (!phone) return "";
  const plus = phone.trim().startsWith("+") ? "+" : "";
  const digits = phone.replace(/[^\d]/g, "");
  return plus + digits;
}

// action: call phone number
function callNumber(phone) {
  const sanitized = sanitizePhone(phone);
  if (!sanitized) return;
  window.open(`tel:${sanitized}`, "_self");
}

// action: send email with subject/body template
function sendEmail(email) {
  if (!email) return;
  const subject = encodeURIComponent("Hello 👋");
  const body = encodeURIComponent("Hi,\n\nI wanted to get in touch with you.\n\n—");
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
}

// copy to clipboard helper
async function copyToClipboard(text) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    console.log(`Copied: ${text}`);
  } catch (err) {
    console.error("Copy failed", err);
  }
}

const selectedFile = ref(null);
const codeEl = ref(null);

function toggleFolder(key) {
  folders.value = folders.value.map((f) => (f.key === key ? { ...f, open: !f.open } : f));
}

function selectFile(file) {
  selectedFile.value = file;
  nextTick(() => {
    if (codeEl.value) {
      Prism.highlightElement(codeEl.value);
    }
  });
}

onMounted(() => {
  const bioFolder = folders.value.find((f) => f.key === "bio");
  if (bioFolder && bioFolder.files.length > 0) {
    selectedFile.value = bioFolder.files[0];
    nextTick(() => {
      if (codeEl.value) {
        Prism.highlightElement(codeEl.value);
      }
    });
  }
});
</script>

<style scoped>
::v-deep .line-numbers .line-numbers-rows {
  margin-left: -100px !important;
  left: -9.8em !important;
}

::v-deep .line-numbers {
  position: relative;
  padding-left: 3.8em;
}

/* Action button styles */
.action-btn {
  @apply inline-flex items-center justify-center p-1 rounded-md border border-transparent hover:bg-white/5 transition;
  width: 2rem;
  height: 2rem;
}

.action-btn:hover svg {
  transform: translateY(-1px);
}
</style>
