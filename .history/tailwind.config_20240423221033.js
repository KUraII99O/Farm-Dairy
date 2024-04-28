// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include Flowbite content configuration
    flowbite.content(),
    // Add other content paths as needed
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend Tailwind CSS theme with Flowbite styles if needed
      colors: {
        primary: '#309975',
        secondary: '#58b368',
        // Add other custom colors here if needed
      },
    },
  },
  plugins: [
    // Include Flowbite plugins
    flowbite.plugin(),
    // Add other Tailwind CSS plugins as needed
  ],
};
