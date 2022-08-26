import RatingView from './view/rating.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import StatisticsView from './view/statistics.js';
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
} from './utils/render.js';
import BoardFilms from './presenter/films-list-presenter.js';

const FILMS_COUNT = 30;


const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

//header
render(siteHeaderElement, new RatingView(), RenderPosition.BEFOREEND);

//menu
render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

//films
const filmsPresenter = new BoardFilms(siteMainElement);
filmsPresenter.init(films);

//footer
render(siteFooterStatisticsElement, new StatisticsView(), RenderPosition.BEFOREEND);


// const renderFilm = (filmListElement, film) => {
//   const filmCardComponent = new FilmCardView(film);
//   const filmDetailsComponent = new FilmDetailsView(film);

//   const removeDetailsComponent = () => {
//     remove(filmDetailsComponent);

//     document.querySelector('body').classList.remove('hide-overflow');
//   };

//   filmCardComponent.setOpenClickHandler(() => {
//     siteFooterElement.appendChild(filmDetailsComponent.getElement());
//     document.querySelector('body').classList.add('hide-overflow');
//   });

//   filmDetailsComponent.setCloseClickHandler(() => {
//     removeDetailsComponent();
//   });

//   const onEscKeyDown = (evt) => {
//     if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
//       evt.preventDefault();
//       removeDetailsComponent();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };
//   document.addEventListener('keydown', onEscKeyDown);
//   render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
// };

// const renderFilmsList = (filmsContainer, boardFilms) => {
//   const flimsComponent = new FilmsView();
//   const flimsListComponent = new FilmsListView();

//   render(filmsContainer, flimsComponent, RenderPosition.BEFOREEND);

//   //no films
//   if (boardFilms.length === 0) {
//     render(flimsComponent, new NoFilmsView(), RenderPosition.BEFOREEND);

//   } else {
//     render(flimsComponent, flimsListComponent, RenderPosition.BEFOREEND);
//     render(flimsComponent, new FilmsListExtraView('Top rated'), RenderPosition.BEFOREEND);
//     render(flimsComponent, new FilmsListExtraView('Most commented'), RenderPosition.BEFOREEND);
//   }

//   const flimsListContainerComponent = flimsListComponent.getElement().querySelector('.films-list__container');

//   for (let i = 0; i < Math.min(boardFilms.length, FILMS_COUNT_PER_STEP); i++) {
//     renderFilm(flimsListContainerComponent, boardFilms[i]);
//   }

//   if (boardFilms.length > FILMS_COUNT_PER_STEP) {
//     const showMoreButton = new ShowMoreView();
//     let renderFilmsCount = FILMS_COUNT_PER_STEP;
//     render(flimsListComponent, showMoreButton, RenderPosition.BEFOREEND);

//     showMoreButton.setClickHandler(() => {
//       boardFilms
//         .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
//         .forEach((film) => renderFilm(flimsListContainerComponent, film));

//       renderFilmsCount += FILMS_COUNT_PER_STEP;

//       if (renderFilmsCount >= boardFilms.length) {
//         remove(showMoreButton);
//       }
//     });
//   }

//   const filmsExtraListContainer = [...flimsComponent.getElement().querySelectorAll('.films-list--extra')];

//   filmsExtraListContainer.forEach((item) => {
//     const container = item.querySelector('.films-list__container');
//     for (let i = 0; i < EXTRA_FILMS; i++) {
//       renderFilm(container,boardFilms[i]);
//     }
//   });
// };

// renderFilmsList(siteMainElement, films);

