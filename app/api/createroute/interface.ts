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
  busSeats: {
    passenger: number | null;
    number: number;
    busSeatStatus: string;
  }[];
  passengersSeatsList: [
    {
      idPassenger: number;
      subPassengersList: [
        {
          subFirstName: string;
          subLastName: string;
          subPhone: string;
          subEmail: string;
        }
      ];
    }
  ];
}
