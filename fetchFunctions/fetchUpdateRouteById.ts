import { SeatStatusEnum } from "@/enum/shared.enums";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IUpdateRouteWithId } from "@/types/route-passenger.types";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Оновлений Zod-схема для відповідності IUpdateRouteWithId

const schemaUpdateRouteIn: z.ZodType<IUpdateRouteWithId> = z.object({
  idRoute: z.number(),
  busSeats: z.array(
    z.object({
      number: z.number(),
      busSeatStatus: z.nativeEnum(SeatStatusEnum), // Використовуємо точний enum
      passenger: z.number().nullable(),
      left: z.string().optional(),
      bottom: z.string().optional(),
      top: z.string().optional(),
      right: z.string().optional(),
    })
  ),
  bookedSeats: z.number().min(1).max(50),
  passengersSeatsList: z.array(
    z.object({
      idPassenger: z.number(),
      subPassengersList: z
        .array(
          z.object({
            subFirstName: z.string(),
            subLastName: z.string(),
            subPhone: z.string(),
            subEmail: z.string(),
          })
        )
        .min(1)
        .max(100),
    })
  ),
});

const schemaUpdateRouteRes = z.object({
  message: z.string(),
  res: z.object({
    arrivalDate: z.string(),
    arrivalTo: z.string(),
    bookedSeats: z.number(),
    busNumber: z.string(),
    coffee: z.boolean(),
    createdAt: z.string(),
    departureDate: z.string(),
    departureFrom: z.string(),
    driverId: z.number(),
    id: z.number(),
    maxSeats: z.number(),
    modelBus: z.string(),
    notate: z.string(),
    power: z.boolean(),
    restRoom: z.boolean(),
    routePrice: z.number(),
    selectBusLayout: z.string(),
    wifi: z.boolean(),
  }),
});

async function fetchUpdateRouteById(updateRouteById: IUpdateRouteWithId) {
  try {
    // const updateRouteByIdParsed = schemaUpdateRouteIn.parse(updateRouteById);
    const response = await fetch(`${API_URL}/api/updateRouteById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRouteById),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      throw new Error(errorData.error || "Невідома помилка");
    }

    const data = await response.json();
    // console.log("Отриманий маршрут:", data);

    try {
      const parsedData = schemaUpdateRouteRes.parse(data);
      console.log("Отриманий маршрут:", parsedData);
      return parsedData;
    } catch (parseError: unknown) {
      console.error("Помилка парсингу даних:", parseError);
      throw new Error(
        parseError instanceof Error
          ? parseError.message
          : "Помилка парсингу даних"
      );
    }
  } catch (error: unknown) {
    console.error("Помилка під час виконання запиту:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Помилка під час виконання запиту"
    );
  }
}

export default fetchUpdateRouteById;
