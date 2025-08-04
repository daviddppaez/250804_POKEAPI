const inputPokemon = document.getElementById('pokemon-input');  
const imgPokemon = document.getElementById('pokemon-imagen');  
const nombrePokemon = document.getElementById('pokemon-nombre');  
const mensajeError = document.getElementById('mensaje-error');  
const botonBuscar = document.getElementById('buscar-btn');  
const botonGuardar = document.getElementById('guardar-btn');  
  
botonBuscar.addEventListener('click', buscarPokemon); 
botonGuardar.addEventListener('click', guardarPokemon);
let pokemonActual = null;   
  

function buscarPokemon() {  
  const nombre = inputPokemon.value.toLowerCase(); // Convertimos a minúsculas para evitar problemas  
  mensajeError.textContent = ''; // Limpiamos el mensaje de error anterior  
  imgPokemon.src = ''; // Limpiamos la imagen anterior  
  nombrePokemon.textContent = '';  
  pokemonActual = null;  
  
  if (nombre === '') {  
    mensajeError.textContent = 'Por favor, introduce un nombre de Pokémon.';  
    return;  
  }  
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)  
    .then(response => {  
      if (!response.ok) {  
        throw new Error(`Pokémon no encontrado (Código: ${response.status})`);  
      }  
      return response.json();  
    })  
    .then(data => {  
      imgPokemon.src = data.sprites.front_default; // Imagen frontal por defecto  
      nombrePokemon.textContent = data.name.toUpperCase(); // Mostramos el nombre en mayúsculas  
        pokemonActual = { // Guardamos la información del pokemon  
        nombre: data.name,  
        imagen: data.sprites.front_default  
      };  

    })  
    .catch(error => {  
      mensajeError.textContent = error.message;  
    });  
}

function guardarPokemon() {  
  if (!pokemonActual) {  
    console.warn('No hay Pokémon para guardar.');  
    return;  
  }  
  
  let pokemonsGuardados = JSON.parse(localStorage.getItem('pokemonsGuardados')) || []; // Obtenemos la lista actual o creamos una nueva  
  pokemonsGuardados.push(pokemonActual); // Agregamos el nuevo pokemon  
  localStorage.setItem('pokemonsGuardados', JSON.stringify(pokemonsGuardados)); // Guardamos la lista actualizada  
  console.log('Pokémon guardado:', pokemonActual.nombre);  
}


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
    divPokemon.classList.add('pokemon'); // Agregamos una clase para estilos (opcional)  
  
    const imgPokemon = document.createElement('img');  
    imgPokemon.src = pokemon.imagen;  
    imgPokemon.alt = pokemon.nombre;  
  
    const nombrePokemon = document.createElement('h3');  
    nombrePokemon.textContent = pokemon.nombre.toUpperCase();  
  
    divPokemon.appendChild(imgPokemon);  
    divPokemon.appendChild(nombrePokemon);  
    listaPokemons.appendChild(divPokemon);  
  });  
}  

mostrarPokemonsGuardados();