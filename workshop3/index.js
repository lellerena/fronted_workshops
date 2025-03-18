document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form')
    const tableContainer = document.getElementById('table-container')
    const typeContainer = document.getElementById('type-container')
    const homeButton = document.getElementById('home-button')
    const typesButton = document.getElementById('types-button')
    const userInfo = document.getElementById('user-info')
    const logoutButton = document.getElementById('logout-button')

    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' }
    ]

    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
        showUserInterface(currentUser)
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const user = users.find(user => user.username === username && user.password === password)
        if (user) {
            localStorage.setItem('currentUser', username)
            showUserInterface(username)
        } else {
            alert('Credenciales incorrectas')
        }
    })

    homeButton.addEventListener('click', () => {
        form.style.display = 'block'
        tableContainer.style.display = 'none'
        typeContainer.style.display = 'none'
    })

    typesButton.addEventListener('click', () => {
        form.style.display = 'none'
        tableContainer.style.display = 'block'
        typeContainer.style.display = 'none'
    })

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser')
        form.style.display = 'block'
        tableContainer.style.display = 'none'
        typeContainer.style.display = 'none'
        userInfo.textContent = ''
        logoutButton.style.display = 'none'
    })

    function showUserInterface(username) {
        form.style.display = 'none'
        tableContainer.style.display = 'block'
        userInfo.textContent = `Logged in as: ${username}`
        logoutButton.style.display = 'inline-block'

        // Obtener datos de la API de Pokémon
        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => displayData(data.results))
            .catch(error => console.error('Error fetching data:', error))
    }

    function displayData(types) {
        const grid = document.getElementById('data-grid')
        grid.innerHTML = ''
        types.forEach((type) => {
            const card = document.createElement('div')
            card.className = 'card'

            const link = document.createElement('a')
            link.href = `#type=${type.name}`
            link.textContent = type.name
            link.addEventListener('click', (event) => {
                event.preventDefault()
                navigateToType(type.name)
            })
            card.appendChild(link)

            grid.appendChild(card)
        })
    }

    async function navigateToType(typeName) {
        tableContainer.style.display = 'none'
        typeContainer.style.display = 'block'
        const typeTitle = document.getElementById('type-title')
        typeTitle.textContent = `Pokémon Type: ${typeName}`

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
            const data = await response.json()
            displayTypeData(data.pokemon)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    function displayTypeData(pokemons) {
        const grid = document.getElementById('type-data-grid')
        grid.innerHTML = ''
        pokemons.forEach((pokemonEntry) => {
            const card = document.createElement('div')
            card.className = 'card'
            card.textContent = pokemonEntry.pokemon.name
            grid.appendChild(card)
        })
    }
})
