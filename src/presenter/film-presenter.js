import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {
  render,
  RenderPosition,
  remove
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

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);
    // console.log(this._filmListContainer());

    this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmDetailsComponent.setCloseClickHandler(this._handleRemoveFilmDetails);

    render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _handleOpenClick() {

    render(document.querySelector('body'), this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    // console.log(document.querySelector('body').contains(this._filmDetailsComponent.getElement()));

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
}
