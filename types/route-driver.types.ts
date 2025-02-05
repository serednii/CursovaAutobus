import { IBusSeats, ISubPassengersList, RouteDriver } from "./interface";

export interface ISendDataBaseRouteDriver extends RouteDriver {
  bookedSeats: number;
  maxSeats: number;
}

export interface GetRoutesByDriverId {
  id: number; // Залишаємо це поле
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  bookedSeats: number;
  maxSeats: number;
}

export interface PassengerDetails {
  seat: number;
  orderPassengers: string;
  orderPassengersId: number;
  passenger: string;
  phone: string;
  email: string;
}

export interface IGetRouteById {
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  busSeats: IBusSeats[];
  passengersSeatsList: ISubPassengersList[];
}

export interface IGetRoutePassengerById extends IGetRouteById {
  id: number;
  selectBusLayout: string;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
}
