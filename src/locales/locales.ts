import { useCallback } from 'react';
import { useStore } from '@store';
import locales from './locales.json';

/**
 * Translations
 */
export const translations = locales;

/**
 * TranslationFunctionType
 */
export type TranslationFunctionType = (
  key: string,
  value?: Record<string, string | number>
) => string;

/**
 * Languages
 */
export enum Languages {
  EN = 'en',
  RU = 'ru'
}

/**
 * Use locale options
 */
const useLocaleOptions = () => [
  {
    id: Languages.EN,
    name: Languages.EN
  },
  {
    id: Languages.RU,
    name: Languages.RU
  }
];

/**
 * Replace with value
 */
const replaceWithValue = (
  value: Record<string, string | number>,
  locale: string
) => {
  let string = locale;

  for (let valueKey in value) {
    string = string.replace(`{{${valueKey}}}`, `${value[valueKey]}`);
  }

  return string;
};

/**
 * Use Locales
 */
const useLocales = () => {
  const { language } = useStore();

  const languages = useLocaleOptions();

  const t = useCallback<TranslationFunctionType>(
    (key, value) => {
      const translation: any = [translations]
        .concat(key.split('.') as any)
        .reduce((a, b) => a?.[b as never]);

      const localized = translation?.[language];

      if (typeof localized !== 'string') {
        return key;
      }

      if (value) return replaceWithValue(value, localized);

      return localized;
    },
    [language, translations]
  );

  return {
    t,
    languages
  };
};

export { useLocales, useLocaleOptions };
