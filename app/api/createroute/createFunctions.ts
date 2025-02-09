import handleError from "@/lib/handleError";
import { prisma } from "@/prisma/prisma-client";
import { IBusSeats, IPassengersSeatsList } from "@/types/interface";

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
  if (!Array.isArray(passengersSeatsList) || passengersSeatsList.length === 0) {
    return new Error("Passengers seats list must be a non-empty array");
  }
  if (!routeDriverId) {
    return new Error("Route Driver ID is required");
  }

  try {
    const results = await Promise.all(
      passengersSeatsList.map(async (seat) => {
        try {
          const passengersSeatList = await prisma.passengersSeatsList.create({
            data: {
              idPassenger: seat.idPassenger,
              routeDriverId,
            },
          });

          const subPassengers = await Promise.all(
            seat.subPassengersList.map(async (subPassenger) => {
              try {
                return await prisma.subPassengersList.create({
                  data: {
                    subFirstName: subPassenger.subFirstName,
                    subLastName: subPassenger.subLastName,
                    subPhone: subPassenger.subPhone,
                    subEmail: subPassenger.subEmail,
                    passengersSeatsListId: passengersSeatList.id,
                  },
                });
              } catch (error) {
                handleError(error, "Error creating subPassenger");
                return null;
              }
            })
          );

          return { passengersSeatList, subPassengers };
        } catch (error) {
          handleError(error, "Error processing passengersSeatsList");
          return null;
        }
      })
    );
    return results.filter(Boolean);
  } catch (error) {
    handleError(error, "Error processing passengersSeatsList");
    return null;
  }
}

export async function createPassengersSeatsList1(
  passengersSeatsList: IPassengersSeatsList[],
  routeDriverId: number
) {
  try {
    const promises = passengersSeatsList.map(
      async (seat: IPassengersSeatsList) => {
        // console.log("Processing passengersSeatList:", seat);

        const passengersSeatList = await prisma.passengersSeatsList.create({
          data: {
            idPassenger: seat.idPassenger,
            routeDriverId,
          },
        });

        // console.log("Created passengersSeatList:", passengersSeatList);

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

              // console.log("Created subPassenger:", result);
              return result;
            } catch (error) {
              handleError(error, "Error creating subPassenger");
            }
          })
        );
      }
    );

    const results = await Promise.all(promises);
    if (results.length > 0) {
      return results[0];
    }
  } catch (error) {
    handleError(error, "Error processing passengersSeatsList");
  }
}
