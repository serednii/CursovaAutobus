import { IGetSearchRouteManyOption, IGetSearchRouteOneOption } from "@/fetchFunctions/searchRoute";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";

export const selectMany: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> & IGetBusSeatsBoolean & IGetPassengersSeatsList = {
  id: true,
  driverId: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  busNumber: true,
  routePrice: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
  busSeats: {
    select: {
      id: true,
      passenger: true,
      number: true,
      busSeatStatus: true,
      routeDriverId: true,
      routeDriver: true,
    },
  },
  passengersSeatsList: {
    select: {
      idPassenger: true,
      subPassengersList: {
        select: {
          subFirstName: true,
          subLastName: true,
          subPhone: true,
          subEmail: true,
        },
      },
    },
  },
};

export const selectOne: IGetSearchRouteOneOption = {
  departureDate: true,
};
