import { IBusSeats, ISubPassengersList, RouteDriver } from "./interface";
import { TypeBaseRoute } from "./route-passenger.types";

export interface ISendDataBaseRouteDriver extends RouteDriver {
  bookedSeats: number;
  maxSeats: number;
}

export interface GetRoutesByDriverId
  extends Omit<TypeBaseRoute, "AvailableSeats"> {
  bookedSeats: number;
  maxSeats: number;
}

export interface IGetRouteById extends Omit<TypeBaseRoute, "id"> {
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
