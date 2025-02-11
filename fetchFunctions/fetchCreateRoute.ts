import { z } from "zod";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const routeDriverSchema = z.object({
  arrivalDate: z.string().datetime(),
  arrivalTo: z.string(),
  bookedSeats: z.number().int().nonnegative(),
  busNumber: z.string(),
  coffee: z.boolean(),
  createdAt: z.string().datetime(),
  departureDate: z.string().datetime(),
  departureFrom: z.string(),
  driverId: z.number().int().positive(),
  id: z.number().int().positive(),
  maxSeats: z.number().int().positive(),
  modelBus: z.string(),
  notate: z.string(),
  power: z.boolean(),
  restRoom: z.boolean(),
  routePrice: z.number().positive(),
  selectBusLayout: z.string(),
  wifi: z.boolean(),
});

const routeStopSchema = z.object({
  id: z.number().int().positive(),
  stopName: z.string(),
  routeId: z.number().int().positive(),
});

const busSeatSchema = z.object({
  id: z.number().int().positive(),
  passenger: z.number().int().positive().nullable(),
  number: z.number().int().positive(),
  busSeatStatus: z.enum(["available", "reserved", "occupied"]),
  routeDriverId: z.number().int().positive(),
});

const responseSchema = z.object({
  routeDriver: routeDriverSchema,
  resultIntermediateStops: z.array(routeStopSchema),
  resultBusSeats: z.array(busSeatSchema),
});

const fetchCreateRoute = async <T>(data: T): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/createroute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Якщо сервер повертає помилку (код статусу не 2xx)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    const validatedRes = responseSchema.parse(res);
    return validatedRes;
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    // Можливо, повернути значення за замовчуванням або null
    throw new Error("Failed to fetch data", error as Error);
  }
};

export default fetchCreateRoute;

// const res = {
//   routeDriver: {
//     arrivalDate: "2025-02-14T11:45:00.000Z",
//     arrivalTo: "London",
//     bookedSeats: 3,
//     busNumber: "intersiti Moskva London",
//     coffee: true,
//     createdAt: "2025-02-11T21:26:38.479Z",
//     departureDate: "2025-02-13T21:15:00.000Z",
//     departureFrom: "Дрогобич",
//     driverId: 1,
//     id: 70,
//     maxSeats: 35,
//     modelBus: "Bus 4",
//     notate: "This is a comfortable route.",
//     power: true,
//     restRoom: true,
//     routePrice: 456,
//     selectBusLayout: "3",
//     wifi: true,
//   },

//   routeStops: [
//     { id: 68, stopName: "lvov", routeId: 70 },
//     { id: 67, stopName: "stop2", routeId: 70 },
//   ],

//   resultBusSeats: [
//     {
//       id: 1562,
//       passenger: null,
//       number: 3,
//       busSeatStatus: "available",
//       routeDriverId: 70,
//     },

//     {
//       id: 1531,
//       passenger: null,
//       number: 7,
//       busSeatStatus: "available",
//       routeDriverId: 70,
//     },

//     {
//       id: 1563,
//       passenger: null,
//       number: 11,
//       busSeatStatus: "available",
//       routeDriverId: 70,
//     },
//   ],
// };
