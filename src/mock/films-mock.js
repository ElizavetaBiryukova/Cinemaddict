import {
  getRandomInteger
} from '../utils/common.js';

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

  // for (let i = 1; i <= 10; i = i + 0.5) {
  //   raiting.push(i);
  //   console.log(raiting);
  // }
};

export const generateFilms = () => ({
  name: generateName(),
  poster: generateImage(),
  description: generateDescription(),
  raiting: generateRaiting()
});
