import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreView from '../view/show-more.js';
import FilmsListExtraView from '../view/films-list-extra.js';
import NoFilmsView from '../view/no-films.js';
import SortView from '../view/sort.js';
import FilmPresenter from '../presenter/film-presenter.js';
import {
  SortType
} from '../utils/const.js';
import {
  sortByDate,
  sortByRating
} from '../utils/film.js';
import {
  updateItem
} from '../utils/common.js';
import {
  render,
  RenderPosition,
  remove
} from '../utils/render.js';


const FILMS_COUNT_PER_STEP = 5;
const FILM_EXTRA_CARDS = 2;

export default class BoardFilms {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._flimsComponent = new FilmsView();
    this._flimsListComponent = new FilmsListView();
    this._flimsListTopRatedComponent = new FilmsListExtraView('Top Rated');
    this._flimsListMostCommentedComponent = new FilmsListExtraView('Most commented');
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButton = new ShowMoreView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    render(this._filmsContainer, this._flimsComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListTopRatedComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListMostCommentedComponent, RenderPosition.BEFOREEND);

    this._renderBoardFilms();
  }

  _handleFilmChange(updateFilm) {
    this._films = updateItem(this._films, updateFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updateFilm);
    this._filmPresenter.get(updateFilm.id).init(updateFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsListContainer();
    this._renderFilmsListContainer();
    this._renderSort();
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._flimsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmsListContainer() {
    //Общий список фильмов
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsListContainer() {
    remove(this._sortComponent);
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

  _renderFilm(filmsContainer, film) {
    const filmPresenter = new FilmPresenter(filmsContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderExtraFilm(filmsContainer, film) {
    const filmPresenter = new FilmPresenter(filmsContainer, this._handleFilmChange);
    filmPresenter.init(film);
  }

  _renderFilms(from, to) {
    //рендинг N-фильмов за раз
    this._films
      .slice(from, to)
      .forEach((films) => this._renderFilm(this._flimsListComponent.getElement().querySelector('.films-list__container'), films));
  }

  _renderMostCommentedFilms() {
    //рендинг фильмов с большим количеством комментариев
    this._films
      .filter((film) => film.comments.length > 0)
      .sort((film1, film2) => film2.comments.length - film1.comments.length)
      .slice(0, FILM_EXTRA_CARDS)
      .forEach((films) => this._renderExtraFilm(this._flimsListMostCommentedComponent.getElement().querySelector('.films-list__container'), films));
  }

  _renderTopRatedFilms() {
    //рендинг фильмов с высоким рейтингом
    this._films
      .filter((film) => film.filmInfo.rating > 0)
      .sort((film1, film2) => film2.filmInfo.rating - film1.filmInfo.rating)
      .slice(0, FILM_EXTRA_CARDS)
      .forEach((films) => this._renderExtraFilm(this._flimsListTopRatedComponent.getElement().querySelector('.films-list__container'), films));
  }

  _renderNoFilms() {
    // когда нет фильмов
    render(this._flimsComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
    remove(this._flimsListTopRatedComponent);
    remove(this._flimsListMostCommentedComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderFilmsCount, this._renderFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderFilmsCount >= this._films.length) {
      remove(this._showMoreButton);
    }
  }

  _renderShowMoreButton() {
    //Кнопка для показа большего числа карточек
    render(this._flimsListComponent, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderBoardFilms() {
    //Рендер всего поля со всеми фильмами
    this._renderSort();
    if (this._films.length === 0) {
      this._renderNoFilms();
    } else {

      this._renderFilmsListContainer();
      this._renderMostCommentedFilms();
      this._renderTopRatedFilms();
    }
  }
}
