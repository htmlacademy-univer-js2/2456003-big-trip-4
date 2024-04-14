import {
  DESCRIPTIONS,
  MAX_IMAGES_COUNT,
} from '../const.js';

import {
  getRandomArrayElement,
  getRandomPositiveNumber
} from '../utils.js';


const generateDestination = (city) => {
  return ({
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: city,
    pictures: Array.from({
      length: getRandomPositiveNumber(MAX_IMAGES_COUNT)
    }, () => ({
      'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }))
  });
};

export {
  generateDestination,
};
