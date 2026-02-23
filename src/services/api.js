import Pokemon from "../models/Pokemon.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export const fetchPokemon = async (id) => {
  try {
    const res = await fetch(API_URL + id);

    if (!res.ok) {
      throw new Error(`Error al obtener el Pokémon con ID ${id}`  
      );
    }
    
    const data = await res.json();

    const types = data.types.map((t) => t.type.name);
    const abilities = data.abilities.map((a) => a.ability.name);
    const stats = data.stats.map((s) => ({
      name: s.stat.name,
      base: s.base_stat,
    }));
    const sprite = data.sprites.other["official-artwork"].front_default;

    return new Pokemon(
      data.id,
      data.name,
      types,
      sprite,
      data.height,
      data.weight,
      abilities,
      stats
    );
  } catch (error) {
    console.error("Error en fetchPokemon:", error.message);
    throw error;
  }
};