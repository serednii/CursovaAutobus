import { IBusSeats, ISubPassengersList, RouteDriver } from "./interface";
import { TypeBaseRoute } from "./route-passenger.types";

export interface ISendDataBaseRouteDriver extends RouteDriver {
  bookedSeats: number;
  maxSeats: number;
  passengersSeatsList: ISubPassengersList[];
}

export interface GetRoutesByDriverId extends Omit<TypeBaseRoute, "availableSeats"> {
  bookedSeats: number;
  maxSeats: number;
  isReservation: boolean;
}

export interface IGetRouteById extends Omit<TypeBaseRoute, "id" | "availableSeats"> {
  busSeats: IBusSeats[];
  passengersSeatsList: ISubPassengersList[];
}

export interface PassengerDetails {
  seat: number;
  orderPassengers: string;
  orderPassengersId: number;
  passenger: string;
  phone: string;
  email: string;
}

export interface IGetRoutePassengerById extends IGetRouteById {
  id: number;
  selectBusLayout: string;
  modelBus: string;
  bookedSeats: number;
  maxSeats: number;
}
