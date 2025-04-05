"use client"; // Обов'язково для обробки помилок

import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { t: auth } = useAppTranslation("auth");

  useEffect(() => {
    console.error("Помилка:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-bold text-red-600"> {auth("error.error_message")} 😢</h2>

      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {auth("error.try_again")}
      </button>
    </div>
  );
}
