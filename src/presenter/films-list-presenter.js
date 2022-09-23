import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreView from '../view/show-more.js';
import FilmsListExtraView from '../view/films-list-extra.js';
import FilmsListExtra2View from '../view/films-list-extra.js';
import NoFilmsView from '../view/no-films.js';
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

const FILMS_COUNT_PER_STEP = 5;
const FILM_EXTRA_CARDS = 2;

export default class BoardFilms {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._flimsComponent = new FilmsView();
    this._flimsListComponent = new FilmsListView();
    this._flimsListTopRatedComponent = new FilmsListExtraView('Top Rated');
    this._flimsListMostCommentedComponent = new FilmsListExtra2View('Most commented');
    this._noFilmsComponent = new NoFilmsView();
  }

  init(films) {
    this._films = films.slice();

    render(this._filmsContainer, this._flimsComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListTopRatedComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListMostCommentedComponent, RenderPosition.BEFOREEND);

    this._renderBoardFilms();
  }

  _renderFilmsListContainer() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

  }

  _renderMostComentedContainer() {
    this._renderMostCommentedFilms();
  }

  _renderTopRatedContainer() {
    this._renderTopRatedFilms();
  }

  _renderFilm(film) {

    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const siteFooterElement = document.querySelector('.footer');

    const removeDetailsComponent = () => {
      remove(filmDetailsComponent);

      document.querySelector('body').classList.remove('hide-overflow');
    };

    filmCardComponent.setOpenClickHandler(() => {
      siteFooterElement.appendChild(filmDetailsComponent.getElement());
      document.querySelector('body').classList.add('hide-overflow');
    });

    filmDetailsComponent.setCloseClickHandler(() => {
      removeDetailsComponent();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
        evt.preventDefault();
        removeDetailsComponent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    const flimsListContainerComponent = this._flimsListComponent.getElement().querySelector('.films-list__container');

    render(flimsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const siteFooterElement = document.querySelector('.footer');

    const removeDetailsComponent = () => {
      remove(filmDetailsComponent);

      document.querySelector('body').classList.remove('hide-overflow');
    };

    filmCardComponent.setOpenClickHandler(() => {
      siteFooterElement.appendChild(filmDetailsComponent.getElement());
      document.querySelector('body').classList.add('hide-overflow');
    });

    filmDetailsComponent.setCloseClickHandler(() => {
      removeDetailsComponent();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
        evt.preventDefault();
        removeDetailsComponent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    const flimsListExtraContainerComponent = this._flimsListMostCommentedComponent.getElement().querySelector('.films-list__container');

    render(flimsListExtraContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const siteFooterElement = document.querySelector('.footer');

    const removeDetailsComponent = () => {
      remove(filmDetailsComponent);

      document.querySelector('body').classList.remove('hide-overflow');
    };

    filmCardComponent.setOpenClickHandler(() => {
      siteFooterElement.appendChild(filmDetailsComponent.getElement());
      document.querySelector('body').classList.add('hide-overflow');
    });

    filmDetailsComponent.setCloseClickHandler(() => {
      removeDetailsComponent();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
        evt.preventDefault();
        removeDetailsComponent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    const flimsListTopRatedContainerComponent = this._flimsListTopRatedComponent.getElement().querySelector('.films-list__container');
    render(flimsListTopRatedContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }


  _renderFilms(from, to) {
    //рендинг N-фильмов за раз
    this._films
      .slice(from, to)
      .forEach((films) => this._renderFilm(films));
  }

  _renderMostCommentedFilms() {
    //рендинг фильмов с большим количеством комментариев
    this._films
      .filter((film) => film.comments.length > 0)
      .sort((film1, film2) => film2.comments.length - film1.comments.length)
      .slice(0, FILM_EXTRA_CARDS)
      .forEach((films) => this._renderMostCommentedFilm(films));
  }

  _renderTopRatedFilms() {
    //рендинг фильмов с высоким рейтингом
    this._films
      .filter((film) => film.filmInfo.rating > 0)
      .sort((film1, film2) => film2.filmInfo.rating - film1.filmInfo.rating)
      .slice(0, FILM_EXTRA_CARDS)
      .forEach((films) => this._renderTopRatedFilm(films));
  }

  _renderNoFilms() {
    // когда нет фильмов
    render(this._flimsComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    //Кнопка для показа большего числа карточек
    //метод по отрисовки компонентов из RenderFilms В main.js

    let renderFilmsCount = FILMS_COUNT_PER_STEP;

    const showMoreButton = new ShowMoreView();

    render(this._flimsListComponent, showMoreButton, RenderPosition.BEFOREEND);
    showMoreButton.setClickHandler(() => {
      this._films
        .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((films) => this._renderFilm(films));

      renderFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderFilmsCount >= this._films.length) {
        remove(showMoreButton);
      }
    });
  }

  _renderBoardFilms() {
    //Рендер всего поля со всеми фильмами
    if (this._films.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderFilmsListContainer();
      this._renderMostComentedContainer();
      this._renderTopRatedContainer();
    }
  }
}
