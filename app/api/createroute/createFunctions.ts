import handleError from "@/lib/handleError";
import { prisma } from "@/prisma/prisma-client";
import {
  IBusSeats,
  IPassengersSeatsList,
  ISubPassengersList,
} from "@/types/interface";

export async function createIntermediateStops(
  intermediateStops: string[],
  routeId: number
) {
  try {
    await Promise.all(
      intermediateStops.map((stop) =>
        prisma.intermediateStop.create({
          data: {
            stopName: stop,
            routeId,
          },
        })
      )
    );
  } catch (error) {
    handleError(error, "Error creating intermediate stops");
  }
}

export async function createBusSeats(busSeats: IBusSeats[], routeId: number) {
  try {
    await Promise.all(
      busSeats.map((seat) =>
        prisma.busSeat.create({
          data: {
            passenger: seat.passenger,
            number: seat.number,
            busSeatStatus: seat.busSeatStatus,
            routeDriverId: routeId,
          },
        })
      )
    );
  } catch (error) {
    handleError(error, "Error creating bus seats");
  }
}

export async function createPassengersSeatsList(
  passengersSeatsList: IPassengersSeatsList[],
  routeDriverId: number
) {
  try {
    const promises = passengersSeatsList.map(
      async (seat: IPassengersSeatsList) => {
        console.log("Processing passengersSeatList:", seat);

        const passengersSeatList = await prisma.passengersSeatsList.create({
          data: {
            idPassenger: seat.idPassenger,
            routeDriverId,
          },
        });

        console.log("Created passengersSeatList:", passengersSeatList);

        await Promise.all(
          seat.subPassengersList.map(async (subPassenger) => {
            try {
              const result = await prisma.subPassengersList.create({
                data: {
                  subFirstName: subPassenger.subFirstName,
                  subLastName: subPassenger.subLastName,
                  subPhone: subPassenger.subPhone,
                  subEmail: subPassenger.subEmail,
                  passengersSeatsListId: passengersSeatList.id,
                },
              });

              console.log("Created subPassenger:", result);
              return result;
            } catch (error) {
              handleError(error, "Error creating subPassenger");
            }
          })
        );
      }
    );

    await Promise.all(promises);
  } catch (error) {
    handleError(error, "Error processing passengersSeatsList");
  }
}
