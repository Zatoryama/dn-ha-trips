'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Language, TranslationDictionary } from './types';
import { en } from './en';
import { vi } from './vi';

const dictionaries: Record<Language, TranslationDictionary> = { en, vi };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved === 'en' || saved === 'vi') {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      // Try current language
      let result: unknown = dictionaries[lang];
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = (result as Record<string, unknown>)[k];
        } else {
          result = undefined;
          break;
        }
      }
      if (typeof result === 'string') return result;

      // Fallback to English
      let fallback: unknown = dictionaries.en;
      for (const k of keys) {
        if (fallback && typeof fallback === 'object' && k in fallback) {
          fallback = (fallback as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof fallback === 'string' ? fallback : key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
