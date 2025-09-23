<template>
    <div class="relative w-full flex justify-end">
        <button type="button"
            class="select-trigger flex items-center justify-between gap-2 bg-background text-foreground border border-border rounded-md px-4 py-2 text-base font-normal shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:border-orangeHover min-h-[2.5rem] w-36"
            @click="toggleDropdown" :aria-expanded="open ? 'true' : 'false'" :aria-controls="dropdownId">
            <span class="truncate flex-1 text-left">{{ selectedLabel || placeholder }}</span>
            <IconByName name="ChevronDown" color="dark"
                class="ml-2 w-4 h-4 text-muted-foreground pointer-events-none transition-transform duration-200"
                :class="{ 'rotate-180': open }" />
        </button>
        <transition name="fade">
            <ul v-if="open" :id="dropdownId"
                class="absolute right-0 z-30 mt-14 min-w-[9rem] w-36 bg-background border rounded-md shadow-lg py-1 max-h-64 overflow-y-auto animate-fadeIn border-border"
                role="listbox" @keydown.esc="closeDropdown">
                <li v-for="option in options" :key="option.value" @click="handleChange(option.value)" role="option"
                    :aria-selected="option.value === modelValue" :class="[
                        'px-4 py-2 text-base cursor-pointer select-none transition-colors',
                        option.value === modelValue
                            ? 'bg-orangeHover/10 text-orangeHover font-semibold'
                            : 'hover:bg-orangeHover/10 hover:text-orangeHover'
                    ]">
                    {{ option.label }}
                </li>
            </ul>
        </transition>
    </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import IconByName from './IconByName.vue';
import { useSelect } from '@/composables/components';

const props = defineProps<{
    modelValue: string | number | null;
    options: { label: string; value: string | number }[];
    placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const {
    open,
    dropdownId,
    selectedLabel,
    toggleDropdown,
    closeDropdown,
    handleChange
} = useSelect(props, emit);

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('.select-trigger')) {
            open.value = false;
        }
    });
});

</script>
<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}

.border-border {
    border-color: hsl(210.97 34.07% 17.84%) !important;
}
</style>