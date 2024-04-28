const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    // Your other content configurations...
    // Make sure to include the Flowbite React Tailwind content
    flowbite.content(),
  ],
  // Your other plugins...
  // Make sure to include the Flowbite React Tailwind plugin
  plugins: [
    // Your other plugins...
    flowbite.plugin(),
  ],
};
