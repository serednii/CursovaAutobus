import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import React from "react";
import { authConfig } from "@/configs/auth";
import { Routes } from "@/components/shared/driver/testData";
import { getServerSession } from "next-auth/next";

async function routeFetch(driverId) {
  try {
    // Відправка POST-запиту
    const response = await fetch("http://localhost:3000/api/getroute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driverId }), // Передаємо driverId
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    console.log("Отримані маршрути:", data.routes);
    return data.routes; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default async  function MyRoutes() {
  const session = await getServerSession(authConfig);
  const driverId:number| undefined = session?.user.firstName}

routeFetch(driverId).then((routes) => {
  if (routes) {
    console.log("Маршрути для водія:", routes);
  } else {
    console.log("Маршрутів не знайдено або виникла помилка.");
  }
});

  return (
    <div>
      <AvailableRoutes routes={Routes} />

      <PastRotes routes={Routes} />
    </div>
  );
}




