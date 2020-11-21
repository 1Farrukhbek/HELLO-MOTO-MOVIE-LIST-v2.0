// CREATE NORMALIZED MOVIE ARRAY
var normalizedMovieList = movies.map(function (movie, i) {
    return {
        id: i + 1,
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split('|'),
        summary: movie.summary,
        imdbId: movie.imdb_id,
        imdbRating: movie.imdb_rating,
        runtime: movie.runtime,
        language: movie.language,
        youtubeImg: `http://i3.ytimg.com/vi/${movie.ytid}/sddefault.jpg`,
        youtubeId: `https://youtube.com/watch?v=${movie.ytid}`
    }
});

var miniTest = normalizedMovieList.slice(0, 100);

// SELECT ITEMS FROM HTML 
var elMovieList = $_('.js-movie-list');
var elMovieCardTemplate = $_('#movie-template').content;

// CREATE MOVIE ELEMENTS FROM TEMPLATE
var createMovieElement = function (movie) {
    var templateMovieElement = elMovieCardTemplate.cloneNode(true);
    
    $_('.js-movie-img', templateMovieElement).src = movie.youtubeImg;
    $_('.js-movie-front-title', templateMovieElement).textContent = movie.title;
    $_('.js-movie-back-title', templateMovieElement).textContent = movie.title;
    $_('.js-movie-summary', templateMovieElement).textContent = movie.summary;
    $_('.js-youtube-link', templateMovieElement).href = movie.youtubeId;
    
    return templateMovieElement;
}

var renderMovie = function (movies) {
    elMovieList.innerHTML = '';
    
    var moviesFragment = document.createDocumentFragment();
    
    movies.forEach(function (movie) {
        moviesFragment.appendChild(createMovieElement(movie));
    });
    
    elMoviesList.appendChild(moviesFragment);
};

var renderMovieElements = function (movies) {
    elMovieList.innerHTML = '';
    
    var elMoviesWrapperFragment = document.createDocumentFragment();
    
    movies.forEach(function (movie) {
        elMoviesWrapperFragment.appendChild(createMovieElement(movie));
    });
    
    elMovieList.appendChild(elMoviesWrapperFragment);
};

renderMovieElements(miniTest)

