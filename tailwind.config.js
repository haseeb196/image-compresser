/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      screens: {
      'sm': '0px',
      'md': '550px',
    },
  },
  },
  plugins: [],
}
