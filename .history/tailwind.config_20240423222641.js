// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const tailwind = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
};
