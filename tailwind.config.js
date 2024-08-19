const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  // Your other plugins...
  // Make sure to include the Flowbite React Tailwind plugin
  plugins: [
    // Your other plugins...
    flowbite.plugin(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#309975',
        secondary: '#58b368',
      },
    },
  },
};
