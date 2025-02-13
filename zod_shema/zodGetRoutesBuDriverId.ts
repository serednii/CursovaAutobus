import { z } from "zod";

export const zodSchemaGetRoutesBuDriverId = z.object({
  bookedSeats: z.number().int().nonnegative(), // Кількість заброньованих місць (ціле невід'ємне число)
  maxSeats: z.number().int().positive(), // Максимальна кількість місць (ціле позитивне число)
  id: z.number().int().positive(), // ID маршруту (ціле позитивне число)
  departureDate: z.string().datetime(), // Дата відправлення у форматі ISO
  arrivalDate: z.string().datetime(), // Дата прибуття у форматі ISO
  departureFrom: z.string().min(1), // Місто відправлення (мінімум 1 символ)
  arrivalTo: z.string().min(1), // Місто прибуття (мінімум 1 символ)
  routePrice: z.number().positive(), // Ціна маршруту (позитивне число)
});
