import { SeatStatus } from "./layoutbus.types";

interface Passenger {
  passenger: number | null; // null, якщо місце не зайняте
  number: number; // Номер місця
  busSeatStatus: SeatStatus; // Статус місця
}

interface BusSeats {
  passengerLength: number; // Загальна кількість місць
  modelBus: string; // Модель автобуса
  passenger: Passenger[]; // Список пасажирів
}

export interface SendRouteDriver {
  driverId: number; // ID водія
  departureDate: string; // Дата та час відправлення
  arrivalDate: string; // Дата та час прибуття
  departureFrom: string; // Місто відправлення
  arrivalTo: string; // Місто прибуття
  busNumber: string; // Номер рейсу
  routePrice: number; // Ціна квитка
  notate: string; // Примітки
  wifi: boolean; // Наявність Wi-Fi
  coffee: boolean; // Наявність кави
  power: boolean; // Наявність розеток
  restRoom: boolean; // Наявність туалету
  busSeats: BusSeats; // Інформація про місця
  intermediateStops: string[]; // Проміжні зупинки
  passengersListId: number[]; // ID пасажирів
}
