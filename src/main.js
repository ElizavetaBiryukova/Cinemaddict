import RatingView from './view/rating.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import {
  createFilmCardTemplate
} from './view/film-card.js';
import ShowMoreView from './view/show-more.js';
import FilmsListExtraView from './view/films-list-extra.js';
import StatisticsView from './view/statistics.js';
import {
  createFilmDetailsTemplate
} from './view/film-details.js';
import {
  generateFilms
} from './mock/films-mock.js';
import {
  generateFilter
} from './utils/filter.js';
// import LoadingView from './view/loading.js';
import {
  renderElement,
  RenderPosition,
  renderTemplate
} from './utils/common.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filters = generateFilter(films);
// console.log(NavigationView());

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

//header
renderElement(siteHeaderElement, new RatingView().getElement(), RenderPosition.BEFOREEND);

//menu
renderElement(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//films
renderElement(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

const flimsElement = siteMainElement.querySelector('.films');
renderElement(flimsElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const flimsListElement = siteMainElement.querySelector('.films-list');

const flimsListContainerElement = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(flimsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderFilmsCount = FILMS_COUNT_PER_STEP;
  renderElement(flimsListElement, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = flimsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(flimsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderElement(flimsElement, new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
renderElement(flimsElement, new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);
const filmsExtraListContainer = [...flimsElement.querySelectorAll('.films-list--extra')];

filmsExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS; i++) {
    renderTemplate(container, createFilmCardTemplate(films[i]), 'beforeend');
  }
});

//footer
renderElement(siteFooterStatisticsElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);

//details
renderTemplate(siteFooterElement, createFilmDetailsTemplate(films[0]), 'afterend');

// LoadingView;
