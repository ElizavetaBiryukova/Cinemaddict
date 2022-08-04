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
  const names = [
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/sagebrush-trail.jpg'
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

export const generateCinima = () => ({
  name: generateName(),
  poster: generateImage()
});
