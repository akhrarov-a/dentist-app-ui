import { Dayjs } from 'dayjs';

/**
 * Weekdays
 */
const weekdaysRU = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

const weekdaysEN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Weekdays short
 */
const shortWeekDaysRU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const shortWeekdaysEN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const getWeekdays = (lang: string) => {
  return lang === 'ru' ? weekdaysRU : weekdaysEN;
};

export const getWeekdaysByIndex = (index: string | number, lang: string) => {
  return lang === 'ru'
    ? weekdaysRU[index as number]
    : weekdaysEN[index as number];
};

export const getWeekday = (date: Dayjs, lang: string) => {
  const day = date.day();

  return lang === 'ru' ? weekdaysRU[day] : weekdaysEN[day];
};

export const getShortWeekday = (date: Dayjs, lang: string) => {
  const day = date.day();

  return lang === 'ru' ? shortWeekDaysRU[day] : shortWeekdaysEN[day];
};

/**
 * Months
 */
const monthsRU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const monthsEN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getMonth = (date: Dayjs, lang: string) => {
  const month = date.month();

  return lang === 'ru' ? monthsRU[month] : monthsEN[month];
};

export const getMonths = (lang: string) => {
  return lang === 'ru' ? monthsRU : monthsEN;
};
