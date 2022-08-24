import RatingView from './view/rating.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreView from './view/show-more.js';
import FilmsListExtraView from './view/films-list-extra.js';
import StatisticsView from './view/statistics.js';
import FilmDetailsView from './view/film-details.js';
import NoFilmsView from './view/no-films.js';
import {
  generateFilms
} from './mock/films-mock.js';
import {
  generateFilter
} from './utils/filter.js';
// import LoadingView from './view/loading.js';
import {
  render,
  RenderPosition,
  Keys
} from './utils/common.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

//header
render(siteHeaderElement, new RatingView().getElement(), RenderPosition.BEFOREEND);

//menu
render(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//films

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const removeDetailsComponent = () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();

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
  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsBoard = (filmsContainer, boardFilms) => {
  const flimsComponent = new FilmsView();
  const flimsListComponent = new FilmsListView();

  render(filmsContainer, flimsComponent.getElement(), RenderPosition.BEFOREEND);

  //no films
  if (boardFilms.length === 0) {
    render(flimsComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.BEFOREEND);

  } else {
    render(flimsComponent.getElement(), flimsListComponent.getElement(), RenderPosition.BEFOREEND);
    render(flimsComponent.getElement(), new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
    render(flimsComponent.getElement(), new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);
  }

  const flimsListContainerComponent = flimsListComponent.getElement().querySelector('.films-list__container');

  for (let i = 0; i < Math.min(boardFilms.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(flimsListContainerComponent, boardFilms[i]);
  }

  if (boardFilms.length > FILMS_COUNT_PER_STEP) {
    const showMoreButton = new ShowMoreView();
    let renderFilmsCount = FILMS_COUNT_PER_STEP;
    render(flimsListComponent.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      boardFilms
        .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(flimsListContainerComponent, film));

      renderFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderFilmsCount >= boardFilms.length) {
        showMoreButton.getElement().remove();
      }
    });
  }

  const filmsExtraListContainer = [...flimsComponent.getElement().querySelectorAll('.films-list--extra')];

  filmsExtraListContainer.forEach((item) => {
    const container = item.querySelector('.films-list__container');
    for (let i = 0; i < EXTRA_FILMS; i++) {
      render(container, new FilmCardView(boardFilms[i]).getElement(), RenderPosition.BEFOREEND);
    }
  });
};

renderFilmsBoard(siteMainElement, films);

//footer
render(siteFooterStatisticsElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
