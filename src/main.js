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
  render,
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
render(siteHeaderElement, new RatingView().getElement(), RenderPosition.BEFOREEND);

//menu
render(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//films
const flimsComponent = new FilmsView();
const flimsListComponent = new FilmsListView();

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  filmCardComponent.getElement().addEventListener('click', () => {
    siteFooterElement.appendChild(filmDetailsComponent.getElement());
    document.querySelector('body').classList.add('hide-overflow');
  });

  filmDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    siteFooterElement.removeChild(filmDetailsComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
  });


  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteMainElement, flimsComponent.getElement(), RenderPosition.BEFOREEND);
render(flimsComponent.getElement(), flimsListComponent.getElement(), RenderPosition.BEFOREEND);
// console.log(flimsComponent.getElement());

const flimsListContainerComponent = flimsListComponent.getElement().querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilm(flimsListContainerComponent, films[i]);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  const showMoreButton = new ShowMoreView();
  let renderFilmsCount = FILMS_COUNT_PER_STEP;
  render(flimsListComponent.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(flimsListContainerComponent, film));

    renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
    }
  });
}

render(flimsComponent.getElement(), new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
render(flimsComponent.getElement(), new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);
const filmsExtraListContainer = [...flimsComponent.getElement().querySelectorAll('.films-list--extra')];

filmsExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS; i++) {
    render(container, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
});

//footer
render(siteFooterStatisticsElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);


// new LoadingView();
