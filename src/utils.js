import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  DURATION_FORMATS
} from './const.js';

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

// Функция для генерации случайного положительного числа
const getRandomPositiveNumber = (max) => Math.ceil(Math.random() * max);

// Функция для форматирования даты в указанном формате
const humanizeDate = (currentDate, format) => currentDate ? dayjs(currentDate).format(format) : '';

// Функция для вычисления продолжительности между двумя датами
const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration;

  switch (true) {
    case (diff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.days);
      break;
    case (diff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.hours);
      break;
    case (diff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.mins);
      break;
  }

  return pointDuration;
};

// Функция для инкрементации счетчика
const incrementCounter = (START_FROM) => {
  let counterStart = START_FROM;
  return function() {
    return counterStart++;
  };
};

export {
  getRandomArrayElement,
  getRandomPositiveNumber,
  humanizeDate,
  calculateDuration,
  incrementCounter
};
