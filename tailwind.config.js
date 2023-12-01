/** @type {import('tailwindcss').Config} */

// import formsPlugin from "@tailwindcss/forms";

export default {
  
  darkMode: "class",
  content: [
    "./index.html",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        74:"19rem",
        128: "32rem",
      },
      boxShadow: {
        'list': '0 4px 8px 0px rgba(0, 0, 0, 0.5)',
      },
      backgroundColor: {
        fareCard: "#f9f9f9"
      }
    },
  },
  plugins: [],
};
