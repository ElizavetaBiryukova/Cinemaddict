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
