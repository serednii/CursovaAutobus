import { prisma } from "@/prisma/prisma-client";
import { IBusSeats } from "@/types/interface";

export async function updatedBusSeats(busSeats: IBusSeats[], idRoute: number) {
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

    return updatedBusSeats;
  } catch (error) {
    console.error("Error updating bus seats:", error);
    return null;
  }
}
