<template>
  <div class="flex w-full h-[75dvh]">
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
            :key="contact.type"
            class="flex items-center gap-2 text-light font-mono text-base mb-1"
          >
            <IconByName
              v-if="contact.type === 'email'"
              name="Mail"
              color="light"
              className="text-base mb-1 group-hover:text-orange"
            />
            <IconByName
              v-else
              name="Phone"
              color="light"
              className="text-base mb-1 group-hover:text-orange"
            />
            <span class="text-base">{{ contact.value }}</span>
          </li>
        </ul>
      </div>
    </aside>
    <section class="flex-1 p-6">
      <div
        v-if="selectedFile"
        class="bg-card/80 rounded-lg p-6 text-light font-mono min-h-[300px]"
      >
        <pre><code>{{ selectedFile.content }}</code></pre>
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
import { ref } from "vue";
import IconByName from "../atoms/IconByName.vue";

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
 * University
 * Systems Engineering Student
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

const selectedFile = ref(null);

function toggleFolder(key) {
  folders.value = folders.value.map((f) => (f.key === key ? { ...f, open: !f.open } : f));
}
function selectFile(file) {
  selectedFile.value = file;
}
</script>
