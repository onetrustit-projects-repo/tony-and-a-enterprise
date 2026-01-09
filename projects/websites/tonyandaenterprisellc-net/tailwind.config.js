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
          primary: '#6B46C1', // Purple-600
          secondary: '#9F7AEA', // Purple-400
          dark: '#553C9A', // Purple-800
          light: '#E9D8FD', // Purple-100
        },
        security: {
          dark: '#1A202C', // Gray-900
          accent: '#2D3748', // Gray-800
          metal: '#718096', // Gray-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
