export interface FormValues extends ISubPassenger {
  departureDate: Date;
  arrivalDate: Date;
  intermediateStops: string[];
  busNumber: string;
  routePrice: string;
  departureFrom: string;
  arrivalTo: string;
  busSeats: any;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  passengersListId: number[];
  driverId: number;
  selectBusLayout: string;
}

export interface ISubPassengers {
  subFirstName: string;
  subLastName: string;
  subPhone: string;
  subEmail: string;
}

export interface ISubPassenger {
  subFirstName: string[] | undefined;
  subLastName: string[] | undefined;
  subPhone: string[] | undefined;
  subEmail: string[] | undefined;
}
