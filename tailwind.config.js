/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      boxShadow: {
        "shadow-normal": "0 0.25rem 0.5rem rgba(0, 0, 0, 0.125)",
        "shadow-focus": "0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)",
      },
      colors: {
        accent: "#ff385c",
        "accent-shade": "#b32740",
        bg: "#f8f8f8",
        "banner-gray": "#e3e3e3",
        "line-gray": "#cecece",
        icon: "#373737",
        black: "#222222",
      },
    },
  },
  plugins: [],
};
