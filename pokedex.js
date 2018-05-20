const {ipcRenderer} = require("electron")

let pokemonNameHeading = document.getElementById("pokemon-name")

ipcRenderer.on("pokemonSpeciesLoaded", (event,pokemon) => {

    pokemonNameHeading.textContent = pokemon.name
})
