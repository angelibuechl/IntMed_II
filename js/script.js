console.log("blub");



//**APIs**
const apiUrls={
    breeds: 'https://catfact.ninja/breeds',
    fact: 'https://catfact.ninja/fact',
    catImage: 'https://api.thecatapi.com/v1/images/search'
};

async function loadApiData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
//const data = await loadBreeds();
//console.log(data);

//**breeds**
const breedGrid = document.querySelector('#breedGrid');
const breedStatus = document.querySelector('#breedStatus');
const breedSort = document.querySelector('#breed_sort');

if (breedGrid !== null && breedSort !== null) {
    await initBreedsPage();
}

//Breed-Seite initialisieren
async function initBreedsPage() {
    const data = await loadApiData(apiUrls.breeds);
 
    if (data !== false) {
        // Breed-Daten aus dem API-Response-Objekt holen
        const breeds = data.data;
        // Karten beim ersten Laden anzeigen
        showBreeds(breeds);
        // Sortierung bei Änderung des Dropdowns auslösen
        breedSort.addEventListener('input', function (event) {
            const sortKey = event.target.value;
            // Array alphabetisch nach gewähltem Key sortieren
            const sortedBreeds = breeds.toSorted(function (a, b) {
                if (a[sortKey] > b[sortKey]) return 1;
                if (a[sortKey] < b[sortKey]) return -1;
                return 0;
            });
            showBreeds(sortedBreeds);
        });
    } else {
        // Fehlermeldung ins DOM schreiben
        breedStatus.innerText = 'cat breeds could not be loaded';
    }
}

// Leert das Grid und zeigt alle Breed-Karten an
function showBreeds(breeds) {
    breedGrid.innerHTML = '';
    // Für jede Breed eine Karte erstellen und ins Grid laden
    breeds.forEach(function (breed) {
        const card = createBreedCard(breed);
        breedGrid.appendChild(card);
    });
}

//einzelne Breed-Card als DOM-Element
function createBreedCard(breed) {
    //Äussere Card
    const outerCard = document.createElement('article');
    outerCard.classList.add('breed_card');
    //innere Card
    const innerCard = document.createElement('div');
    innerCard.classList.add('breed_card_inner');
    //breed name als Titel
    const title = document.createElement('h2');
    title.innerText = breed.breed;

    const list = document.createElement('dl');
    list.classList.add('breed_info_list');

    //Infozeilen
    const country = createInfoRow('country:', breed.country);
    const origin = createInfoRow('origin:', breed.origin);
    const coat = createInfoRow('coat:', breed.coat);
    const pattern = createInfoRow('pattern:', breed.pattern);

    list.appendChild(country);
    list.appendChild(origin);
    list.appendChild(coat);
    list.appendChild(pattern);

    innerCard.appendChild(title);
    innerCard.appendChild(list);
    outerCard.appendChild(innerCard);

    return outerCard;
}

//einzelne Infozeile (Label + Wert)
function createInfoRow(label, value) {
    const row = document.createElement('div');
    row.classList.add('breed_info_row');

    const term = document.createElement('h3');
    term.innerText = label;

    const description = document.createElement('p');
    
    // Wenn kein Wert vorhanden ist, "-" anzeigen
    if (value === '' || value === null || value === undefined) {
        description.innerText = '-';
    } else {
        description.innerText = value;
    }
    row.appendChild(term);
    row.appendChild(description);
    return row;
}

/**facts**/
const catFact = document.querySelector('#catFact');
const factText = document.querySelector('#factText');
const catFactButton = document.querySelector('#catFactButton');

if (factStatus !== null && factText !== null && factButton !== null) {
    await initFactsPage();
}

async function initFactsPage() {
    await showCatFact();
    factButton.addEventListener('click', showCatFact);
}

async function showCatFact() {
    factStatus.innerText = 'cat fact loading...';
    factText.innerText = '';
    factButton.disabled = true;
    const data = await loadApiData(apiUrls.fact);
    if (data !== false && data.fact !== undefined) {
        factStatus.innerText = '';
        factText.innerText = data.fact;
    } else {
        factStatus.innerText = 'cat fact could not be loaded';
        factText.innerText = '';
    }
    factButton.disabled = false;
}