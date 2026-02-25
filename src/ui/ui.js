const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const showPokemon = (pokemon) => {
  const imgElement = document.getElementById("pokemon-img");
  imgElement.src = pokemon.sprite;
  imgElement.alt = pokemon.name;

  document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
  document.getElementById("pokemon-id").textContent = `#${String(pokemon.id).padStart(3, "0")}`;

  const typesDiv = document.getElementById("pokemon-types");
  typesDiv.innerHTML = "";

  pokemon.types.forEach((type) => {
    const span = document.createElement("span");
    span.classList.add("type", type);
    span.textContent = capitalize(type);
    typesDiv.appendChild(span);
  });

  imgElement.onclick = () => showModal(pokemon);
};

export const showModal = (pokemon) => {
  const modal = document.getElementById("pokemon-modal");

  document.getElementById("modal-name").textContent = capitalize(pokemon.name);
  document.getElementById("modal-img").src = pokemon.sprite;
  document.getElementById("modal-id").textContent = `#${String(pokemon.id).padStart(3, "0")}`;

  document.getElementById("modal-height").textContent = `${(pokemon.height / 10).toFixed(1)} m`;
  document.getElementById("modal-weight").textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;

  const modalTypesDiv = document.getElementById("modal-types");
  modalTypesDiv.innerHTML = "";
  pokemon.types.forEach((type) => {
    const span = document.createElement("span");
    span.classList.add("type", type);
    span.textContent = capitalize(type);
    modalTypesDiv.appendChild(span);
  });

  const abilitiesDiv = document.getElementById("modal-abilities");
  abilitiesDiv.innerHTML = "";
  pokemon.abilities.forEach((ability) => {
    const span = document.createElement("span");
    span.classList.add("ability-badge");
    span.textContent = capitalize(ability.replace("-", " "));
    abilitiesDiv.appendChild(span);
  });

  const statsDiv = document.getElementById("modal-stats");
  statsDiv.innerHTML = "";

  pokemon.stats.forEach((stat) => {
    const row = document.createElement("div");
    row.classList.add("stat-row");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("stat-name");
    nameSpan.textContent = formatStatName(stat.name);

    const barContainer = document.createElement("div");
    barContainer.classList.add("stat-bar-container");

    const bar = document.createElement("div");
    bar.classList.add("stat-bar");
    const percentage = Math.min((stat.base / 255) * 100, 100);

    const valueSpan = document.createElement("span");
    valueSpan.classList.add("stat-value");
    valueSpan.textContent = stat.base;

    barContainer.appendChild(bar);
    row.appendChild(nameSpan);
    row.appendChild(barContainer);
    row.appendChild(valueSpan);
    statsDiv.appendChild(row);

    setTimeout(() => {
      bar.style.width = `${percentage}%`;
    }, 100);
  });

  modal.classList.remove("hidden");
};

const formatStatName = (name) => {
  const names = {
    "hp": "HP",
    "attack": "Ataque",
    "defense": "Defensa",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    "speed": "Velocidad",
  };
  return names[name] || capitalize(name);
};

export const initModalClose = () => {
  const modal = document.getElementById("pokemon-modal");
  const closeBtn = document.getElementById("close-modal");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
};