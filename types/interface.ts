import { ISubPassengers } from "./form.types";
import { NullableNumber, SeatStatus } from "./types";

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

export interface IBusSeats {
  passenger: NullableNumber; // Може бути null, якщо місце доступне
  number: number; // Номер місця
  busSeatStatus: SeatStatus; // Статус місця
}

export interface ISubPassengersList {
  idPassenger: number;
  subPassengersList: ISubPassengers[];
}

export interface RouteDriver {
  driverId: number; // ID водія
  departureDate: Date; // Дата відправлення (ISO-формат)
  arrivalDate: Date; // Дата прибуття (ISO-формат)
  departureFrom: string; // Місто відправлення
  arrivalTo: string; // Місто прибуття
  busNumber: string; // Номер автобуса
  routePrice: number; // Ціна маршруту
  selectBusLayout: string; // Макет автобуса
  notate?: string; // Додаткова примітка (необов'язкове поле)
  wifi: boolean; // Наявність Wi-Fi
  coffee: boolean; // Наявність кави
  power: boolean; // Наявність розеток
  restRoom: boolean; // Наявність туалету
  busSeats: IBusSeats[]; // Список місць у автобусі
  modelBus: string;
  intermediateStops: string[];
}
