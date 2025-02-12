import { SeatStatusEnum } from "@/enum/shared.enums";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { z } from "zod";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Схема валідації одного маршруту

// Схема для місця в автобусі
const busSeatSchema = z.object({
  id: z.number().int().positive(),
  passenger: z.number().int().nullable(),
  number: z.number().int().positive(),
  busSeatStatus: z.enum([
    SeatStatusEnum.AVAILABLE,
    SeatStatusEnum.RESERVED,
    SeatStatusEnum.SELECTED,
  ]),
  routeDriverId: z.number().int().positive(),
});

// Схема для субпасажира
const subPassengerSchema = z.object({
  subFirstName: z.string().min(1),
  subLastName: z.string().min(1),
  subPhone: z.string().min(5),
  subEmail: z.string().email(),
});

// Схема для основного пасажира
const passengerSchema = z.object({
  idPassenger: z.number().int().positive(),
  subPassengersList: z.array(subPassengerSchema),
});

// Схема для маршруту
const routeSchema = z.object({
  id: z.number().int().positive(),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
});

// Схема для масиву маршрутів
const routesSchema = z.array(routeSchema);
// Схема валідації масиву маршрутів

async function fetchGetRoutesByPassengerId<TSelect>(
  passengerId: number,
  select: TSelect
): Promise<GetRoutesByPassengerId[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/getRoutesByPassengerId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passengerId, select }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    const res = routesSchema.parse(data); // Валідуємо схему
    console.log("Отримані маршрути:", res);
    return res;
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchGetRoutesByPassengerId;
