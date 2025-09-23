import { computed, ref } from "vue";

export const useSelect = (props, emit) => {
    const dropdownId = `select-dropdown-${Math.random().toString(36).slice(2, 8)}`;
    const open = ref(false);

    const selectedLabel = computed(() => {
        const found = props.options.find(opt => opt.value === props.modelValue);
        return found ? found.label : '';
    });

    function toggleDropdown() {
        open.value = !open.value;
    }

    function closeDropdown() {
        open.value = false;
    }

    function handleChange(val: string | number) {
        emit('update:modelValue', val);
        emit('change', val);

        closeDropdown();

        if (typeof window !== 'undefined' && (val === 'en' || val === 'es')) {
            const path = window.location.pathname;

            let newPath = path.replace(/^\/(en|es)/, '/' + val);

            if (path === '/' || path === '/en' || path === '/es') {
                newPath = `/${val}/`;
            }

            if (newPath !== path) {
                window.location.pathname = newPath;
            }
        }
    }
    return {
        open,
        dropdownId,
        selectedLabel,
        toggleDropdown,
        closeDropdown,
        handleChange
    };
}