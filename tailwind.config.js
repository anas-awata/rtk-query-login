/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary: "#f7941e",
        "primary-100": "#fce5cc", // Lighter shade
        "primary-200": "#f9d6a7", // Light shade
        "primary-300": "#f6c883", // Lightest shade
        "primary-400": "#f28d33", // Dark shade
        "primary-500": "#f7941e", // Base color
        "primary-600": "#e88000", // Darker shade
        "primary-700": "#cc7200", // Darkest shade
      },
      custom: {
        default: "#01181b", // Default text color
      },
    },
  },
  plugins: [],
};
