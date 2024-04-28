
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // eslint-disable-next-line no-undef
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
