const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="redirect(${pokemon.id})"> 
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

function redirect(id) {
    window.location.href=`./detail.html?id=${id}`, "_blank"
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit
    
    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }
})