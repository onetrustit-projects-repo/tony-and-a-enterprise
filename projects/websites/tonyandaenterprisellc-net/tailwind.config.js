/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A8A', // Navy Blue
          secondary: '#3B82F6', // Blue-500
          dark: '#172554', // Darker Navy
          light: '#DBEAFE', // Blue-100
        },
        security: {
          dark: '#1F2937', // Gray-800
          accent: '#4B5563', // Gray-600
          metal: '#9CA3AF', // Gray-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
