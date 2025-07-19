/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4F46E5', // Deep Indigo
        'brand-accent': '#EC4899', // Vibrant Pink
        'brand-secondary': '#38BDF8', // Soft Sky Blue
        'brand-bg': '#F9FAFB', // Off-White
        'brand-surface': '#FFFFFF', // White
        'brand-text': '#1E293B', // Charcoal
        'brand-success': '#10B981', // Emerald
        'brand-border': '#E5E7EB', // Light Gray
      }
    }
  },
  plugins: [],
}

