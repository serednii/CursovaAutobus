import { GetRoutesByDriverId } from "@/types/route-driver.types";

async function fetchGetRoutesByDriverId(driverId: number) {
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/getRoutesByDriverId",
      {
        // cache: "force-cache",
        next: { revalidate: 50 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverId }), // Передаємо driverId
      }
    );

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    // console.log("Отримані маршрути:", data.routes);
    return data.routes as GetRoutesByDriverId[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchGetRoutesByDriverId;
