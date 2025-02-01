import { ISubPassenger } from "./form.types";
import { IBusSeats, ISubPassengersList } from "./interface";
import { params } from "./layoutbus.types";
import { GetRoutesByDriverId } from "./route-driver.types";

export type TableSearchRoutesType = {
  id: number; // Залишаємо це поле
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  AvailableSeats: number;
};

export interface GetSearchRoutePassengers {
  id: number;
  driverId: number;
  departureDate: string;
  arrivalDate: string;
  departureFrom: string;
  arrivalTo: string;
  busNumber: string;
  routePrice: number;
  notate: string;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
}

export interface IUpdateRoute {
  busSeats: params[];
  bookedSeats: number;
  passengersSeatsList: ISubPassengersList[];
}

export interface IUpdateRouteWithId extends IUpdateRoute {
  idRoute: number;
}

export interface GetRoutesByPassengerId
  extends Omit<GetRoutesByDriverId, "maxSeats" | "bookedSeats"> {
  busSeats: IBusSeats[];
  passengersSeatsList: ISubPassengersList[];
}
