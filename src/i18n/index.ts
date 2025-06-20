import es from './es.json';
import en from './en.json';

export type Lang = string;

type Translations = Record<string, string>;

const translations: Record<Lang, Translations> = {
  es,
  en
};

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations['es'][key] ?? key;
}
