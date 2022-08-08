import {
  getRandomInteger,
  // shuffleArray
} from '../utils/common.js';
import dayjs from 'dayjs';

//Автор комментария
const generateAuthor = () => {
  const authors = [
    'Ilya OReilly',
    'Elizaveta Biryukova',
    'Vladimir Belov',
    'Tatyana Lapuhina',
    'Igor Vlasov',
    'Juliya Petrosyan',
    'Oleg Morozov'
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);
  return authors[randomIndex];
};

//Комментарий
const generateComment = () => {
  const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

  const comments = comment.split('.');

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

//Дата
const generateDate = () => {
  const minutes = getRandomInteger(1, 59);
  const hours = getRandomInteger(1, 23);
  const days = getRandomInteger(-7, 30);
  const months = getRandomInteger(1, 12);
  const years = getRandomInteger(0, 50);

  return dayjs()
    .add(minutes, 'minutes')
    .add(hours, 'hours')
    .add(days, 'day')
    .add(months, 'month')
    .subtract(years, 'year')
    .toDate();
};

//Эмиоции
const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry'
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
};

export const generateComments = () => ({
  id: getRandomInteger(0, 100),
  author: generateAuthor(),
  comment: generateComment(),
  data: generateDate(),
  emotion: generateEmotion()
});

export const commentsArray = new Array(getRandomInteger(1, 5)).fill().map(generateComments);
