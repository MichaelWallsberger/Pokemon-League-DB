const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const brandColor = "#f3c3c3";

module.exports = {
  // Enable JIT for a faster development experience:
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  // Add support for dark mode, toggled via a class:
  // https://tailwindcss.com/docs/dark-mode
  darkMode: "class",
  // Inform Tailwind of where our classes will be defined:
  // https://tailwindcss.com/docs/optimizing-for-production
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // NOTE: We modify the gray color, as the default Tailwind gray color is heavily saturated
        // with blue, which makes it look strange in dark mode. This gray color is more balanced,
        // and works better for sites supporting dark mode.
        gray: colors.gray,
        // Add a new "brand" color to all Tailwind utilities, so that we can easily change it.
        brand: brandColor,
      },
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
  },
  variants: {
    extend: {
      width: ["hover"],
    },
  },
  plugins: [],
};
