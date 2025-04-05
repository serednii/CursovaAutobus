"use client";

import { createContext, ReactNode, useContext } from "react";
// import { useTranslation as useTranslationBase } from "react-i18next";
import { Namespace, TranslationKey } from "@/types/translations";
// Підтримувані простори імен

// Тип функції перекладу
type TranslationFunction = <T extends Namespace>(
  namespace: T,
  key: TranslationKey<T>,
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
export interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: Namespace[];
  resources: any;
}

// Компонент-провайдер
export default function TranslationsProvider({
  children,
  locale,
  resources,
}: TranslationsProviderProps) {
  // Створюємо функцію перекладу
  const t: TranslationFunction = (namespace, key, options) => {
    // options = options || {};
    // Для вкладених ключів (наприклад, 'select_role.driver.title')

    if (typeof key === "string" && key.includes(".")) {
      // Якщо ключ уже має формат 'namespace:key', не додаємо namespace
      if (key.includes(":")) {
        return resources[locale]?.[namespace]?.[key] || key;
      }
      return resources[locale]?.[namespace]?.[key] || key;
    }

    // Для простих ключів
    return resources[locale]?.[namespace]?.[key as string] || (key as string);
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
    t: <K extends TranslationKey<typeof namespace>>(key: K, options?: Record<string, any>) =>
      context.t(namespace, key, options),
    locale: context.locale,
  };
}

export { useAppTranslation };
