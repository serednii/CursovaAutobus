import { IGetSearchRouteCityOption, IGetSearchRouteManyOption, IGetSearchRouteOneOption } from "@/fetchFunctions/searchRoute";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";

export const busSeats = {
  select: {
    id: true,
    passenger: true,
    number: true,
    busSeatStatus: true,
    routeDriverId: true,
    routeDriver: true,
  },
};

const passengersSeatsList = {
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
};

const baseDate = {
  departureDate: true, // Залишаємо це поле
  arrivalDate: true, // Залишаємо це поле
  departureFrom: true, // Залишаємо це поле
  arrivalTo: true, // Залишаємо це поле
  routePrice: true, // Залишаємо це поле
};

export const selectMany: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> & IGetBusSeatsBoolean & IGetPassengersSeatsList = {
  id: true,
  driverId: true,
  ...baseDate,
  busNumber: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
  busSeats,
  passengersSeatsList,
};

export const selectOne: IGetSearchRouteOneOption = {
  departureDate: true,
  driverId: true,
};

export const selectMyBookings = {
  id: true,
  driverId: true,
  ...baseDate,
  busSeats,
  passengersSeatsList,
};

import { IGetSearchRouteAgainOption, IGetSearchRouteSeatSelectionOption, IGetSearchRouteUpdateOption } from "@/fetchFunctions/fetchGetRoutesById";
export const selectSeatSelection: IGetSearchRouteSeatSelectionOption = {
  // export const select = {
  id: true,
  ...baseDate,
  selectBusLayout: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
  driverId: true,
  busSeats,
  passengersSeatsList,
};

import { IGetSearchRouteMyRouteOption } from "@/fetchFunctions/fetchGetRoutesById";
import { IGetUsersByIdBySelectOption } from "@/fetchFunctions/fetchUsers";
import { number } from "zod";

export const selectRoute: IGetSearchRouteMyRouteOption = {
  ...baseDate,
  busSeats,
  passengersSeatsList,
};

export const selectRouteUpdate: IGetSearchRouteUpdateOption = {
  id: true,
  driverId: true,
  selectBusLayout: true,
  wifi: true,
  maxSeats: true,
  coffee: true,
  bookedSeats: true,
  power: true,
  restRoom: true,
  modelBus: true,
  ...baseDate,
  busSeats,
  passengersSeatsList,
  intermediateStops: true,
};

export const selectRouteAgain: IGetSearchRouteAgainOption = {
  driverId: true,
  departureFrom: true, // Залишаємо це поле
  arrivalTo: true, // Залишаємо це поле
  routePrice: true, // Залишаємо це поле
  modelBus: true,
  intermediateStops: true,
};

export const selectRouteCity: IGetSearchRouteCityOption = {
  departureFrom: true, // Залишаємо це поле
  arrivalTo: true, // Залишаємо це поле
};

export const selectUser: IGetUsersByIdBySelectOption = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
};
