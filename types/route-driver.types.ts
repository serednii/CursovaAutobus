import { IntermediateStop } from "@prisma/client";
import { ISubPassengers } from "./form.types";
import { NullableNumber, SeatStatus } from "./types";

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

export interface ISendDataBaseRouteDriver {
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
  maxSeats: number;
  bookedSeats: number;
  intermediateStops: string[];
  passengersSeatsList: ISubPassengersList[];
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
