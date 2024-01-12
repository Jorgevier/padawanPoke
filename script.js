console.log('padawans DOm manilation')
const body = document.body
const btn = document.createElement('button')

btn.innerText = "Toggel Theme"
body.appendChild(btn)

btn.addEventListener("click", () => {
    if(body.style.backgroundColor === 'black'){
        toggleTheme('white', 'black', 'Dark mode')        
    } else {
        toggleTheme('black', 'white', 'Flash Bang')    
    }
    // hard coding to change bg perminant
    // body.style.backgroundColor = 'black'
    // body.style.text = 'white'
})

function toggleTheme(bgColor, txtColor, nextTheme){
    body.style.backgroundColor = bgColor
    body.style.color = txtColor
    btn.innerText = nextTheme
}

const studentContainer = document.querySelector('#student-container')
console.log(studentContainer)

const students1 = ['parker', 'jorge', 'justin', 'zak']

for ( const student of ['cam', 'jud', 'cmaeron', 'emilo', 'idk']){
    studentContainer.innerHTML += `<li>${student}</li>`
}
students1.forEach((student ) => {
    const studentsLi = document.createElement('li')
    studentsLi.innerText = titleCase(student)
    studentContainer.appendChild(studentsLi)    
})




function titleCase(string){
      let output = ''
      const words = string.split(' ')
      for(let i = 0; i< words.length; i++){
        output += words[i][0].toUpperCase() + words[i].substring(1) + ' '
    }
    return output.trim(' ')
}

const pokeForm = document.getElementById('poke-form')

pokeForm.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const pokeName = getPokeName()
    const data = await pokeApiCall(pokeName)
    const pokeData = parsePokeData(data)
    makePokeCard(pokeData)
})

function getPokeName(){
    const pokeField = document.querySelector('#poke-field')
    return pokeField.value
}
async function pokeApiCall(pokeName){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    if(res.ok){
        return data = await res.json()
    }
}
function parsePokeData(pokeData){
    return {
        name: pokeData.name,
        weight: pokeData.weight,
        abilities: pokeData.abilities,
        imgUrl: pokeData.sprites.front_default
    }
}
function makePokeCard({name, weight, abilities, imgUrl}){
    const pokeCard = document.createElement('div')
    const pokeHeader = document.createElement('h3')
    const abilitiesContainer = document.createElement('ul')
    const weightP = document.createElement('p')
    const pokeImg = document.createElement('img')

    pokeHeader.innerText = titleCase(name)

    for (const ability of abilities){
        const abilityLi = document.createElement('li')
        abilityLi.innerText = ability.ability.name
        abilitiesContainer.appendChild(abilityLi)
    }
    weightP.innerText = weight

    pokeImg.src = imgUrl

    pokeCard.append(pokeHeader, abilitiesContainer, weightP, pokeImg)
    
    pokeCard.addEventListener('click', () => pokeCard.remove())

    body.append(pokeCard)
}
