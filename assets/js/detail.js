const content = document.getElementById('content')
const dataPokemon = document.getElementById('pokemon')
const aboutPokemon = document.getElementById('about')

function getId(){
    const getUrl = window.location.href
    const paramUrl = new URL(getUrl)
    const id = paramUrl.searchParams.get("id")
    return id
}

function detailPokemon(id) {
    pokeApi.getDetailById(id).then((detail) => {
        content.classList.add(`${detail.type}`)
        dataPokemon.innerHTML += `
        <header>
            <section class="pokemon">
                <span class="number">#${detail.id}</span>
                    <h1 class="name">${detail.name}</h1>
                        <ol class="types">
                            ${detail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            </section>
            <div class="img-pokemon">
                <a href="index.html">
                    <img src="${detail.photo}" alt="${detail.name}">
                </a>
            </div>
        </header>
        `

        aboutPokemon.innerHTML += `
        <main id="about">
            <section class="detail">
                <h2 class="subtitle">About</h2>
                    <dl class="about">
                        <dt class="text">height</dt>
                            <dd class="text">${detail.height/10}m</dd>
                            
                        <dt class="text">weight</dt>
                            <dd class="text">${detail.weight/10}kg</dd>
                    </dl>
                
                <h2 class="subtitle">Stats</h2>
                    <dl class="stats">
                        <dt class="stat">HP</dt>
                            <dd class="text">${detail.hp}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.hp}">${detail.hp}</progress>
                            </dd>
                
                        <dt class="stat">Attack</dt>
                            <dd class="text">${detail.attack}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.attack}">${detail.attack}</progress>
                            </dd>
                
                        <dt class="stat">Defense</dt>
                            <dd class="text">${detail.defense}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.defense}">${detail.defense}</progress>
                            </dd>
                        
                        <dt class="stat">Special-attack</dt>
                            <dd class="text">${detail.spAtk}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.spAtk}">${detail.spAtk}</progress>
                            </dd>
                        
                        <dt class="stat">Special-defense</dt>
                            <dd class="text">${detail.spDef}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.spDef}">${detail.spDef}</progress>
                            </dd>
                        
                        <dt class="stat">Speed</dt>
                            <dd class="text">${detail.speed}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="200" value="${detail.speed}">${detail.speed}</progress>
                            </dd>
                    </dl>

                    <dl class="stats">
                        <dt class="stat">Total</dt>
                            <dd class="text">${detail.total}</dd>
                            <dd class="bar">
                                <progress class="progress-bar" max="700" value="${detail.total}">${detail.total}</progress>
                            </dd>
                    </dl>     
            </section>          
        </main>
        `
    })
}

detailPokemon(getId())