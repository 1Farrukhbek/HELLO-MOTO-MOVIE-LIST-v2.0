// Create normalized Movie list 

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
        youtubeId: `https://youtube.com/watch?v=${movie.ytid}`
    }
});

// SELECT ITEMS FROM HTML 

