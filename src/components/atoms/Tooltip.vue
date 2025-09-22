<template>
    <div class="relative inline-flex">
        <span ref="triggerRef" class="tooltip-trigger outline-none" tabindex="0" @mouseenter="showTooltip"
            @mouseleave="hideTooltip" @focus="showTooltip" @blur="hideTooltip" @click="toggleTooltip"
            @keydown.enter.prevent="toggleTooltip" @keydown.space.prevent="toggleTooltip">
            <slot />
        </span>
        <teleport to="body">
            <transition name="fade">
                <div v-if="show && text"
                    class="pointer-events-none select-none fixed z-[9999] flex flex-col items-center"
                    :style="tooltipStyle">
                    <div class="bg-background text-light px-3 py-2 rounded-lg shadow-lg border border-border text-xs font-mono max-w-[320px] break-words animate-in fade-in-0 zoom-in-95"
                        style="overflow: visible; white-space: pre-line;">
                        {{ text }}
                    </div>
                    <div class="w-2 h-2 bg-background border-l border-t border-border rotate-45 -mt-1"></div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref,
    onMounted,
    onBeforeUnmount, nextTick
} from "vue";

export default defineComponent({
    name: "Tooltip",
    props: {
        text: {
            type: String,
            required: true,
            default: "",
        },
    },
    setup() {
        const show = ref(false);
        const triggerRef = ref(null);
        const tooltipStyle = ref('');

        const updatePosition = () => {
            if (!triggerRef.value) return;
            const rect = triggerRef.value.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;
            const top = rect.top + scrollY;
            const left = rect.left + scrollX + rect.width / 2;
            tooltipStyle.value = `top:${top - 12}px;left:${left}px;transform:translate(-50%,-100%);min-width:max-content;max-width:90vw;overflow:visible;`;
        };

        const showTooltip = () => {
            show.value = true;
            nextTick(updatePosition);
        };

        const hideTooltip = () => {
            show.value = false;
        };

        const toggleTooltip = () => {
            show.value = !show.value;
            if (show.value) nextTick(updatePosition);
        };

        onMounted(() => {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        });

        return {
            show,
            triggerRef,
            tooltipStyle,
            showTooltip,
            hideTooltip,
            toggleTooltip
        };
    },
});
</script>

<style scoped>
.tooltip-trigger:focus {
    outline: 2px solid var(--orange, #ff9800);
    outline-offset: 2px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>