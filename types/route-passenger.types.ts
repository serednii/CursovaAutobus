import { IBusSeats, IDateString, IFromTo, IServiceBus, ISubPassengersList } from "./interface";
import { BusSeatInfo } from "./layoutbus.types";
import { GetRoutesByDriverId, ISendDataBaseRouteDriver } from "./route-driver.types";

export interface TypeBaseRoute extends IDateString, IFromTo {
  id: number; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  availableSeats: number;
  isReservation: boolean; //якщо на даному маршруті заброрньований користувач
}

export interface GetSearchRoutePassengers extends Omit<TypeBaseRoute, "AvailableSeats">, IServiceBus {
  driverId: number;
  busNumber: string;
  notate: string;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
}

export interface IUpdateRouteAPI extends Partial<ISendDataBaseRouteDriver> {
  passengersSeatsList?: ISubPassengersList[];
  id: number;
}

export interface IUpdateRoute extends Pick<ISendDataBaseRouteDriver, "busSeats" | "bookedSeats"> {
  passengersSeatsList?: ISubPassengersList[];
  id: number;
}

export interface IUpdateRouteWithId extends IUpdateRoute {
  id: number;
}

export interface GetRoutesByPassengerId extends Omit<GetRoutesByDriverId, "maxSeats" | "bookedSeats"> {
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
