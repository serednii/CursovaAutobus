"use client";

import { createContext, ReactNode, useContext } from "react";
// import { useTranslation as useTranslationBase } from "react-i18next";
import { Namespace, TranslationKey } from "@/types/translations";
// Підтримувані простори імен

// Тип функції перекладу
export type TranslationFunction = <T extends Namespace>(
  namespace: T,
  key: TranslationKey<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
) => string;

export const TranslationsContext = createContext<
  | {
      t: TranslationFunction;
      locale: string;
    }
  | undefined
>(undefined);

// Пропси для провайдера
// type Resources = Record<string, Record<string, string>>;
export interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: Namespace[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources: any;
}

// Компонент-провайдер
export default function TranslationsProvider({
  children,
  locale,
  resources,
}: TranslationsProviderProps) {
  // Створюємо функцію перекладу

  const t: TranslationFunction = (namespace, key) => {
    const fullKey = typeof key === "string" ? key : (key as string);
    const parts = fullKey.split(".");
    let current = resources[locale]?.[namespace];

    for (const part of parts) {
      if (current?.[part] === undefined) return fullKey; // або просто key
      current = current[part];
    }

    return typeof current === "string" ? current : fullKey;
  };

  return (
    <TranslationsContext.Provider value={{ t, locale }}>{children}</TranslationsContext.Provider>
  );
}

function useAppTranslation(namespace: Namespace) {
  const context = useContext(TranslationsContext);

  if (context === undefined) {
    throw new Error("useAppTranslation must be used within a TranslationsProvider");
  }

  // Повертаємо функцію t, яка автоматично використовує вказаний namespace
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: <K extends TranslationKey<typeof namespace>>(key: K, options?: Record<string, any>) =>
      context.t(namespace, key, options),
    locale: context.locale,
  };
}

export { useAppTranslation };
