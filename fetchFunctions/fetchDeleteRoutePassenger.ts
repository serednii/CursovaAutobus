import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IDeleteRoutePassenger } from "@/types/route-passenger.types";

async function fetchDeleteRoutePassenger(
  updateRouteById: IDeleteRoutePassenger
) {
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/deletePassengerSeatsList",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRouteById), // Передаємо driverId
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
    console.log("Отримані маршрути/*-/*-/*-*/-*/-*/-*:", data);
    return data as GetRoutesByDriverId[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchDeleteRoutePassenger;
