// eslint-disable-next-line @typescript-eslint/no-var-requires
import { content as _content } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
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
