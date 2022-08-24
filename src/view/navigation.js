import AbstractView from './abstract.js';

const removesCount = (name, count) => {
  if (name === 'All moves') {
    return '';
  } else {
    return `<span class="main-navigation__item-count">${count}</span>`;
  }
};

const createNavigationItemTemplate = (filters, oncklick) => {
  const {
    name,
    count
  } = filters;

  return `<a href="#${name}" class="main-navigation__item ${oncklick ? 'main-navigation__item--active' : ''}">${name} ${removesCount(name, count)}</a>`;
};


export const createNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createNavigationItemTemplate(filter, index === 0))
    .join('');
  return `<div>
  <nav class="main-navigation">
  <div class="main-navigation__items">
  ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  </div>`;
};

export default class Navigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }
}
