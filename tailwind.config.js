/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sf-mono': ['sf-mono', 'sans-serif'],
        'gothic-a1': ['gothic-a1', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

