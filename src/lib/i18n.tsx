"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type Language = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (value: LocalizedText) => string;
};

const STORAGE_KEY = "yhbgroup-language";
const LANGUAGE_CHANGE_EVENT = "yhbgroup-language-change";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLanguage(): Language {
  return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";
}

function subscribeToLanguageChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

function setStoredLanguage(language: Language) {
  window.localStorage.setItem(STORAGE_KEY, language);
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore<Language>(subscribeToLanguageChange, getStoredLanguage, () => "zh");

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setStoredLanguage,
      text: (content) => content[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

export function LocalizedText({ value }: { value: LocalizedText }) {
  const { text } = useLanguage();
  return <>{text(value)}</>;
}
