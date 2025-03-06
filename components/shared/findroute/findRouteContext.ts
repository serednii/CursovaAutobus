import { createContext } from "react";

// Інтерфейс для контексту
interface PropsContext {
  isLoadingOne: boolean;
  setIsLoadingMany: (value: boolean) => void;
}

// Створення контексту зі значенням за замовчуванням
export const FindRouteContext = createContext<PropsContext>({
  isLoadingOne: false, // Значення за замовчуванням
  setIsLoadingMany: () => {},
});
