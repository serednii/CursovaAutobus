import { getBusSeatsPassenger } from "@/app/(passenger)/mybookings/action";
import { ApiResponse, SuccessResponse, ErrorResponse } from "@/types/response.types";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IDeleteRoutePassenger } from "@/types/route-passenger.types";
import { allParametersRoute } from "@/zod_shema/zodBase";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchDeleteRouteById(routeId: number) {
  try {
    console.log("fetchDeleteRouteById", routeId);
    // Відправка DELETE-запиту
    const response = await fetch(`${API_URL}/api/deleteroute`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ routeId }), // Передаємо дані для видалення
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Обробка відповіді
    const data: unknown = await response.json();
    console.log("Отримані маршрути:", data);
    try {
      z.object(allParametersRoute).parse(data);
      const successResponse: SuccessResponse = {
        message: "Пасажир успішно видалений",
      };
      return successResponse;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }

    // // Повертаємо успішну відповідь
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);

    // Повертаємо помилкову відповідь
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : "Невідома помилка",
    };
    return errorResponse;
  }
}

export default fetchDeleteRouteById;
// const deletedRoute = {
//   id: 109,
//   createdAt: "2025-02-27T17:56:33.788Z",
//   driverId: 1,
//   departureDate: "2025-02-27T23:00:00.000Z",
//   arrivalDate: "2025-03-01T17:30:00.000Z",
//   departureFrom: "Moskov",
//   arrivalTo: "London",
//   busNumber: "33456",
//   maxSeats: 19,
//   bookedSeats: 0,
//   selectBusLayout: "0",
//   routePrice: 456,
//   notate: "This is a comfortable route.",
//   wifi: true,
//   coffee: true,
//   power: true,
//   restRoom: true,
//   modelBus: "Bus 1",
// };
