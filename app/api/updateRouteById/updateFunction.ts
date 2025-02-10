import { prisma } from "@/prisma/prisma-client";
import { IBusSeats } from "@/types/interface";

export async function updatedBusSeats(
  busSeats: IBusSeats[],
  idRoute: number
): Promise<any> {
  try {
    const updatedBusSeats = await Promise.all(
      busSeats.map(async (busSeat) => {
        const seat = await prisma.busSeat.findFirst({
          where: {
            routeDriverId: idRoute,
            number: busSeat.number,
          },
        });

        if (seat) {
          await prisma.busSeat.update({
            where: {
              id: seat.id, // Використовуємо первинний ключ
            },
            data: {
              passenger: busSeat.passenger,
              busSeatStatus: busSeat.busSeatStatus,
            },
          });
        }
      })
    );

    return updatedBusSeats;
  } catch (error) {
    console.error("Error updating bus seats:", error);
    throw new Error("Failed to update bus seats");
  }
}
