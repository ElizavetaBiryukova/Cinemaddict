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
renderElement(siteHeaderElement, new RatingView().getElement(), RenderPosition.BEFOREEND);

//menu
renderElement(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//films
const flimsComponent = new FilmsView();
const flimsListComponent = new FilmsListView();

renderElement(siteMainElement, flimsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(flimsComponent.getElement(), flimsListComponent.getElement(), RenderPosition.BEFOREEND);
// console.log(flimsComponent.getElement());

const flimsListContainerComponent = flimsListComponent.getElement().querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(flimsListContainerComponent, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  const showMoreButton = new ShowMoreView();
  let renderFilmsCount = FILMS_COUNT_PER_STEP;
  renderElement(flimsListComponent.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderElement(flimsListContainerComponent, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
    }
  });
}

renderElement(flimsComponent.getElement(), new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
renderElement(flimsComponent.getElement(), new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);
const filmsExtraListContainer = [...flimsComponent.getElement().querySelectorAll('.films-list--extra')];

filmsExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS; i++) {
    renderElement(container, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
});

//footer
renderElement(siteFooterStatisticsElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);

//details
renderElement(siteFooterElement, new FilmDetailsView(films[0]).getElement(), RenderPosition.AFTERBEGIN);

// new LoadingView();
