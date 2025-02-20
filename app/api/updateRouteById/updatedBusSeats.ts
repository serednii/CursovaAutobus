import { prisma } from "@/prisma/prisma-client";
import { IBusSeats } from "@/types/interface";
import { NextResponse } from "next/server";

export async function updatedBusSeats(busSeats: IBusSeats[], idRoute: number): Promise<any> {
  try {
    const updatedBusSeats = await Promise.all(
      busSeats.map(async (busSeat) => {
        const seat = await prisma.busSeat.findFirst({
          where: {
            routeDriverId: idRoute,
            number: busSeat.number,
          },
        });
        // console.log("updatedBusSeats seat", seat);
        //перевірти zod

        if (seat) {
          //перевірти zod

          return await prisma.busSeat.update({
            where: {
              id: seat.id, // Використовуємо первинний ключ
            },
            data: {
              passenger: busSeat.passenger,
              busSeatStatus: busSeat.busSeatStatus,
            },
          });
        }
        return null;
      })
    );
    // console.log("updatedBusSeats", updatedBusSeats);

    // console.log(
    //   "updatedBusSeats",
    //   updatedBusSeats.every((seat) => seat !== null)
    // );

    return updatedBusSeats.every((seat) => seat !== null);
  } catch (error) {
    console.error("Error updating bus seats:", error);
    return null;
  }
}
