
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'slim': '375px',
      },
      colors:{
        button:{
          'hover': '#e62e00',
          'disabled': '#ccc',
          'default': '#90caf9',
          'primary': '#f63e02',
        },
        modals:{
          'primary': '#302F3C',
        },
        principais: {
          'primary': '#f63e02',
          'secondary': '#FAFAFA'
        }
      }
    },
  },
  plugins: [],
})
