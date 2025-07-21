/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8B0000', // Deep Red/Maroon from logo
        'brand-secondary': '#FFFFFF', // White from logo
        'brand-bg': '#F8F9FA', // Light gray background
        'brand-surface': '#FFFFFF', // White surface
        'brand-text': '#1A1A1A', // Dark text for readability
        'brand-border': '#E5E7EB', // Light border
      }
    }
  },
  plugins: [],
}

