/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // this ensures Tailwind CSS purges unused styles
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-s'], // Define Poppins font
      },
    },
  },
  plugins: [],
}

