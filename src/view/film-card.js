import {
  realeaseYear
} from '../utils/common';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (films) => {
  const {
    filmInfo,
    comments
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

  const duration = runtime > 59 ? `${parseInt((runtime/60), 10)} h ${runtime % 60} m` : `${runtime} m`;
  const shortDescription = description.length > 140 ? `${description.replace((description.length === 139), '$&')}...` : `${description}`;
  const numberСomments = comments === false ? '0' : `${comments.length}`;
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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
};


export default class FilmCard extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmCardTemplate(this._films);
  }
}
