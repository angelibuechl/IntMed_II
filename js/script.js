//**APIs**
const apiUrls={
    breeds: 'https://catfact.ninja/breeds',
    fact: 'https://catfact.ninja/fact',
    catImage: 'https://api.thecatapi.com/v1/images/search',
    memory: 'https://api.thecatapi.com/v1/images/search?limit=6'
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
//**breeds**
const breedGrid = document.querySelector('#breedGrid');
const breedStatus = document.querySelector('#breedStatus');
const sortToggle = document.querySelector('#sortToggle');
const sortMenu = document.querySelector('#sortMenu');
const sortLabel = document.querySelector('#sortLabel');

if (breedGrid !== null && sortToggle !== null) {
    await initBreedsPage();
}
async function initBreedsPage() {
    const data = await loadApiData(apiUrls.breeds);
    if (data !== false) {
        const breeds = data.data;
        showBreeds(breeds);
        sortToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            const isOpen = sortMenu.classList.toggle('open');
            sortToggle.setAttribute('aria-expanded', isOpen);
        });
        sortMenu.querySelectorAll('.sort_option').forEach(function (option) {
            option.addEventListener('click', function () {
                const sortKey = option.dataset.value;
                const sortedBreeds = breeds.toSorted(function (a, b) {
                    if (a[sortKey] > b[sortKey]) return 1;
                    if (a[sortKey] < b[sortKey]) return -1;
                    return 0;
                });
                showBreeds(sortedBreeds);
                sortLabel.innerText = option.innerText;
                sortMenu.querySelectorAll('.sort_option').forEach(function (o) {
                    o.classList.remove('active');
                });
                option.classList.add('active');
                sortMenu.classList.remove('open');
                sortToggle.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('click', function () {
            if (sortMenu.classList.contains('open')) {
                sortMenu.classList.remove('open');
                sortToggle.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        breedStatus.innerText = 'cat breeds could not be loaded';
    }
}

function showBreeds(breeds) {
    breedGrid.innerHTML = '';
    breeds.forEach(function (breed) {
        const card = createBreedCard(breed);
        breedGrid.appendChild(card);
    });
}
function createBreedCard(breed) {    
    const outerCard = document.createElement('article');
    outerCard.classList.add('breed_card');
    
    const innerCard = document.createElement('div');
    innerCard.classList.add('breed_card_inner');

    const title = document.createElement('h2');
    title.innerText = breed.breed;

    const list = document.createElement('dl');
    list.classList.add('breed_info_list');

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
function createInfoRow(label, value) {
    const row = document.createElement('div');
    row.classList.add('breed_info_row');

    const term = document.createElement('h3');
    term.innerText = label;

    const description = document.createElement('p');
    
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
const factStatus = document.querySelector('#factStatus');
const factText = document.querySelector('#factText');
const factButton = document.querySelector('#factButton');
if (factStatus !== null && factText !== null && factButton !== null) {
    initFactsPage();
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

/**pictures**/
const pictureCard = document.querySelector('#pictureCard');
const pictureStatus = document.querySelector('#pictureStatus');
const catPicture = document.querySelector('#catPicture');
const pictureButton = document.querySelector('#pictureButton');
if (pictureCard && pictureStatus && catPicture && pictureButton) {
    initPicturesPage();
}
async function initPicturesPage() {
    await showCatPicture();
    pictureButton.addEventListener('click', showCatPicture);
}
async function showCatPicture() {
    pictureStatus.innerText = 'cat picture loading...';
    catPicture.style.display = 'none';
    pictureButton.disabled = true;
    const data = await loadApiData(apiUrls.catImage);
    if (data && data[0]) {
        const image = data[0];
        const ratio = image.width / image.height;
        const newWidth = pictureCard.offsetHeight * ratio;
        pictureCard.style.width = `min(100%, ${newWidth}px)`;

        catPicture.onload = function () {
            pictureStatus.innerText = '';
            catPicture.style.display = 'block';
            pictureButton.disabled = false;
        };
        catPicture.src = image.url;
    } else {
        pictureStatus.innerText = 'cat picture could not be loaded';
        pictureButton.disabled = false;
    }
}

/**memory**/
const memoryGrid = document.querySelector('#memoryGrid');
const memoryStatus = document.querySelector('#memoryStatus');
const memoryButton = document.querySelector('#memoryButton');
const memoryMessage = document.querySelector('#memoryMessage');

let firstCard = null;
let secondCard = null;
let lockMemory = false;
if (memoryGrid !== null && memoryButton !== null) {
    initMemoryPage();
}
async function initMemoryPage() {
    await showMemory();
    memoryButton.addEventListener('click', showMemory);
}
async function showMemory() {
    memoryGrid.innerHTML = '<p class="memory_status" id="memoryStatus">cat memory loading...</p>';
    memoryButton.disabled = true;
    memoryGrid.classList.remove('solved');
    if (memoryMessage !== null) {
        memoryMessage.classList.remove('show');
        memoryMessage.innerText = '';
    }
    const data = await loadApiData(apiUrls.memory);
    if (data !== false && Array.isArray(data) && data.length >= 6) {
        const sixCats = data.slice(0, 6);
        const cards = [...sixCats, ...sixCats].sort(function () {
            return Math.random() - 0.5;
        });
        memoryGrid.innerHTML = '';
        firstCard = null;
        secondCard = null;
        lockMemory = false;
        cards.forEach(function (cat) {
            const card = createMemoryCard(cat);
            memoryGrid.appendChild(card);
        });
    } else {
        memoryGrid.innerHTML = '<p class="memory_status">memory could not be loaded</p>';
    }
    memoryButton.disabled = false;
}
function createMemoryCard(cat) {
    const card = document.createElement('button');
    card.classList.add('memory_card');
    card.dataset.id = cat.id;

    card.type = 'button';
    card.setAttribute('aria-label', 'memory card');

    const inner = document.createElement('div');
    inner.classList.add('memory_card_inner');

    const image = document.createElement('img');
    image.classList.add('memory_img');
    image.src = cat.url;
    image.alt = 'cat memory picture';

    inner.appendChild(image);
    card.appendChild(inner);
    card.addEventListener('click', function () {
        flipMemoryCard(card);
    });
    return card;
}
function flipMemoryCard(card) {
    if (lockMemory || card.classList.contains('open') || card.classList.contains('done')) {
        return;
    }
    card.classList.add('open');
    if (firstCard === null) {
        firstCard = card;
        return;
    }
    secondCard = card;
    lockMemory = true;

    if (firstCard.dataset.id === secondCard.dataset.id) {
        firstCard.classList.add('done');
        secondCard.classList.add('done');
        checkMemorySolved();
        resetMemoryTurn();
    } else {
        setTimeout(function () {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            resetMemoryTurn();
        }, 900);
    }
}
function resetMemoryTurn() {
    firstCard = null;
    secondCard = null;
    lockMemory = false;
}
function checkMemorySolved() {
    const allCards = document.querySelectorAll('.memory_card');
    const doneCards = document.querySelectorAll('.memory_card.done');
    if (allCards.length > 0 && allCards.length === doneCards.length) {
        memoryGrid.classList.add('solved');
        if (memoryMessage !== null) {
            memoryMessage.innerText = 'Congratulations! You solved the memory!';
            memoryMessage.classList.add('show');
        }
    }
}

/**mobile dropdown-menu**/
const menuToggle = document.querySelector('#menuToggle');
const mainMenu = document.querySelector('#mainMenu');
 
if (menuToggle !== null && mainMenu !== null) {
    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        const isOpen = mainMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
    mainMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mainMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    document.addEventListener('click', function () {
        if (mainMenu.classList.contains('open')) {
            mainMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}