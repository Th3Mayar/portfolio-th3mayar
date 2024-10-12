<template>
  <button :class="buttonClasses" :disabled="disabled" :id="id" :className="className" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const buttonVariants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "text-light border-2 hover:border-dark",
    secondary: "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground text-light",
    link: "text-primary underline-offset-4 hover:underline",
    light:
      "rounded-none border-2 border-primary bg-light text-light-foreground hover:bg-light/70",
    dark: "bg-dark text-dark-foreground hover:bg-dark/90",
    orange: "bg-orange text-limongrass-foreground hover:bg-orange/90",
    simple: "text-light bg-button hover:bg-button-hover hover:text-orange",
    none: "bg-transparent border-none p-0",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "size-10",
  },
};

const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: Function,
  id: String,
  className: String,
});

const buttonClasses = computed(() => {
  const variantClass = buttonVariants.variant[props.variant] || buttonVariants.variant.default;
  const sizeClass = buttonVariants.size[props.size] || buttonVariants.size.default;
  
  return [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variantClass,
    sizeClass,
  ];
});

const handleClick = (event) => {
  if (props.onClick) {
    props.onClick(event);
  }
};
</script>