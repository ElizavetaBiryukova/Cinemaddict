import AbstractView from './abstract.js';
import {
  SortType
} from '../utils/const.js';

const createSortTemplate = (currentSortType) => {
  const ACTIVE_SORT_CLASS = 'sort__button--active';
  const ACTIVE_SORT_BY_DEFAULT = currentSortType === SortType.DEFAULT ? ACTIVE_SORT_CLASS : '';
  const ACTIVE_SORT_BY_DATE = currentSortType === SortType.DATE ? ACTIVE_SORT_CLASS : '';
  const ACTIVE_SORT_BY_RATING = currentSortType === SortType.RATING ? ACTIVE_SORT_CLASS : '';

  return `<ul class="sort">
    <li><a href="#" class="sort__button ${ACTIVE_SORT_BY_DEFAULT}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${ACTIVE_SORT_BY_DATE}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${ACTIVE_SORT_BY_RATING}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}
