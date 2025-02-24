import { IGetSearchRouteManyOption, IGetSearchRouteOneOption } from "@/fetchFunctions/searchRoute";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";

const busSeats = {
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
};

export const selectMyBookings = {
  id: true,
  ...baseDate,
  busSeats,
  passengersSeatsList,
};

import { IGetSearchRouteSeatSelectionOption } from "@/fetchFunctions/fetchGetRoutesById";
export const selectSeatSelection: IGetSearchRouteSeatSelectionOption = {
  // export const select = {
  id: true,
  ...baseDate,
  selectBusLayout: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
  busSeats,
  passengersSeatsList,
};

import { IGetSearchRouteMyRouteOption } from "@/fetchFunctions/fetchGetRoutesById";
import { IGetUsersByIdBySelectOption } from "@/fetchFunctions/fetchUsers";
export const selectRoute: IGetSearchRouteMyRouteOption = {
  ...baseDate,
  busSeats,
  passengersSeatsList,
};

export const selectUser: IGetUsersByIdBySelectOption = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
};
