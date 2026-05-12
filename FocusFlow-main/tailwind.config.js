/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#E6F1FB',
          100: '#B5D4F4',
          500: '#185FA5',
          700: '#0C447C',
          900: '#042C53',
        },
      },
    },
  },
  plugins: [],
}
