/*eslint-disable */
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);
import dayjs from 'dayjs';


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
