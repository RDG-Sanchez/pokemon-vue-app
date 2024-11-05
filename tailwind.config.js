export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        types: {
          grass: "rgb(34, 136, 72)",
          fire: "rgb(194, 65, 12)",
          water: "rgb(3, 105, 161)",
          bug: "rgb(197, 183, 125)",
          normal: "rgb(183, 183, 197)",
          poison: "rgb(135, 146, 49)",
          electric: "rgb(255, 212, 81)",
          ground: "rgb(139, 110, 96)",
          fairy: "rrgb(241, 168, 241)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
