import {
  commentDate
} from '../utils/film.js';
import AbstractView from './abstract.js';

const createPopupComments = (
  comments
) => {

  const commentsList = comments.map((comment) => (
    `<ul class="film-details__comments-list">
<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${commentDate(comment.date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
</ul>`

  )).join('');

  return commentsList;
};


const createEmotion = (newComment) => (
  ` <img src=${newComment.emotion} width="55" height="55" alt="emoji-smile">`
);

const createNewComments = (newComment) => (
  `<div class="film-details__new-comment">
<div class="film-details__add-emoji-label">
${newComment ? createEmotion(newComment) : ''}
</div>

<label class="film-details__comment-label">
  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
    ${newComment ? newComment.comment : ''}
  </textarea>
</label>

<div class="film-details__emoji-list">


  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
  <label class="film-details__emoji-label" for="emoji-smile">
    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
  <label class="film-details__emoji-label" for="emoji-sleeping">
    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
  <label class="film-details__emoji-label" for="emoji-puke">
    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
  </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
  <label class="film-details__emoji-label" for="emoji-angry">
    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
  </label>
</div>
</div>`
);

const createCommentTemplate = (data) => {
  const {
    comments,
    isComments,
    newComment
  } = data;
  const numberСomments = comments === false ? '0' : `${comments.length}`;

  return `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numberСomments}</span></h3>

        ${isComments ? createPopupComments(comments) : ''}

        ${createNewComments(newComment)}
      </section>`;
};


export default class FilmComments extends AbstractView {
  constructor(films) {
    super();

    this._data = FilmComments.parseFilmToData(films);

    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);
    this._commentTextHandler = this._commentTextHandler.bind(this);

    this._setInnerHandlers();


  }

  getTemplate() {
    return createCommentTemplate(this._data);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('input', this._emojiToggleHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentTextHandler);
  }

  updateData(update) {
    if(!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    // this._setCommentSubmitHandler();
  }

  _emotionToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });
  }

  _commentTextHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comments: evt.target.value,
    }, true);
  }

  static parseFilmToData(films) {

    return Object.assign({},
      films, {
        isComments: films.comments.length !== 0,
      },
    );

  }

  static parseDataToFilm(data) {

    data = Object.assign({}, data);

    if (data.isComments) {
      data.comments = [];
    }

    if (!data.newComments) {
      delete data.newComment;
    }


    delete data.isComments;

    return data;
  }
}
