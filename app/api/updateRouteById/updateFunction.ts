import { prisma } from "@/prisma/prisma-client";
import { params } from "@/types/layoutbus.types";

export async function updatedBusSeats(busSeats: params[], idRoute: number) {
  try {
    await Promise.all(
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
  } catch (error) {
    console.error("Error updating bus seats:", error);
    throw new Error("Failed to update bus seats");
  }
}
