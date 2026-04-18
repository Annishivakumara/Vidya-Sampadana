/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f5f3ff', // violet-50
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#5b21b6', // violet-900
        },
        accent: {
          light: '#ecfeff', // cyan-50
          DEFAULT: '#06b6d4', // cyan-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
