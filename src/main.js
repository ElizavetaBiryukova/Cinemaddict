import {
  createRatingTemplate
} from './view/rating.js';
import {
  createNavigationTemplate
} from './view/navigation.js';
import {
  createSortTemplate
} from './view/sort.js';
import {
  createFilmsTemplate
} from './view/films.js';
import {
  createFilmsListTemplate
} from './view/films-list.js';
import {
  createFilmCardTemplate
} from './view/film-card.js';
import {
  createShowMoreTemplate
} from './view/show-more.js';
import {
  createFilmsListExtraTemplate
} from './view/films-list-extra.js';
import {
  createStatisticsTemplate
} from './view/statistics.js';
import {
  createFilmDetailsTemplate
} from './view/film-details.js';
import {
  generateFilms
} from './mock/films-mock.js';
import {
  generateFilter
} from './utils/filter.js';
import {
  renderTemplate
} from './utils/common.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filters = generateFilter(films);
// console.log(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

//header
renderTemplate(siteHeaderElement, createRatingTemplate(), 'beforeend');

//menu
renderTemplate(siteMainElement, createNavigationTemplate(filters), 'beforeend');
renderTemplate(siteMainElement, createSortTemplate(), 'beforeend');

//films
renderTemplate(siteMainElement, createFilmsTemplate(), 'beforeend');

const flimsElement = siteMainElement.querySelector('.films');
renderTemplate(flimsElement, createFilmsListTemplate(), 'beforeend');

const flimsListElement = siteMainElement.querySelector('.films-list');

const flimsListContainerElement = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(flimsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderFilmsCount = FILMS_COUNT_PER_STEP;
  renderTemplate(flimsListElement, createShowMoreTemplate(), 'beforeend');

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

renderTemplate(flimsElement, createFilmsListExtraTemplate('Top rated'), 'beforeend');
renderTemplate(flimsElement, createFilmsListExtraTemplate('Most commented'), 'beforeend');
const filmsExtraListContainer = [...flimsElement.querySelectorAll('.films-list--extra')];

filmsExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS; i++) {
    renderTemplate(container, createFilmCardTemplate(films[i]), 'beforeend');
  }
});

//footer
renderTemplate(siteFooterStatisticsElement, createStatisticsTemplate(), 'beforeend');

//details
renderTemplate(siteFooterElement, createFilmDetailsTemplate(films[0]), 'afterend');
