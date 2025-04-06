import { SeatStatusEnum } from "@/enum/shared.enums";
// import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";

import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { GetRoutesByPassengerId, IRoutesTable } from "@/types/route-passenger.types";

export const newFormatRoutesTable = (
  routes: Omit<GetRoutesByPassengerId, "isReservation">[],
  passengerId: number
): Omit<IRoutesTable, "isReservation">[] => {
  // console.log("routesPassenger ******** ", routes);
  const routesTable: Omit<IRoutesTable, "isReservation">[] = routes.map(
    (route): Omit<IRoutesTable, "isReservation"> => {
      const getTotalPriceSeatsNumber = route.busSeats?.reduce(
        (acc: { totalPrice: number; seatsNumber: number[] }, seat: IBusSeats) => {
          if (seat?.passenger === passengerId) {
            return {
              totalPrice: acc.totalPrice + route.routePrice,
              seatsNumber: [...acc.seatsNumber, seat.number],
            };
          }
          return acc;
        },
        { totalPrice: 0, seatsNumber: [] }
      );

      const passengersSeatsList: ISubPassengersList | undefined = route.passengersSeatsList.find(
        (e) => e.idPassenger === passengerId
      );

      return {
        id: route.id,
        departureDate: route.departureDate,
        arrivalDate: route.arrivalDate,
        departureFrom: route.departureFrom,
        arrivalTo: route.arrivalTo,
        seatsNumber: getTotalPriceSeatsNumber.seatsNumber.sort((a, b) => a - b).join(", "),
        routeTotalPrice: "$" + getTotalPriceSeatsNumber.totalPrice,
        routePrice: "$" + route.routePrice,
        busSeats: route.busSeats,
        // isReservation: route.isReservation,
        passengersSeatsList,
      };
    }
  );
  return routesTable;
};

//delete my routes
export const deleteMyRoute = (
  routes: Omit<GetRoutesByPassengerId, "isReservation">[],
  passengerId: number
): Omit<GetRoutesByPassengerId, "isReservation">[] => {
  const widthOutMyRoute = routes.filter((route) => route.driverId !== passengerId);
  return widthOutMyRoute;
};

export const getBusSeatsRaw = (
  routesPassenger: Omit<IRoutesTable, "isReservation">[],
  routeId: number
) => routesPassenger.find((e) => e.id === routeId)?.busSeats || [];

export const getBusSeatsPassenger = (busSeatsRaw: IBusSeats[], passengerId: number) => {
  const busSeats = busSeatsRaw.map((e) => {
    return {
      ...e,
      busSeatStatus: e.passenger === passengerId ? SeatStatusEnum.AVAILABLE : e.busSeatStatus,
      passenger: e.passenger === passengerId ? null : e.passenger,
    };
  });
  return busSeats;
};

// export const removeRoutePassengerFunction = async (
//   routeId: number,
//   passengerId: number,
//   routes: GetRoutesByPassengerId[],
//   reload: boolean,
//   setReload: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   const busSeatsRaw = getBusSeatsRaw(routes, routeId);
//   // const busSeats = getBusSeatsPassenger(busSeatsRaw, passengerId);

//   const result = await fetchDeleteRoutePassenger({
//     routeDriverId: routeId,
//     idPassenger: passengerId,
//     busSeats: busSeatsRaw,
//   });

//   if (!result) {
//     //Error delete route passenger
//   } else {
//     setReload(!reload);
//   }

//   console.log("Removing route ID:", routeId, passengerId);
// };

// const   GetRoutesByPassengerId: {
//     //  driverId: number; delete
//      busSeats: IBusSeats[];
//      passengersSeatsList: ISubPassengersList[];
//      isReservation: boolean;
//      id: number;
//      routePrice: number;
//     //  departureFromCity?: string; delete
//     //  arrivalToCity?: string; delete
//      departureDate: string;
//      arrivalDate: string;
//      departureFrom: string;
//      arrivalTo: string;
//  }

// const IRoutesTable: {
//     id: number;
//     seatsNumber: string;
//     // routeTotalPrice: string; add
//     routePrice: string;
//     busSeats: IBusSeats[];
//     isReservation: boolean;
//     passengersSeatsList: ISubPassengersList | undefined;
//     departureDate: string;
//     arrivalDate: string;
//     departureFrom: string;
//     arrivalTo: string;

// }
