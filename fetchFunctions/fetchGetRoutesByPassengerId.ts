import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { zodGetRoutesByPassengerId } from "@/zod_shema/zodGetRoutesByPassengerId";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByPassengerId<TSelect>(
  passengerId: number,
  select: TSelect
): Promise<Omit<GetRoutesByPassengerId, "isReservation">[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/getRoutesByPassengerId`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passengerId, select }),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    try {
      const res = zodGetRoutesByPassengerId.parse(data); // Валідуємо схему
      return res;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    throw new Error(`Помилка сервера:${error}`);
  }
}

export default fetchGetRoutesByPassengerId;

// id: number;
// departureDate: string;
// arrivalDate: string;
// departureFrom: string;
// arrivalTo: string;
// routePrice: number;
// driverId: number;
// busSeats: IBusSeats[];
// passengersSeatsList: ISubPassengersList[];

// departureFromCity?: string;
// arrivalToCity?: string;

//То ми получаємо GetRoutesByPassengerId
// id: 1,
// departureDate: '2025-05-11T19:30:00.000Z',
// arrivalDate: '2025-02-11T19:00:00.000Z',
// departureFrom: 'Houston',
// arrivalTo: 'San Antonio',
// routePrice: 25,
// driverId: 5
// busSeats:
// passengersSeatsList: [],
