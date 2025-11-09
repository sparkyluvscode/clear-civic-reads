import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
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
        trust: {
          blue: "hsl(var(--trust-blue))",
          "blue-light": "hsl(var(--trust-blue-light))",
        },
        civic: {
          teal: "hsl(var(--civic-teal))",
          "teal-light": "hsl(var(--civic-teal-light))",
        },
        silver: {
          DEFAULT: "hsl(var(--silver))",
          light: "hsl(var(--silver-light))",
          dark: "hsl(var(--silver-dark))",
        },
        "glass-silver": "hsl(var(--glass-silver))",
        "ice-blue": {
          DEFAULT: "hsl(var(--ice-blue))",
          light: "hsl(var(--ice-blue-light))",
        },
        "deep-blue": "hsl(var(--deep-blue))",
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          700: "hsl(var(--neutral-700))",
          900: "hsl(var(--neutral-900))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        card: "var(--shadow-card)",
        glass: "var(--shadow-glass)",
        "glass-hover": "var(--shadow-glass-hover)",
        "glass-strong": "var(--shadow-glass-strong)",
        "glow-blue": "var(--shadow-glow-blue)",
        "glow-teal": "var(--shadow-glow-teal)",
        "glow-silver": "var(--shadow-glow-silver)",
        "glow-ice": "var(--shadow-glow-ice)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-glass": "var(--gradient-glass)",
        "gradient-glass-strong": "var(--gradient-glass-strong)",
        "gradient-shimmer": "var(--gradient-shimmer)",
        "gradient-glow": "var(--gradient-glow)",
        "gradient-orb-blue": "var(--gradient-orb-blue)",
        "gradient-orb-teal": "var(--gradient-orb-teal)",
        "gradient-orb-silver": "var(--gradient-orb-silver)",
        "gradient-orb-ice": "var(--gradient-orb-ice)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "28px",
        "glass-strong": "32px",
      },
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "shimmer": {
          "0%, 100%": { transform: "translateX(-100%) skewX(-15deg)" },
          "50%": { transform: "translateX(250%) skewX(-15deg)" },
        },
        "droplet-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.15" },
          "25%": { transform: "translate(10px, -15px) scale(1.05)", opacity: "0.25" },
          "50%": { transform: "translate(-8px, -25px) scale(0.95)", opacity: "0.2" },
          "75%": { transform: "translate(15px, -10px) scale(1.02)", opacity: "0.18" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-15px, -20px) scale(1.08)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 35px hsl(var(--primary) / 0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in": "fade-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "scale-in": "scale-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 4s ease-in-out infinite",
        "droplet-float": "droplet-float 20s ease-in-out infinite",
        "orb-float": "orb-float 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
