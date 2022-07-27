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

import {createFilmDetailsTemplate} from './view/film-details.js';


const FILMS_COUNT = 5;
const EXTRA_FILMS = 2;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

//header
render(siteHeaderElement, createRatingTemplate(), 'beforeend');

//menu
render(siteMainElement, createNavigationTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');

//films
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const flimsElement = siteMainElement.querySelector('.films');
render(flimsElement, createFilmsListTemplate(), 'beforeend');

const flimsListElement = siteMainElement.querySelector('.films-list');

const flimsListContainerElement = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT; i++) {
  render(flimsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(flimsListElement, createShowMoreTemplate(), 'beforeend');

render(flimsElement, createFilmsListExtraTemplate('Top rated'), 'beforeend');
render(flimsElement, createFilmsListExtraTemplate('Most commented'), 'beforeend');
const filmsExtraListContainer = [...flimsElement.querySelectorAll('.films-list--extra')];

filmsExtraListContainer.forEach((item) => {
  const container = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS; i++) {
    render(container, createFilmCardTemplate(), 'beforeend');
  }
});

//footer
render(siteFooterStatisticsElement, createStatisticsTemplate(), 'beforeend');

//details
render(siteFooterElement, createFilmDetailsTemplate(), 'afterend');
