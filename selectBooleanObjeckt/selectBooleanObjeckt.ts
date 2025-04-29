import {
  IGetSearchRouteCityOption,
  IGetSearchRouteManyOption,
  IGetSearchRouteOneOption,
} from "@/fetchApi/v1/getRoutes";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";

const busSeats = {
  select: {
    id: true,
    passenger: true,
    number: true,
    busSeatStatus: true,
    routeDriverId: true,
    // routeDriver: true,
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

export const selectMany: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList = {
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

export interface ISelectMyBookings {
  id: boolean;
  driverId: boolean;
  departureDate: boolean;
  arrivalDate: boolean;
  departureFrom: boolean;
  arrivalTo: boolean;
  routePrice: boolean;
}

export const selectMyBookings: ISelectMyBookings = {
  id: true,
  driverId: true,
  ...baseDate,
  ...busSeats,
  ...passengersSeatsList,
};

import {
  IGetSearchRouteAgainOption,
  IGetSearchRouteSeatSelectionOption,
  IGetSearchRouteUpdateOption,
} from "@/fetchApi/v1/getRoutesById";

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

import { IGetSearchRouteMyRouteOption } from "@/fetchApi/v1/getRoutesById";
import { IGetUsersByIdBySelectOption } from "@/fetchApi/fetchUsersDELETE";

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
  busNumber: true,
  restRoom: true,
  modelBus: true,
  ...baseDate,
  busSeats,
  passengersSeatsList,
  intermediateStops: true,
};

export const selectRouteAgain: IGetSearchRouteAgainOption = {
  driverId: true,
  busNumber: true,
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
