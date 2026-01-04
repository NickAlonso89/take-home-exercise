/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#c38b4f",
          dark: "#121212",
          "dark-lighter": "#1c1c1c", // Form container
          "dark-section": "#1e1c19", // Section backgrounds
          "dark-card": "#211f1c", // Card backgrounds
          "dark-disclaimer": "#23211d", // Disclaimer background
          surface: "#2c2a27", // Form fields, inputs
          border: "#3e3c39", // Borders
          gray: "#898275", // Text gray, labels
          light: "#f3f1eb", // Button background
          "light-icon": "#dcdad5", // Button icon background
        },
      },
      keyframes: {
        slideInFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        checkmarkDraw: {
          "0%": { opacity: "0", transform: "scale(0) rotate(45deg)" },
          "50%": { opacity: "1", transform: "scale(1.2) rotate(45deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(45deg)" },
        },
        borderGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(195, 139, 79, 0)" },
          "50%": { boxShadow: "0 0 0 3px rgba(195, 139, 79, 0.2)" },
          "100%": { boxShadow: "0 0 0 0 rgba(195, 139, 79, 0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        buttonPress: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        checkboxRipple: {
          "0%": { width: "0", height: "0", opacity: "1" },
          "100%": { width: "40px", height: "40px", opacity: "0" },
        },
        checkboxBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
      },
      animation: {
        "slide-in-left": "slideInFromLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInFromRight 0.8s ease-out forwards",
        "error-slide": "slideDown 0.3s ease-out forwards",
        "error-shake": "shake 0.4s ease-out forwards",
        "checkmark-draw": "checkmarkDraw 0.2s ease-in forwards",
        "border-glow": "borderGlow 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "button-press": "buttonPress 0.2s ease-out",
        "checkbox-ripple": "checkboxRipple 0.4s ease-out",
        "checkbox-bounce": "checkboxBounce 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
