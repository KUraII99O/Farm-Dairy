import flowbite from "flowbite/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ...flowbite.content(),
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
    ...flowbite.plugins(),
  ],
};
