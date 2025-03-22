import handleError from "@/lib/handleError";
import { prisma } from "@/prisma/prisma-client";
import { IBusSeats, IPassengersSeatsList } from "@/types/interface";

export async function updateIntermediateStops(intermediateStops: string[], routeId: number) {
  try {
    // Видаляємо всі старі зупинки для маршруту
    await prisma.intermediateStop.deleteMany({
      where: { routeId },
    });

    // Додаємо нові зупинки
    const newStops = await Promise.all(
      intermediateStops.map((stop) =>
        prisma.intermediateStop.create({
          data: {
            stopName: stop,
            routeId,
          },
        })
      )
    );

    return newStops; // Повертаємо масив створених об'єктів
  } catch (error) {
    console.error("Error updating intermediate stops:", error);
    return null;
  }
}

export async function updatedBusSeats(busSeats: IBusSeats[], idRoute: number) {
  // console.log("busSeats id route", idRoute);

  try {
    // Видаляємо всі старі записи для цього маршруту
    await prisma.busSeat.deleteMany({
      where: { routeDriverId: idRoute },
    });

    // Створюємо нові записи та повертаємо їх
    const newSeats = await Promise.all(
      busSeats.map((busSeat) =>
        prisma.busSeat.create({
          data: {
            routeDriverId: idRoute,
            number: busSeat.number,
            passenger: busSeat.passenger,
            busSeatStatus: busSeat.busSeatStatus,
          },
        })
      )
    );

    return newSeats; // Масив об'єктів
  } catch (error) {
    console.error("Error updating bus seats:", error);
    return null;
  }
}

export async function createPassengersSeatsList(passengersSeatsList: IPassengersSeatsList[], routeDriverId: number) {
  try {
    console.log("createPassengersSeatsList passengersSeatsList", passengersSeatsList, routeDriverId);

    const [results] = await Promise.all(
      passengersSeatsList.map(async (seat) => {
        try {
          console.log("createPassengersSeatsList seat+++++", seat);
          const passengersSeatList = await prisma.passengersSeatsList.create({
            data: {
              idPassenger: seat.idPassenger,
              routeDriverId,
            },
          });
          // console.log("passengersSeatList", passengersSeatList);
          //перевірти zod
          if (!passengersSeatList) {
            return passengersSeatList;
          }

          if (seat.subPassengersList.length === 0) {
            return [];
          }

          const subPassengers = await Promise.all(
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
                //перевірти zod

                // if (!result) {
                //   return false;
                // }

                return result;
              } catch (error) {
                console.error("Error creating subPassenger", error);
                return error;
              }
            })
          );

          return subPassengers;
        } catch (error) {
          console.error("Error creating passengersSeatList", error);
          return error;
        }
      })
    );
    return results;
  } catch (error) {
    console.error("Error processing passengersSeatsList", error);
    return error;
  }
}

// export async function createPassengersSeatsList1(passengersSeatsList: IPassengersSeatsList[], routeDriverId: number) {
//   try {
//     const promises = passengersSeatsList.map(async (seat: IPassengersSeatsList) => {
//       // console.log("Processing passengersSeatList:", seat);

//       const passengersSeatList = await prisma.passengersSeatsList.create({
//         data: {
//           idPassenger: seat.idPassenger,
//           routeDriverId,
//         },
//       });

//       // console.log("Created passengersSeatList:", passengersSeatList);

//       await Promise.all(
//         seat.subPassengersList.map(async (subPassenger) => {
//           try {
//             const result = await prisma.subPassengersList.create({
//               data: {
//                 subFirstName: subPassenger.subFirstName,
//                 subLastName: subPassenger.subLastName,
//                 subPhone: subPassenger.subPhone,
//                 subEmail: subPassenger.subEmail,
//                 passengersSeatsListId: passengersSeatList.id,
//               },
//             });

//             // console.log("Created subPassenger:", result);
//             return result;
//           } catch (error) {
//             handleError(error, "Error creating subPassenger");
//           }
//         })
//       );
//     });

//     const results = await Promise.all(promises);
//     if (results.length > 0) {
//       return results[0];
//     }
//   } catch (error) {
//     handleError(error, "Error processing passengersSeatsList");
//   }
// }
