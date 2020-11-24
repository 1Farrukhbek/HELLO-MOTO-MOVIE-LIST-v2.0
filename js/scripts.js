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
    youtubeImg: `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`,
    youtubeId: `https://youtube.com/watch?v=${movie.ytid}`
  }
});

// SELECT ITEMS FROM HTML 
var elMovieList = $_('.js-movie-list');
var elSearchForm = $_('.js-search-form');
var elSearchInput = $_('.js-search-input', elSearchForm);
var elCategory = $_('.js-category', elSearchForm);
var elImdbRating = $_('.js-imdb-rating', elSearchForm);
var elMovieCardTemplate = $_('#movie-template').content;

// CREATE MOVIE ELEMENTS FROM TEMPLATE
var createMovieElement = function (movie) {
  var templateMovieElement = elMovieCardTemplate.cloneNode(true);
  
  $_('.js-movie-img', templateMovieElement).src = movie.youtubeImg;
  $_('.js-movie-front-title', templateMovieElement).textContent = movie.title;
  $_('.js-movie-category', templateMovieElement).textContent = movie.categories.join(', ');
  $_('.js-imdb-rating', templateMovieElement).textContent = movie.imdbRating;
  $_('.js-runtime', templateMovieElement).textContent = `${movie.runtime} min`;
  $_('.js-movie-back-title', templateMovieElement).textContent = movie.title;
  $_('.js-movie-summary', templateMovieElement).textContent = movie.summary;
  $_('.js-youtube-link', templateMovieElement).href = movie.youtubeId;
  
  return templateMovieElement;
}

// CRATE FRAGMENT OF MOVIES CARD
var renderMovieElements = function (movies) {
  elMovieList.innerHTML = '';
  
  var elMoviesWrapperFragment = document.createDocumentFragment();
  
  movies.forEach(function (movie) {
    elMoviesWrapperFragment.appendChild(createMovieElement(movie));
  });
  
  elMovieList.appendChild(elMoviesWrapperFragment);
};

renderMovieElements(normalizedMovieList.slice(20, 100));

var categoryList = [];

normalizedMovieList.forEach(function (movie) {
  movie.categories.forEach(function (category) {
    if (!categoryList.includes(category)) {
      categoryList.push(category);
    }
  })
});

categoryList.sort();


categoryList.forEach(function (category) {
  var createCategoryOption = createElement('option', '', category);
  elCategory.appendChild(createCategoryOption);
});



var searchMovie = function (evt) {
  evt.preventDefault();
  
  var searchType = new RegExp(elSearchInput.value.trim(), 'gi');
  var searchResult = normalizedMovieList.filter(function (movie) {
    return movie.title.match(searchType);
  });

  renderMovieElements(searchResult);
  elSearchInput.value = '';
}


elSearchForm.addEventListener('submit', searchMovie);


