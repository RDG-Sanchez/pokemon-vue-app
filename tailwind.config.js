export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        types: {
          normal: "#A8A77A",
          fire: "#F08030",
          water: "#6890F0",
          electric: "#F8D030",
          grass: "#78C850",
          ice: "#98D8D8",
          fighting: "#C03028",
          poison: "#A040A0",
          ground: "#E0C068",
          flying: "#A890F0",
          psychic: "#F85888",
          bug: "#A8B820",
          rock: "#B8A038",
          ghost: "#6A5ACD",
          dragon: "#7038F8",
          dark: "#705848",
          steel: "#B8B8D0",
          fairy: "#EE99AC",
        },
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
