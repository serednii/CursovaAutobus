"use client"; // Обов'язково для обробки помилок

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Помилка:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-bold text-red-600"> Auth Щось пішло не так! 😢</h2>
      {/* <p className="text-gray-500">{error.message}</p> */}
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Спробувати знову 🔄
      </button>
    </div>
  );
}
