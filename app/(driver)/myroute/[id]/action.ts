import { GetRouteById } from "@/types/route-driver.types";
import { UserSelect } from "@/types/users.types";

import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (dateArray: GetRouteById[]) => {
  return dateArray.map((route: GetRouteById) => {
    return {
      ...route,
      arrivalDate: format(route.arrivalDate, "d MMMM yyyy HH:mm", {
        locale: uk,
      }),
      departureDate: format(route.departureDate, "d MMMM yyyy HH:mm", {
        locale: uk,
      }),
    };
  });
};

export async function routeFetch(id: number) {
  try {
    // Відправка POST-запиту
    const response = await fetch("http://localhost:3000/api/getRouteById", {
      // cache: "force-cache",
      // next: { revalidate: 50 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Передаємо driverId
    });

    // console.log("QQQQQQQQQQQQQ", response);
    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    // console.log("Отримані маршрути:", data.routes);
    return data.routes as GetRouteById[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export async function getUsersFetchByIdsBySelect(
  ids: number[],
  select: UserSelect
) {
  // console.log("55555555555555555", ids, select);
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/getUsersByIdBySelect",
      {
        // cache: "force-cache",
        // next: { revalidate: 50 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids, select }), // Передаємо driverId
      }
    );

    // console.log("QQQQQQQQQQQQQ", response);
    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    // console.log("Отримані маршрути:", data.routes);
    return data; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
