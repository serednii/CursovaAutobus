import { IBusSeats, RouteDriver } from "./interface";
import { SeatStatus } from "./types";

interface Passenger {
  passenger: number | null; // null, якщо місце не зайняте
  number: number; // Номер місця
  busSeatStatus: SeatStatus; // Статус місця
}

export interface SendRouteDriver extends RouteDriver {
  passengersListId: number[]; // ID пасажирів
}
