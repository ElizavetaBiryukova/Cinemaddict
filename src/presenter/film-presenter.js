import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {
  render,
  RenderPosition,
  remove,
  replace
} from '../utils/render.js';
import {
  Keys
} from '../utils/common.js';


export default class Film {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleRemoveFilmDetails = this._handleRemoveFilmDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmDetailsComponent.setCloseClickHandler(this._handleRemoveFilmDetails);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    }

    if (this._filmListContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      this._handleOpenClick();
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);


  }

  _handleOpenClick() {
    this._removeOldFilmDetails();
    render(document.querySelector('body'), this._filmDetailsComponent, RenderPosition.BEFOREEND);
    // console.log(this._filmDetailsComponent);
    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleRemoveFilmDetails() {
    remove(this._filmDetailsComponent);
    document.querySelector('body').classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      evt.preventDefault();
      this._handleRemoveFilmDetails();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _removeOldFilmDetails() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
      this._handleRemoveFilmDetails();
    }
  }
}
