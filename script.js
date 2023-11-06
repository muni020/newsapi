var input = document.getElementById('input')
var btn = document.getElementById('btn')

var url = "https://newsapi.org/v2/everything?q="

var API_KEY = "2e3e27349eeb4e359e2b32046119c7b0";

// window.addEventListener('load',()=>fetchNews("Pakistan"));

async function fetchNews(query) {
    const raw = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await raw.json();
    displayNews(data.articles);

    //moving top
    document.documentElement.scrollTop = 0;
}

function displayNews(articles, result) {
    // we have to appent card in this container
    const cardsContainer = document.getElementById('cards-container');
    // templete of card
    const card = document.getElementById('template-news-card');
    //reseting container to display new feteched data
    cardsContainer.innerHTML = '';

    articles.forEach(index => {

        //not diplaying the news which does not contain image 
        if (!index.urlToImage) {
            return
        }
        else {
            const cardClone = card.content.cloneNode(true);
            fillCardData(cardClone, index);
            cardsContainer.appendChild(cardClone);
        }
    })
}

function fillCardData(cardClone, index) {
    const img = cardClone.getElementById('news-img');
    const title = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const desc = cardClone.getElementById('news-desc');
    

    //atag.href=;
    img.src = index.urlToImage;
    title.innerHTML = index.title;
    desc.innerHTML = index.description;

    const date = new Date(index.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

     newsSource.innerHTML = `${index.source.name} | ${date}`;
}



//navItem click to call function
function onNavItemClick(query) {
    fetchNews(query);
}

//search button click function
function onSearch() {
    fetchNews(input.value);
}

//when enterkey press on input box
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        onSearch();
    }
}); 