export interface FormValues {
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
