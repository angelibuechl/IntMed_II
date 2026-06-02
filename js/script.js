console.log("blub");

//**breeds**
const url= 'https://catfact.ninja/breeds';


const breedGrid = document.querySelector('#breedGrid');
const breedStatus = document.querySelector('#breedStatus');

async function loadBreeds() {
    const url = 'https://catfact.ninja/breeds'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadBreeds();
//console.log(data);

function showBreeds(breeds) {
    breedGrid.innerHTML = '';
    breeds.forEach(function (breed) {
        const card = createBreedCard(breed);
        breedGrid.appendChild(card);
    });
}

function createBreedCard(breed) {
    const card = document.createElement('article');
    card.classList.add('breed_card');

    const inner = document.createElement('div');
    inner.classList.add('breed_card_inner');

    const title = document.createElement('h2');

    title.innerText = breed.breed;

    const list = document.createElement('dl');

    const country = createInfoRow('country:', breed.country);
    const origin = createInfoRow('origin:', breed.origin);
    const coat = createInfoRow('coat:', breed.coat);
    const pattern = createInfoRow('pattern:', breed.pattern);

    list.appendChild(country);
    list.appendChild(origin);
    list.appendChild(coat);
    list.appendChild(pattern);

    inner.appendChild(title);
    inner.appendChild(list);

    card.appendChild(inner);

    return card;
}
