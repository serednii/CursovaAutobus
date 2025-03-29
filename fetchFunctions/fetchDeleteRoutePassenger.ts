import { getBusSeatsPassenger } from "@/app/[locale]/(passenger)/mybookings/action";
import { ApiResponse, SuccessResponse, ErrorResponse } from "@/types/response.types";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IDeleteRoutePassenger } from "@/types/route-passenger.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchDeleteRoutePassenger(deleteRouteIdData: IDeleteRoutePassenger): Promise<ApiResponse> {
  try {
    const { busSeats, idPassenger } = deleteRouteIdData;
    const newBusSeats = getBusSeatsPassenger(busSeats, idPassenger);

    const newDeleteRouteIdData = { ...deleteRouteIdData, busSeats: newBusSeats };

    // Відправка DELETE-запиту
    const response = await fetch(`${API_URL}/api/deletePassengerSeatsList`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeleteRouteIdData), // Передаємо дані для видалення
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Обробка відповіді
    const data: GetRoutesByDriverId[] = await response.json();
    console.log("Отримані маршрути fetchDeleteRoutePassenger:", data);

    // Повертаємо успішну відповідь
    const successResponse: SuccessResponse = {
      message: "Пасажир успішно видалений",
    };
    return successResponse;
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);

    // Повертаємо помилкову відповідь
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : "Невідома помилка",
    };
    return errorResponse;
  }
}

export default fetchDeleteRoutePassenger;
