import { RoleEnum } from "@/enum/shared.enums";
import { IBusSeats } from "@/types/interface";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: RoleEnum;
  license: string;
  routes?: RouteDriver[];
  orders?: OrderedRoute[];
}

export interface RouteDriver {
  id: number;
  driverId: number;
  user: User;
  departureDate: Date;
  arrivalDate: Date;
  departureFrom: string;
  arrivalTo: string;
  busNumber: string;
  routePrice: number;
  notate?: string;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  busSeats: IBusSeats[];
  intermediateStops: string[];
  passengersListId: number[];
  orders?: OrderedRoute[];
}

export interface OrderedRoute {
  id: number;
  passengerId: number;
  user: User;
  routeDriverId: number;
  routeDriver: RouteDriver;
  orderDate: Date;
  orderSeats: number[];
}
