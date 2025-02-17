import { IGetSearchRouteManyOption, IGetSearchRouteOneOption } from "@/fetchFunctions/searchRoute";

export const selectMany: IGetSearchRouteManyOption = {
  id: true,
  driverId: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  busNumber: true,
  routePrice: true,
  notate: true,
  wifi: true,
  coffee: true,
  power: true,
  restRoom: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
};

export const selectOne: IGetSearchRouteOneOption = {
  departureDate: true,
};
