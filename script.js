const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviesContainer = document.querySelector(".movies-container");
const searchInputEl = document.getElementById("search");
const searchFormEl = document.getElementById("search-form");


    moviesData =[];
    getMovies(APIURL);
    


async function getMovies(apiUrl){
    const response = await fetch(apiUrl);
    responseData = await response.json();
    //console.log(responseData);
    moviesData = responseData.results;
    console.log(moviesData);

    addMovieToContainer();
}

function addMovieToContainer(searchMovie){
    moviesContainer.innerHTML= ""
    moviesData.forEach(movie => {
        const newMovieToAdd = document.createElement("div");
        newMovieToAdd.classList.add("movie");
        if(movie.poster_path==null){
            movie.poster_path = "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1890&q=80"
            console.log(movie.poster_path);
        }
        else{
            movie.poster_path =  IMGPATH+movie.poster_path;
        }
        
        newMovieToAdd.innerHTML = `
        <img src="${movie.poster_path}" alt="">
        <div class="movie-info">
        <h4>${movie.title}</h4>
        <div class="rank">${movie.vote_average}</div>
        </div>
        <div class="overview">${movie.overview}</div>
        `
        const rank = newMovieToAdd.querySelector(".rank");
        getClassColorByMovieRank(rank);
        moviesContainer.prepend(newMovieToAdd);
    });
}

function getClassColorByMovieRank(i_Rank){
    rank = i_Rank.innerHTML
    if (rank < 5)
    i_Rank.style.color = "#ff0000";
    else if (rank < 7)
    i_Rank.style.color = "orange";
    else if (rank <= 10)
    i_Rank.style.color = "greenyellow";
}  

searchFormEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const searchMovie = SEARCHAPI+searchInputEl.value; 
    getMovies(searchMovie);
});



