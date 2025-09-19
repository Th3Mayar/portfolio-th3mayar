import { theme } from "./src/styles/theme.ts";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        FiraCode: ["Fira Code", "cursive"],
      },
      colors: {
        bg: "hsl(var(--bg))",
        purple: "hsl(var(--purple))",
        limongrass: "hsl(var(--limongrass))",
        green: "hsl(var(--green))",
        pink: "hsl(var(--pink))",
        orange: "hsl(var(--orange))",
        button: "hsl(var(--button))",

        background: theme.background,
        "background-foreground": theme.backgroundForeground,
        dark: theme.dark,
        "dark-foreground": theme.darkForeground,
        "dark-background": theme.darkBackground,
        purple: theme.purple,
        limongrass: theme.limongrass,
        green: theme.green,
        pink: theme.pink,
        orange: theme.orange,
        button: theme.button,
        "orange-hover": theme.orangeHover,
        "light-hover": theme.lightHover,
        light: theme.light,
        "light-foreground": theme.lightForeground,
        card: theme.card,
        "card-foreground": theme.cardForeground,
        popover: theme.popover,
        "popover-foreground": theme.popoverForeground,
        primary: theme.primary,
        "primary-foreground": theme.primaryForeground,
        secondary: theme.secondary,
        "secondary-foreground": theme.secondaryForeground,
        muted: theme.muted,
        "muted-foreground": theme.mutedForeground,
        accent: theme.accent,
        "accent-foreground": theme.accentForeground,
        destructive: theme.destructive,
        "destructive-foreground": theme.destructiveForeground,
        border: theme.border,
        input: theme.input,
        ring: theme.ring,
        "border-navbar": theme.borderNavbar,
        "navbar-button": theme.navbarButton,
        "hover-button": theme.hoverButton,
        "border-effect": theme.borderEffect,
      },
      backgroundImage: {
        "linear-gradient": theme.linearGradient,
      },
      dark: {
        DEFAULT: "hsl(var( --dark))",
        foreground: "hsl(var(--dark-foreground))",
      },
      light: {
        DEFAULT: "hsl(var(--light))",
        foreground: "hsl(var(--light-foreground))",
      },
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      spin: "spin 0.5s linear infinite",
      "spin-fast": "spin 0.5s linear infinite",
    },
  },
};
