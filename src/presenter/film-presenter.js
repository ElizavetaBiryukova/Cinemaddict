import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import FilmCommentsView from '../view/film-comments.js';
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
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleRemoveFilmDetails = this._handleRemoveFilmDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);


    this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);

    this._filmDetailsComponent.setCloseClickHandler(this._handleRemoveFilmDetails);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);


    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    }

    if (document.querySelector('body').contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      this._handleOpenClick();
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _handleOpenClick() {
    this._removeOldFilmDetails();
    render(document.querySelector('footer'), this._filmDetailsComponent, RenderPosition.AFTER);
    render(this._filmDetailsComponent.getElement().querySelector('.film-details__bottom-container'), new FilmCommentsView(this._film), RenderPosition.BEFOREEND);

    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._filmDetailsComponent.setCloseClickHandler(this._handleRemoveFilmDetails);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
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


  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film, {
          userDetails:
          {
            watchlist: !this._film.userDetails.watchlist,
            alreadyWatched: this._film.userDetails.alreadyWatched,
            watchingDate: this._film.userDetails.watchingDate,
            favorite: this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      Object.assign({},
        this._film, {
          userDetails:
          {
            watchlist: this._film.userDetails.watchlist,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
            watchingDate: this._film.userDetails.watchingDate,
            favorite: this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({},
        this._film, {
          userDetails:
          {
            watchlist: this._film.userDetails.watchlist,
            alreadyWatched: this._film.userDetails.alreadyWatched,
            watchingDate: this._film.userDetails.watchingDate,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }
}
