/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const flowbite = require("flowbite-react/tailwindcss");

/** @type {import('tailwindcss').Config} */
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
