
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",

  flowbite.content(),


],
theme: {
  extend: {
    colors: {
      primary: '#309975',
      secondary: '#58b368',
    },
  },
},
  plugins: [

    flowbite.content(),

  ],
}

