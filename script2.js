
const listaPokemons = document.getElementById('lista-pokemons');  
  
function mostrarPokemonsGuardados() {  
  const pokemonsGuardados = JSON.parse(localStorage.getItem('pokemonsGuardados')) || [];  
  
  if (pokemonsGuardados.length === 0) {  
    listaPokemons.textContent = 'No hay Pokémon guardados.';  
    return;  
  }  
  
  listaPokemons.innerHTML = ''; // Limpiamos la lista anterior  
  
  pokemonsGuardados.forEach(pokemon => {  
    
    const divPokemon = document.createElement('div');  
    divPokemon.classList.add('card');
    divPokemon.classList.add('col');
    divPokemon.style.width = "100px"
    const imgPokemon = document.createElement('img');  
    imgPokemon.src = pokemon.imagen;  
    imgPokemon.alt = pokemon.nombre; 
    imgPokemon.classList.add('card-img-top');
    imgPokemon.style.width = "96px";
    const nombrePokemon = document.createElement('h3');  
    nombrePokemon.style.fontSize = "14px"
    nombrePokemon.textContent = pokemon.nombre.toUpperCase();  
  
    divPokemon.appendChild(imgPokemon);  
    divPokemon.appendChild(nombrePokemon);  
    listaPokemons.appendChild(divPokemon);  
  });  
}  

mostrarPokemonsGuardados();