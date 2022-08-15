import { createElement } from '../utils/common.js';

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


const createNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createNavigationItemTemplate(filter, index === 0))
    .join('');
  return `
  <nav class="main-navigation">
  <div class="main-navigation__items">
${filterItemsTemplate}
</div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Navigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
