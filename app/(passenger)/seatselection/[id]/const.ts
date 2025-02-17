// export const select: IGetSearchRouteSeatSelectionOption = {
//   id: true,
//   departureDate: true,
//   arrivalDate: true,
//   departureFrom: true,
//   arrivalTo: true,
//   routePrice: true,
//   busSeats: true,
//   selectBusLayout: true,
//   modelBus: true,
//   maxSeats: true,
//   bookedSeats: true,
//   passengersSeatsList: true,
// };

import { IGetSearchRouteSeatSelectionOption } from "@/fetchFunctions/fetchGetRoutesById";
export const select: IGetSearchRouteSeatSelectionOption = {
  // export const select = {
  id: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  routePrice: true,
  busSeats: {
    select: {
      id: true,
      passenger: true,
      number: true,
      busSeatStatus: true,
      routeDriverId: true,
      routeDriver: true,
    },
  },
  selectBusLayout: true,
  modelBus: true,
  maxSeats: true,
  bookedSeats: true,
  passengersSeatsList: {
    select: {
      idPassenger: true,
      subPassengersList: {
        select: {
          subFirstName: true,
          subLastName: true,
          subPhone: true,
          subEmail: true,
        },
      },
    },
  },
};
