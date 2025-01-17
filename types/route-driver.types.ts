import { ISubPassengers } from "./form.types";
import { NullableNumber, SeatStatus } from "./types";

type TBusSeat = {
  passenger: NullableNumber; // Може бути null, якщо місце доступне
  number: number; // Номер місця
  busSeatStatus: SeatStatus; // Статус місця
};

export type TSubPassengersList = {
  idPassenger: number;
  newSubPassengerList: ISubPassengers[];
};

export type RouteDriver = {
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
  busSeats: TBusSeat[]; // Список місць у автобусі
  modelBus: string;
  intermediateStops: string[];
};

export type sendDataBaseRouteDriver = {
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
  busSeats: TBusSeat[]; // Список місць у автобусі
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
  intermediateStops: string[];
  subPassengersList: TSubPassengersList[];
};

export type GetRoutesByDriverId = {
  id: number; // Залишаємо це поле
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  bookedSeats: number;
  maxSeats: number;
};

export type GetRouteById = {
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  busSeats: TBusSeat[];
};
