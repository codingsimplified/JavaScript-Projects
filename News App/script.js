const API_KEY = "e6e6bc0cade846f084493dff4e5e5293";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
         if(!article.urlToImage) return;
         const cardClone = newsCardTemplate.content.cloneNode(true);
         fillDataInCard(cardClone, article);
         cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} + ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank');
    })
}

let currentSelectedNav = null;
function onNavItemCLick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("searchBtn");
const searchText = document.getElementById("searchInput");

searchButton.addEventListener('click', () => {
    console.log("Button clicked");
    const input = searchText.value;
    if(!input) return;
    fetchNews(input);
})
