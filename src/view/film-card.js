import {
  realeaseYear
} from '../utils/film.js';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (films) => {
  const {
    filmInfo,
    comments,
    userDetails
  } = films;
  const {
    title,
    rating,
    release,
    runtime,
    genre,
    poster,
    description
  } = filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite
  } = userDetails;


  const duration = runtime > 59 ? `${parseInt((runtime/60), 10)} h ${runtime % 60} m` : `${runtime} m`;
  const shortDescription = description.length > 140 ? `${description.replace((description.length === 139), '$&')}...` : `${description}`;
  const numberСomments = comments === false ? '0' : `${comments.length}`;
  const ACTIVE_STATE = 'film-card__controls-item--active';
  const addedToWatchlist = watchlist ? ACTIVE_STATE : '';
  const addedToAlreadyWatched = alreadyWatched ? ACTIVE_STATE : '';
  const addedToFavorite = favorite ? ACTIVE_STATE : '';

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${realeaseYear(release.date)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${numberСomments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${ addedToWatchlist }" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${ addedToAlreadyWatched }" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${ addedToFavorite }" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(films) {
    super();
    this._films = films;

    this._openClickHandler = this._openClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._films);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openClickHandler);

  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

}
