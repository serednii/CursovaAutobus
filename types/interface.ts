import { SubPassengerDetails } from "./form.types";
import { NullableNumber, SeatStatus } from "./types";

export interface IFromTo {
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
}

export interface IDateISO {
  departureDate: Date;
  arrivalDate: Date;
}

export interface IDateString {
  departureDate: string;
  arrivalDate: string;
}

export interface IServiceBus {
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  // isOption: boolean;
}

interface ISubPassengerList {
  subFirstName: string;
  subLastName: string;
  subPhone: string;
  subEmail: string;
}

export interface IPassengersSeatsList {
  idPassenger: number;
  subPassengersList: ISubPassengerList[];
}

export interface IBusSeats {
  passenger: NullableNumber; // Може бути null, якщо місце доступне
  number: number; // Номер місця
  busSeatStatus: SeatStatus; // Статус місця
}

export interface ICreateRoute extends IDateString, IServiceBus, IFromTo {
  driverId: number;
  busNumber: string;
  routePrice: number;
  selectBusLayout: string;
  notate: string;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
  intermediateStops: string[];
  busSeats: IBusSeats[];
  passengersSeatsList: IPassengersSeatsList[];
}

export interface ISubPassengersList {
  idPassenger: number;
  subPassengersList: SubPassengerDetails[];
}

export interface RouteDriver extends IDateISO, IServiceBus, IFromTo {
  driverId: number; // ID водія
  busNumber: string; // Номер автобуса
  routePrice: number; // Ціна маршруту
  selectBusLayout: string; // Макет автобуса
  notate?: string; // Додаткова примітка (необов'язкове поле)
  busSeats: IBusSeats[]; // Список місць у автобусі
  modelBus: string;
  intermediateStops: string[];
}

export interface routeDataBase extends ICreateRoute {
  id: number;
}
