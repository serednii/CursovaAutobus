import { IDateISO, IFromTo, IServiceBus } from "./interface";

export interface FormValues extends SubPassengerGroup, IDateISO, IServiceBus, IFromTo {
  intermediateStops: string[];
  busNumber: string;
  routePrice: string;
  busSeats: any;
  passengersListId: number[];
  driverId: number;
  selectBusLayout: string;
}

export interface SubPassengerDetails {
  subFirstName: string;
  subLastName: string;
  subPhone: string;
  subEmail: string;
}

export interface SubPassengerGroup {
  subFirstName: string[] | undefined;
  subLastName: string[] | undefined;
  subPhone: string[] | undefined;
  subEmail: string[] | undefined;
}
