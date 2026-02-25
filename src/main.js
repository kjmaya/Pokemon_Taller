import { fetchPokemon } from "./services/api.js";
import { showPokemon, initModalClose } from "./ui/ui.js";

let current = 25;

const MIN_ID = 1;
const MAX_ID = 1025;
let isLoading = false;

const loadPokemon = async (id) => {
  if (isLoading) return;
  isLoading = true;

  const card = document.getElementById("pokemon-card");
  card.classList.add("loading");

  try {
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
  } catch (error) {
    console.error("No se pudo cargar el Pokémon:", error.message);
  } finally {
    card.classList.remove("loading");
    isLoading = false;
  }
};

document.getElementById("btn-next").addEventListener("click", () => {
  if (current < MAX_ID) {
    current++;
    loadPokemon(current);
  }
});

document.getElementById("btn-prev").addEventListener("click", () => {
  if (current > MIN_ID) {
    current--;
    loadPokemon(current);
  }
});

initModalClose();
loadPokemon(current);
