import { createContext } from "react";

// Інтерфейс для контексту
interface PropsContext {
  // isLoadingOne: boolean;
  // setIsLoadingOne: (value: boolean) => void;
}

// Створення контексту зі значенням за замовчуванням
export const CreateRouteContext = createContext<PropsContext>({
  // isLoadingOne: false, // Значення за замовчуванням
  // setIsLoadingOne: () => {},
});
