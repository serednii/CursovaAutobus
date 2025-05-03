import { getBusSeatsPassenger } from "@/app/[locale]/(passenger)/mybookings/action";
import { ApiResponse, SuccessResponse, ErrorResponse } from "@/types/response.types";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IDeleteRoutePassenger } from "@/types/route-passenger.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function updateRoutePassenger(
  deleteRouteIdData: IDeleteRoutePassenger
): Promise<ApiResponse> {
  try {
    const { busSeats, idPassenger, routeDriverId } = deleteRouteIdData;
    const newBusSeats = getBusSeatsPassenger(busSeats, idPassenger);

    const newDeleteRouteIdData = { ...deleteRouteIdData, busSeats: newBusSeats };

    // Відправка DELETE-запиту
    const response = await fetch(`${API_URL}/api/v1/routes/passengers/${routeDriverId}`, {
      // const response = await fetch(`${API_URL}/api/v1/passengers`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify(newDeleteRouteIdData), // Передаємо дані для видалення
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Обробка відповіді
    const data: GetRoutesByDriverId[] = await response.json();

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

export default updateRoutePassenger;
