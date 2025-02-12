export const select = {
  id: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  routePrice: true,
  busSeats: true,
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

// id: number;
// departureDate: string;
// arrivalDate: string;
// departureFrom: string;
// arrivalTo: string;
// routePrice: number;
// busSeats: IBusSeats[];
// passengersSeatsList: ISubPassengersList[];
