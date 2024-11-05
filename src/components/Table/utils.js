import axios from "axios";

// * Formatea el nombre de un Pokemon.
const upperFirstLetter = (word) => {
  const wordSplit = word.split("");
  wordSplit[0] = wordSplit[0].toUpperCase();

  return wordSplit.join("");
};

// * Devuelve un tipo formateado y en español.
const typesDictionary = (type) => {
  const types = {
    grass: "Césped",
    fire: "Fuego",
    water: "Agua",
    bug: "Bicho",
    normal: "Normal",
    poison: "Veneno",
    electric: "Eléctrico",
    ground: "Suelo",
    fairy: "Hada",
  };

  const typeTranslated = types.hasOwnProperty(type) ? types[type] : type;

  return typeTranslated;
};

// * Devuelve un estilo en base a un tipo.
const colorsDistionary = (type) => {
  const colors = {
    grass:
      "background-color: rgba(34, 136, 72, 0.15) ; color: rgb(34, 136, 72);",
    fire: "background-color: rgba(194, 65, 12, 0.15) ; color: rgb(194, 65, 12);",
    water:
      "background-color: rgba(3, 105, 161, 0.15) ; color: rgb(3, 105, 161);",
    bug: "background-color: rgba(197, 183, 125, 0.15) ; color: rgb(197, 183, 125);",
    normal:
      "background-color: rgba(183, 183, 197, 0.15) ; color: rgb(183, 183, 197);",
    poison:
      "background-color: rgba(135, 146, 49, 0.15) ; color: rgb(135, 146, 49);",
    electric:
      "background-color: rgba(255, 212, 81, 0.15) ; color: rgb(255, 212, 81);",
    ground:
      "background-color: rgba(139, 110, 96, 0.15) ; color: rgb(139, 110, 96);",
    fairy:
      "background-color: rgba(241, 168, 241, 0.15) ; color: rgb(241, 168, 241);",
  };

  const colorCatched = colors.hasOwnProperty(type) ? colors[type] : type.normal;

  return colorCatched;
};

// * Devuelve informacion obtenida de la PokeAPI.
const getPokemons = async (isLoading, setData) => {
  isLoading.value = true;
  try {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");

    const promises = await results.map(async ({ url }) => {
      const { data } = await axios.get(url);
      return {
        id: data.id,
        name: upperFirstLetter(data.name),
        type: data.types[0].type.name,
        sprite: data.sprites.front_default,
      };
    });

    setData.value = await Promise.all(promises);
    isLoading.value = false;
  } catch (error) {
    alert("Ha ocurrido un error");
  }
};

export { getPokemons, upperFirstLetter, colorsDistionary, typesDictionary };
