/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#FF6B2B',
          light: '#FF8A57',
          dark: '#E55A1F',
        },
        navy: {
          primary: '#1B2B5E',
          light: '#243674',
          dark: '#111C3F',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
