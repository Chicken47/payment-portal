/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
    'slow-spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
  // Configure animation duration
  animation: {
    'slow-spin': 'slow-spin 3s linear infinite', // 5s is the duration of the animation
  },
    },
  },
  plugins: [],
}

