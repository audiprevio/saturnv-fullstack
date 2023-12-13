const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'thin-gray': '#eeeeee',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #A2D9FF1A 1px, transparent 1px), linear-gradient(to bottom, #BCE4FF1A 1px, transparent 1px)',
        'grid-pattern-white': 'linear-gradient(to right, #eeeeee1a 1px, transparent 1px), linear-gradient(to bottom, #eeeeee1a 1px, transparent 1px)',
      },
      backgroundSize: {
        '24px': '96px 96px',
      },
    },
  },
  plugins: [],
});