/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          850: '#1f2023',
          900: '#18181b',
          950: '#0a0a0a',
        },
        brand: {
          DEFAULT: '#ff4500', // Vibrant Orange/Red
          accent: '#f97316'
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
