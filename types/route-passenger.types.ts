export type TableSearchRoutesType = {
  id: number; // Залишаємо це поле
  departureDate: string; // Залишаємо це поле
  arrivalDate: string; // Залишаємо це поле
  departureFrom: string; // Залишаємо це поле
  arrivalTo: string; // Залишаємо це поле
  routePrice: number; // Залишаємо це поле
  AvailableSeats: number;
};

export interface GetSearchRoutePassengers {
  id: number;
  driverId: number;
  departureDate: string;
  arrivalDate: string;
  departureFrom: string;
  arrivalTo: string;
  busNumber: string;
  routePrice: number;
  notate: string;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  modelBus: string;
  maxSeats: number;
  bookedSeats: number;
  // selectBusLayout: string;
  // intermediateStops: string[];
  // busSeats: {
  //   passenger: number | null;
  //   number: number;
  //   busSeatStatus: string;
  // }[];
  // passengersSeatsList: [
  //   {
  //     idPassenger: number;
  //     subPassengersList: [
  //       {
  //         subFirstName: string;
  //         subLastName: string;
  //         subPhone: string;
  //         subEmail: string;
  //       }
  //     ];
  //   }
  // ];
}