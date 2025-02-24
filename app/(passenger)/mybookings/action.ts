import { SeatStatusEnum } from "@/enum/shared.enums";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";

import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { GetRoutesByPassengerId, IRoutesTable } from "@/types/route-passenger.types";

export const separateRoutesTable = (routesPassenger: GetRoutesByPassengerId[], passengerId: number): IRoutesTable[] => {
  console.log("routesPassenger ******** ", routesPassenger);

  const routesTable: IRoutesTable[] = routesPassenger.map((route): IRoutesTable => {
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
    const passengersSeatsList: ISubPassengersList | undefined = route.passengersSeatsList.find((e) => e.idPassenger === passengerId);

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
      isReservation: route.isReservation,
      passengersSeatsList,
    };
  });
  return routesTable;
};

export const getBusSeatsRaw = (routesPassenger: GetRoutesByPassengerId[], routeId: number) =>
  routesPassenger.find((e) => e.id === routeId)?.busSeats || [];

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

export const removeRoutePassengerFunction = async (
  routeId: number,
  passengerId: number,
  routesPassenger: GetRoutesByPassengerId[],
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const busSeatsRaw = getBusSeatsRaw(routesPassenger, routeId);
  // const busSeats = getBusSeatsPassenger(busSeatsRaw, passengerId);

  const result = await fetchDeleteRoutePassenger({
    routeDriverId: routeId,
    idPassenger: passengerId,
    busSeats: busSeatsRaw,
  });
  console.log("result", result);
  if (!result) {
    //Error delete route passenger
  } else {
    setReload(!reload);
  }

  console.log("Removing route ID:", routeId, passengerId);
};
