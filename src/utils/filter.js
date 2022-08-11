const filmToFilterMap = {
  'All moves': (films) => films.length,
  'Watchlist': (films) => films
    .filter((film) => film.userDetails.watchlist).length,
  'History': (films) => films
    .filter((film) => film.userDetails.alreadyWatched).length,
  'Favorites': (films) => films
    .filter((film) => film.userDetails.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films)
  })
);
