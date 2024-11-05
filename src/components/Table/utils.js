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
    grass: "bg-types-grass/15 text-types-grass",
    fire: "bg-types-fire/15 text-types-fire",
    water: "bg-types-water/15 text-types-water",
    bug: "bg-types-bug/15 text-types-bug",
    normal: "bg-types-normal/15 text-types-normal",
    poison: "bg-types-poison/15 text-types-poison",
    electric: "bg-types-electric/15 text-types-electric",
    ground: "bg-types-ground/15 text-types-ground",
    fairy: "bg-types-fairy/15 text-types-fairy",
  };

  const colorCatched = colors.hasOwnProperty(type) ? colors[type] : type.normal;

  return colorCatched;
};

// * Devuelve informacion obtenida de la PokeAPI.
const getPokemons = async (isLoading, setData) => {
  isLoading.value = true;
  try {
    const {
      data: { next, results },
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

    setData.value.results = await Promise.all(promises);
    setData.value.next = next;
    isLoading.value = false;
  } catch (error) {
    alert("Ha ocurrido un error");
  }
};

// * Devuelve más informacion obtenida de la PokeAPI.
const getMorePokemons = async (isLoading, setData) => {
  isLoading.value = true;
  try {
    const {
      data: { next, results },
    } = await axios.get(setData.value.next);

    const promises = await results.map(async ({ url }) => {
      const { data } = await axios.get(url);

      return {
        id: data.id,
        name: upperFirstLetter(data.name),
        type: data.types[0].type.name,
        sprite: data.sprites.front_default,
      };
    });

    setData.value.results = [
      ...setData.value.results,
      ...(await Promise.all(promises)),
    ];
    setData.value.next = next;
    isLoading.value = false;
  } catch (error) {
    alert("Ha ocurrido un error");
  }
};
export {
  getPokemons,
  getMorePokemons,
  upperFirstLetter,
  colorsDistionary,
  typesDictionary,
};
