import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import React from "react";
import { authConfig } from "@/configs/auth";
import { Routes } from "@/components/shared/driver/testData";
import { getServerSession } from "next-auth/next";

async function routeFetch(driverId: any) {
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
    // console.log("Отримані маршрути:", data.routes);
    return data.routes; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default async function MyRoutes() {
  const session = await getServerSession(authConfig);

  const driverId: number | undefined = session?.user.id;
  console.log("ID водія:", session);

  if (!driverId) return null;

  const routes = (await routeFetch(8)) || [];
  console.log("****************************");
  console.log("lengthRoutes", routes);

  const newDate = new Date().getTime();

  const pastRoutes = routes.filter(
    (route) => new Date(route.arrivalDate).getTime() < newDate
  );
  console.log("length pastRoutes", pastRoutes.length);

  const availableRoutes = routes.filter(
    (route) => new Date(route.arrivalDate).getTime() > newDate
  );
  console.log("length availableRoutes", availableRoutes.length);
  console.log("****************************");

  return (
    <div>
      <AvailableRoutes routes={availableRoutes} />
      <PastRotes routes={pastRoutes} />
    </div>
  );
}
