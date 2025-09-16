<template>
  <component :is="Tag" :class="classes" tabindex="0" v-bind="otherProps">
    <slot />
  </component>
</template>

<script>
import { computed } from "vue";

const variantClasses = {
  FiraCode: "font-FiraCode",
  default: "",
};

const colorClasses = {
  light: "text-light",
  dark: "text-dark",
  purple: "text-purple", 
  limongrass: "text-limongrass", 
  green: "text-green", 
  orange: "text-orange", 
  pink: "text-pink", 
  primary: "text-primary",
  secondary: "text-secondary",
  neutral: "text-neutral-300",
};

const tagClasses = {
  h1: "text-3xl lg:text-6xl",
  h2: "text-3xl lg:text-4xl",
  h3: "text-2xl lg:text-3xl",
  h4: "text-xl lg:text-2xl",
  h5: "text-lg lg:text-xl",
  p: "text-base",
};

const caseType = {
  upper: "uppercase",
  lower: "lowercase",
  capital: "text-capitalize",
  normal: "normal",
};

export default {
  name: "TextComponent",
  props: {
    as: {
      type: String,
      default: "p",
    },
    variant: {
      type: String,
      default: "normal",
    },
    color: {
      type: String,
      default: "dark",
    },
    className: {
      type: String,
      default: "",
    },
    caseType: {
      type: String,
      default: "normal",
    },
  },
  setup(props) {
    const classes = computed(() => {
      return [
        variantClasses[props.variant] || variantClasses.default,
        colorClasses[props.color] || colorClasses.dark,
        tagClasses[props.as] || tagClasses.p,
        caseType[props.caseType],
        props.className,
      ].join(" ");
    });

    return {
      Tag: props.as,
      classes,
      caseType: props.caseType,
      otherProps: {
        ...props,
        as: undefined,
        variant: undefined,
        color: undefined,
        className: undefined, 
        caseType: undefined,
      },
    };
  },
};
</script>