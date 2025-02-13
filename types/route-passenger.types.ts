import {
  IBusSeats,
  IDateString,
  IFromTo,
  IServiceBus,
  ISubPassengersList,
} from "./interface";
import { BusSeatInfo } from "./layoutbus.types";
import { GetRoutesByDriverId } from "./route-driver.types";

export interface TypeBaseRoute extends IDateString, IFromTo {
  id: number; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  // AvailableSeats: number;
}

export interface GetSearchRoutePassengers
  extends Omit<TypeBaseRoute, "AvailableSeats">,
    IServiceBus {
  driverId: number;
  busNumber: string;
  notate: string;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
}

export interface IUpdateRoute {
  busSeats: BusSeatInfo[];
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

export interface IDeleteRoutePassenger {
  routeDriverId: number;
  idPassenger: number;
  busSeats: IBusSeats[];
}

export interface IRoutesTable extends IDateString, IFromTo {
  id: number;
  seatsNumber: string;
  routeTotalPrice: string;
  routePrice: string;
  busSeats: IBusSeats[];
}
