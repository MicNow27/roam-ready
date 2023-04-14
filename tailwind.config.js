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
        "shadow-on-blur": "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
      },
      colors: {
        accent: "#ff385c",
        "accent-shade": "#b32740",
        bg: "#f8f8f8",
        "bg-shade": "#e5e5e5",
        "banner-gray": "#e3e3e3",
        "line-gray": "#cecece",
        "line-gray-shade": "#a5a5a5",
        "text-gray": "#878787",
        icon: "#373737",
        black: "#222222",
        "bg-blur": "rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
