import { SeatStatusEnum } from "@/enum/shared.enums";
import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { z } from "zod";

const subPassengerSchema = z.object({
  subFirstName: z.string().min(1),
  subLastName: z.string().min(1),
  subPhone: z.string().min(5),
  subEmail: z.string().email(),
});

export const passengerSchema = z.object({
  idPassenger: z.number().int().positive(),
  subPassengersList: z.array(subPassengerSchema),
});

export const busSeatSchema = z.object({
  id: z.number().int().positive(),
  passenger: z.number().int().nullable(),
  number: z.number().int().positive(),
  busSeatStatus: z.nativeEnum(SeatStatusEnum),
  routeDriverId: z.number().int().positive(),
});

export const routeStopSchema = z.object({
  id: z.number().int().positive(),
  stopName: z.string(),
  routeId: z.number().int().positive(),
});

export const busSeats: z.ZodType<IBusSeats[]> = z.array(
  z.object({
    number: z.number(),
    busSeatStatus: z.nativeEnum(SeatStatusEnum), // Використовуємо точний enum
    passenger: z.number().nullable(),
    left: z.number().optional(),
    bottom: z.number().optional(),
    top: z.number().optional(),
    right: z.number().optional(),
  })
);

export const passengersSeatsList: z.ZodType<ISubPassengersList[]> = z.array(
  z.object({
    idPassenger: z.number().refine((val) => val > 0, {
      message: "idPassenger має бути більше 0", // Кастомне повідомлення
    }),
    subPassengersList: z
      .array(
        z.object({
          subFirstName: z.string(),
          subLastName: z.string(),
          subPhone: z.string(),
          subEmail: z.string(),
        })
      )
      .max(100),
  })
);
