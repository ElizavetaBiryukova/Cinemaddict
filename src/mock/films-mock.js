import {
  getRandomInteger, shuffleArray
} from '../utils/common.js';
import dayjs from 'dayjs';


//Название фильма
const generateName = () => {
  const names = [
    'A Little Pony Without The Carpet',
    'Sagebrush Trail',
    'The Dance of Life',
    'The Man with the Golden Arm',
    'The Great Flamarion'
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

// Изображение фильма
const generateImage = () => {
  const images = [
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/sagebrush-trail.jpg'
  ];

  const randomIndex = getRandomInteger(0, images.length - 1);

  return images[randomIndex];
};

//Описание фильмов
const generateDescription = () => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

  const descriptionArray = description.split('.');

  const randomIndex = getRandomInteger(0, descriptionArray.length - 1);

  return descriptionArray[randomIndex];
};

// Рейтинг
const generateRaiting = () => {
  const raiting = [];

  for (let i = 1; i <= 10; i = i + 0.1) {
    raiting.push(i.toFixed(1));
  }
  const randomIndex = getRandomInteger(0, raiting.length - 1);

  return raiting[randomIndex];
};

//Режиссер
const generateDirectors = () => {
  const directors = [
    'Dodo Abashidze',
    'Mairzee Almas',
    'Rod Amateau',
    'Asia Argento',
    'Dev Anand'
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

//Сценаристы
const generateWriters = () => {
  const writers = [
    'Jay Bauman',
    'Michael Bay',
    'Nora Ephron',
    'Menahem Golan',
    'Paul Lieberstein'
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

//Актеры
const generateActors = () => {
  const actorsArray = [
    'Jay Bauman',
    'Michael Bay',
    'Nora Ephron',
    'Menahem Golan',
    'Paul Lieberstein'
  ];

  return shuffleArray(actorsArray);
};


//Дата производства
const generateDate = () => {
  const days = getRandomInteger(-7, 7);
  const months = getRandomInteger(1, 12);
  const years = getRandomInteger(0, 50);

  return dayjs()
    .add(days, 'day')
    .add(months, 'month')
    .subtract(years, 'year')
    .toDate();
};


export const generateFilms = () => ({
  name: generateName(),
  poster: generateImage(),
  description: generateDescription(),
  raiting: generateRaiting(),
  director: generateDirectors(),
  writers: generateWriters(),
  actors: generateActors(),
  date: generateDate(),
  // duration:
});
