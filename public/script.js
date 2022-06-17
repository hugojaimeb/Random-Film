const tmdbKey = '82ca1514d92cc85cf9c0650efa4e12d8';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const genresSelect = document.getElementById('genres');

let movies

const getGenres = async () => {
const genreRequestEndpoint = '/genre/movie/list';
const requestParams  = `?api_key=${tmdbKey}`;
const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

try{
  const response = await fetch(urlToFetch);
  if (response.ok){
    const jsonResponse = await response.json();
    const genres = jsonResponse.genres;
    return genres;
  }
} catch (error){
console.log(error);
};
};

const getMovies = async () => {
  console.log("ellls")
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndPoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndPoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok){
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    return movies;
  }} catch (error){
    console.log(error);
  };
};


async function getMovieInfo(movie) {
  const movieId = movie.id;
  const movieEndPoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    } try { } catch (error) {
      console.log(error);
    };
  } finally { };
 // Gets a list of movies and ultimately displays the info of a random movie from the list  
}
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const m = getRandomMovie(movies);
  console.log(m);
  displayMovie(m);
  
};
playBtn.onclick = showRandomMovie;
getGenres().then(populateGenreDropdown);
genresSelect.onchange = () => {
  console.log('paso por aqui');
  getMovies().then(apiMovies => movies = apiMovies);

}