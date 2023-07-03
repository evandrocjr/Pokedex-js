// https://www.invertexto.com/215aula46


// pegando elementos
const pokemonName = document.querySelector('.pokemon-name') // nome do pokemon
const pokemonNumber = document.querySelector('.pokemon-number') // numero do pokemon
const pokemonImage = document.querySelector('.pokemon-image')// img do pokemon

const form = document.querySelector('form') // formulario

const input = document.querySelector('input') // input
const btnPrev = document.querySelector('.btn-prev') // btn pokemon anterior
const btnNext = document.querySelector('.btn-next') // btn proximo pokemon 

// 
let pokemonAtual = 1

// função que realiza a requisição na API
async function fetchPokemon(pokemon) {
    //definindo a url de requisição
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}` // url base da API
    //realizando requisição com fetch
    const response = await fetch(url)
    // convertendo resposta para json
    const data = await response.json()
    // retornando dados do pokemon
    return data
}  
    
// funcao que ira carregar o pokemon no body

async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando..."
    pokemonNumber.innerText = ""

    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonName.innerText = data.name // carregando nome do pokemon
        pokemonNumber.innerText = data.id  // carregando id/numero do pokemon
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] // carregando do objeto
        input.value = ""
        pokemonAtual = data.id
    }
    else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = "Não encontrado"
    }

}

//função submit do formulario
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let pokemon = input.value
    renderPokemon(pokemon)
})

// eventos botoes
btnPrev.addEventListener('click', () => {
    if (pokemonAtual > 1) {
        pokemonAtual--
        renderPokemon(pokemonAtual)
    }
} )

btnNext.addEventListener('click', () => {
        pokemonAtual++
        renderPokemon(pokemonAtual)
} )

renderPokemon(pokemonAtual) // max pokemon - 1010 // max pokemon com imagem 649