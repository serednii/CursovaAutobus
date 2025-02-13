import { zodSchemaGetRoutesBuDriverId } from "@/zod_shema/zodGetRoutesBuDriverId";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByDriverId(driverId: number) {
  try {
    // Відправка POST-запиту
    const response = await fetch(`${API_URL}/api/getRoutesByDriverId`, {
      // cache: "force-cache",
      next: { revalidate: 50 },
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
    const data: unknown = await response.json();

    const res = zodSchemaGetRoutesBuDriverId.array().parse(data);
    // console.log("Отримані маршрути:", data.routes);
    return res; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchGetRoutesByDriverId;
