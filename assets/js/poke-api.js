const pokeApi = {}

function convertPokemonDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    pokemon.ability = pokeDetail.abilities

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const [hp, attack, defense, spAtk, spDef, speed] = stats
    pokemon.hp = hp
    pokemon.attack = attack
    pokemon.defense = defense
    pokemon.spAtk = spAtk
    pokemon.spDef = spDef
    pokemon.speed= speed
    pokemon.total = hp+attack+defense+spAtk+spDef+speed

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
    }

pokeApi.getDetailById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => convertPokemonDetail(pokemon))
}