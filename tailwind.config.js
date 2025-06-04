/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        montserrat: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
