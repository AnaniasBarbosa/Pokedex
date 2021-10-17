//FUNÇÃO QUE RECEBE ID COMO ARGUMENTO E LÊ A API POKEMON 
const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
//Cria um Array de 150 índices e retorna uma JSON para cada pokemon.
const generatePokePromi = () => Array(150).fill().map((_, index) =>
    fetch(pokemonUrl(index + 1)).then(response => response.json()))
//Cria os elementos HTML 
const fechPokemon = () => {
    //array de promisses
    const pokProm = generatePokePromi();
    
    function acumulator(total, obj) {
        const types = obj.types.map(typeInfo => typeInfo.type.name);
        total += `
            <li class="card ${types[0]}">
            <img class="card-image }" src="https://cdn.traction.one/pokedex/pokemon/${obj.id}.png">
            <h2 class="card-title">${obj.id}. ${obj.name}</h2>
            <p class="card-subtitle">${types.join(" | ")}</p>
            </li>`
        return total;
    }
    //Retorna uma array de promisses e com innerHTML acrescenta o elemento LI na lista
    Promise.all(pokProm)
        .then(pokemon => {
            const listPokemon = pokemon.reduce(acumulator, "");
            const ul = document.getElementById('pok');
            ul.innerHTML = listPokemon;
        }
    )
}
fechPokemon();