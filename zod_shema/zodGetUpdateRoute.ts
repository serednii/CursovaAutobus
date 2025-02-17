import { SeatStatusEnum } from "@/enum/shared.enums";
import { IUpdateRouteWithId } from "@/types/route-passenger.types";
import { z } from "zod";

export const zodSchemaUpdateRouteIn: z.ZodType<IUpdateRouteWithId> = z.object({
  id: z.number(),
  busSeats: z.array(
    z.object({
      number: z.number(),
      busSeatStatus: z.nativeEnum(SeatStatusEnum), // Використовуємо точний enum
      passenger: z.number().nullable(),
      left: z.number().optional(),
      bottom: z.number().optional(),
      top: z.number().optional(),
      right: z.number().optional(),
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

export const zodSchemaUpdateRouteRes = z.object({
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
