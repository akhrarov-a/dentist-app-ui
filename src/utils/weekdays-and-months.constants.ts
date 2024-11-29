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

export const getWeekday = (date: Dayjs, lang: string) => {
  const day = date.day();

  return lang === 'ru' ? weekdaysRU[day] : weekdaysEN[day];
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
