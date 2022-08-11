/*eslint-disable */
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);
import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//перемешивает массив
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//dayjs
//Дата релиза фильма в карточке фильма
export const realeaseYear = (date)  => dayjs(date).format('YYYY');
// Дата комментария в попупе фильма
export const commentDate = (date) => dayjs(date).calendar(null, {
  sameDay: '[Today]',
  lastDay: '[Yesterday at ] h:mm',
  sameElse: 'YYYY/MM/DD'
});
// Полная дата релиза фильма
export const releaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
