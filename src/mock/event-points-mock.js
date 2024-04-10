import { EVENT_TYPES, MAX_PRICE_VALUE, CITIES } from '../const.js';
import { getRandomArrayElement, getRandomPositiveNumber } from '../utils.js';

// Определяем функцию для генерации моковой точки события
const generateMockEventPoint = () => {
  const randomType = getRandomArrayElement(EVENT_TYPES); // Случайный тип события
  const randomCityIndex = getRandomPositiveNumber(CITIES.length); // Случайный индекс города из списка

  return {
    basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE), // Случайная цена
    dateFrom: new Date(Date.now() + Math.random() * 1000000000), // Случайная дата начала события в будущем
    dateTo: new Date(Date.now() + Math.random() * 2000000000), // Случайная дата окончания события в будущем
    destination: CITIES[randomCityIndex], // Случайный город
    isFavorite: Math.random() < 0.5, // Случайное булевое значение для избранного
    offers: [ '1', '2' ], // Предложения (в данном случае - значения по умолчанию)
    type: randomType // Тип события
  };
};

// Генерируем массив моковых точек событий
const mockEventPoints = Array.from({ length: 5 }, generateMockEventPoint);

// Определяем функцию для получения случайной точки события из моковых данных
const getRandomEventPoint = () => getRandomArrayElement(mockEventPoints);

export { getRandomEventPoint };
