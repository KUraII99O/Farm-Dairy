// eslint-disable-next-line @typescript-eslint/no-var-requires
import { content as _content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export const content = [
  // Include Flowbite content configuration
  _content(),
  // Add other content paths as needed
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    // Extend Tailwind CSS theme with Flowbite styles if needed
    colors: {
      primary: '#309975',
      secondary: '#58b368',
      // Add other custom colors here if needed
    },
  },
};
export const plugins = [
  // Include Flowbite plugins
  plugin(),
];
