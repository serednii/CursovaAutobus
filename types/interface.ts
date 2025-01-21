import { IBusSeats } from "./route-driver.types";

interface ISubPassengerList {
  subFirstName: string;
  subLastName: string;
  subPhone: string;
  subEmail: string;
}

interface IPassengersSeatsList {
  idPassenger: number;
  subPassengersList: ISubPassengerList[];
}

export interface ICreateRoute {
  driverId: number;
  departureDate: string;
  arrivalDate: string;
  departureFrom: string;
  arrivalTo: string;
  busNumber: string;
  routePrice: number;
  selectBusLayout: string;
  notate: string;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom?: boolean;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
  intermediateStops: string[];
  busSeats: IBusSeats[];
  passengersSeatsList: IPassengersSeatsList[];
}
