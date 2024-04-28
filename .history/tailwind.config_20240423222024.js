import { content as _content } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  _content(),
];
export const theme = {
  extend: {
    colors: {
      primary: '#309975',
      secondary: '#58b368',
    },
  },
};
export const plugins = [
  _content(),
];
