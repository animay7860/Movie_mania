const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1144a12f4b888742d4ac24341c6a762d&page='
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
const prevBtn = document.getElementsByClassName('prev')[0];
const nextBtn = document.getElementsByClassName('next')[0];

let pageLimit,currPage=1;

getMovies(APIURL+currPage);

function buttonView()
{
    if(currPage == 1)
        prevBtn.style.visibility = "hidden";
    else
        prevBtn.style.visibility = "visible";

    if(currPage == pageLimit)
        nextBtn.style.visibility = "hidden";
    else
        nextBtn.style.visibility = "visible";
}

async function getMovies(url)
{
    const resp = await fetch(url);
    const movieData = await resp.json();
    
    pageLimit = movieData['total_pages'];
    
    showMovies(movieData.results);
}

function showMovies(movieData)
{
    buttonView();
    main.innerHTML = '';
    movieData.forEach(movie => {
        
        const {poster_path,vote_average,title,overview} =  movie;
        const movieEle = document.createElement("div");
        movieEle.classList.add("movie");

        movieEle.innerHTML = `
        <img src="${IMGPATH+poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span><b>${vote_average}</b></span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>
        `;

        main.appendChild(movieEle);
    });
}

function next()
{
    currPage += 1;
    console.log(currPage);
    let searchTerm;
    
    if(search.value)
    {
        searchTerm = search.value+'&page='+currPage;
        getMovies(SEARCHAPI+searchTerm);
    }
    else
    {
        searchTerm = APIURL+currPage;
        getMovies(searchTerm);
    } 

    buttonView();
}

function prev()
{
    currPage -= 1;
    console.log(currPage);
    let searchTerm;
    
    if(search.value)
    {
        searchTerm = search.value+'&page='+currPage;
        getMovies(SEARCHAPI+searchTerm);
    }
    else
    {
        searchTerm = APIURL+currPage;
        getMovies(searchTerm);
    } 

    buttonView()
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    currPage = 1;
    const searchTerm = search.value+'&page='+currPage;

    if(searchTerm)
        getMovies(SEARCHAPI+searchTerm);
    
    if(currPage == 1)
        prevBtn.style.visibility = "hidden";

})