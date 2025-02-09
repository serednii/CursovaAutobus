import {
  IGetSearchRouteManyOption,
  IGetSearchRouteOneOption,
} from "@/types/searchroute.types";

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
