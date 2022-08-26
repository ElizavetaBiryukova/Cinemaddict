import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreView from '../view/show-more.js';
// import FilmsListExtraView from '../view/films-list-extra.js';
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
// const EXTRA_FILMS = 2;

export default class BoardFilms {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;


    this._flimsComponent = new FilmsView();
    this._flimsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmsView();

  }

  init(films) {
    this._films = films.slice();

    render(this._filmsContainer, this._flimsComponent, RenderPosition.BEFOREEND);
    render(this._flimsComponent, this._flimsListComponent, RenderPosition.BEFOREEND);

    this._renderBoardFilms();
  }


  _renderFilmsListContainer() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

  }

  // _renderFilmsListExtraContainer() {
  //   const filmsExtraListContainer = [...this._flimsComponent.getElement().querySelectorAll('.films-list--extra')];

  //   filmsExtraListContainer.forEach((item) => {
  //     const container = item.querySelector('.films-list__container');
  //     for (let i = 0; i < EXTRA_FILMS; i++) {
  //       this._renderFilm(container, this._films[i]);
  //     }
  //   });

  // }

  // _renderFilmsListTopRated() {
  //   //Список екстра фильмов топ рейтинга
  //   render(this._flimsComponent, new FilmsListExtraView('Top rated'), RenderPosition.BEFOREEND);
  // }

  // _renderFilmsListMostCommented() {
  //   //Спиок экстра фильмов популярные
  //   render(this._flimsComponent, new FilmsListExtraView('Most commented'), RenderPosition.BEFOREEND);
  // }

  _renderFilm(film) {
    //Рендер карточек с фильмами, пока что это функция renderFilm В main.js
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
    const flimsListContainerComponent = this._flimsListComponent.getElement().querySelector('.films-list__container');
    document.addEventListener('keydown', onEscKeyDown);
    render(flimsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    //рендинг N-фильмов за раз
    this._films
      .slice(from, to)
      .forEach((films) => this._renderFilm(films));
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

    render(this._flimsComponent, showMoreButton, RenderPosition.BEFOREEND);
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
      // this.__renderFilmsListTopRated();
      // this.__renderFilmsListMostCommented();
    }
  }
}
