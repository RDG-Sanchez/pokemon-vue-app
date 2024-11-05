import axios from "axios";

// * Formatea el nombre de un Pokemon.
const capitalizeString = (word) => {
  const wordSplit = word.split("");
  wordSplit[0] = wordSplit[0].toUpperCase();

  return wordSplit.join("");
};

// * Devuelve un tipo formateado y en español.
const getSpanishType = (type) => {
  const types = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
  };

  const typeTranslated = types.hasOwnProperty(type) ? types[type] : type;

  return typeTranslated;
};

// * Devuelve un estilo en base a un tipo.
const getTailwindClass = (type) => {
  const colors = {
    normal: "bg-types-normal/15 text-types-normal",
    fire: "bg-types-fire/15 text-types-fire",
    water: "bg-types-water/15 text-types-water",
    electric: "bg-types-electric/15 text-types-electric",
    grass: "bg-types-grass/15 text-types-grass",
    ice: "bg-types-ice/15 text-types-ice",
    fighting: "bg-types-fighting/15 text-types-fighting",
    poison: "bg-types-poison/15 text-types-poison",
    ground: "bg-types-ground/15 text-types-ground",
    flying: "bg-types-flying/15 text-types-flying",
    psychic: "bg-types-psychic/15 text-types-psychic",
    bug: "bg-types-bug/15 text-types-bug",
    rock: "bg-types-rock/15 text-types-rock",
    ghost: "bg-types-ghost/15 text-types-ghost",
    dragon: "bg-types-dragon/15 text-types-dragon",
    dark: "bg-types-dark/15 text-types-dark",
    steel: "bg-types-steel/15 text-types-steel",
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

      const [hp, attack, defense, speed] = data.stats.filter(
        (item) =>
          item.stat.name === "hp" ||
          item.stat.name === "attack" ||
          item.stat.name === "defense" ||
          item.stat.name === "speed"
      );

      return {
        id: data.id,
        name: capitalizeString(data.name),
        type: {
          class: getTailwindClass(data.types[0].type.name),
          name: getSpanishType(data.types[0].type.name),
        },
        sprite: data.sprites.front_default,
        stats: {
          hp: hp.base_stat,
          attack: attack.base_stat,
          defense: defense.base_stat,
          speed: speed.base_stat,
        },
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

      const [hp, attack, defense, speed] = data.stats.filter(
        (item) =>
          item.stat.name === "hp" ||
          item.stat.name === "attack" ||
          item.stat.name === "defense" ||
          item.stat.name === "speed"
      );

      return {
        id: data.id,
        name: capitalizeString(data.name),
        type: {
          class: getTailwindClass(data.types[0].type.name),
          name: getSpanishType(data.types[0].type.name),
        },
        sprite: data.sprites.front_default,
        stats: {
          hp: hp.base_stat,
          attack: attack.base_stat,
          defense: defense.base_stat,
          speed: speed.base_stat,
        },
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

export { getPokemons, getMorePokemons };
