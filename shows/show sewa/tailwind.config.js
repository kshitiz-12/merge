/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-maroon': '#861313',
        'brand-gold': '#FFD700',
        'brand-cream': '#FFF8F0',
        'brand-surface': '#FFFFFF',
        'brand-dark': '#222222',
        'brand-blush': '#F5D7DB',
        'brand-border': '#E5E7EB',
      }
    }
  },
  plugins: [],
}

