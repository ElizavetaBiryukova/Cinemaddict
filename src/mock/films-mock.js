import dayjs from 'dayjs';
import {
  getRandomInteger,
  shuffleArray
} from '../utils/common.js';
import {
  commentsArray
} from './comments-mock.js';


//Название фильма
const generateTitle = () => {
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
const generateRating = () => {
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

  return shuffleArray(writers);
};

//Актеры
const generateActors = () => {
  const actors = [
    'Jay Bauman',
    'Michael Bay',
    'Nora Ephron',
    'Menahem Golan',
    'Paul Lieberstein'
  ];

  return shuffleArray(actors);
};


//Дата производства
const generateDate = () => {
  const days = getRandomInteger(-7, 30);
  const months = getRandomInteger(1, 12);
  const years = getRandomInteger(0, 50);

  return dayjs()
    .add(days, 'day')
    .add(months, 'month')
    .subtract(years, 'year')
    .toDate();
};

//Продолжительность
const generateRuntime = () => getRandomInteger(20, 250);

//Страна
const generateCountry = () => {
  const countries = [
    'Brazil',
    'British Indian Ocean Territory (the)',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands (the)',
    'Central African Republic (the)',
    'Chad',
    'Chile',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

//Жанры
const generateGenre = () => {
  const genres = [
    'Drama',
    'Mystery',
    'Comedy',
    'Western',
    'Musical'
  ];

  return shuffleArray(genres);
};


//Возрастной рейтинг
const generateAgeRating = () => {
  const ages = [
    0,
    12,
    16,
    18
  ];

  const randomIndex = getRandomInteger(0, ages.length - 1);

  return ages[randomIndex];
};

//Дата просмотра
const generateWatchingDate = () => {
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

//Комментарий
const generateFilmComments = () => {
  const shuffledComments = shuffleArray(commentsArray);
  const randomIndex = getRandomInteger(1, 5);
  return shuffledComments.slice(0, randomIndex);
};

export const generateFilms = () => {
  const hasComments = Boolean(getRandomInteger(0, 1));
  const comments = hasComments === false ? false : generateFilmComments();
  return {
    id: getRandomInteger(0, 100),
    comments,
    filmInfo: {
      title: generateTitle(),
      alternativeTitle: generateTitle(),
      rating: generateRating(),
      poster: generateImage(),
      ageRating: generateAgeRating(),
      director: generateDirectors(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateDate(),
        country: generateCountry(),
      },
      runtime: generateRuntime(),
      genre: generateGenre(),
      description: generateDescription()
    },
    userDetails: {
      watchlist: !!getRandomInteger(0, 1),
      alreadyWatched: !!getRandomInteger(0, 1),
      watchingDate: generateWatchingDate(),
      favorite: !!getRandomInteger(0, 1)
    }
  };
};
