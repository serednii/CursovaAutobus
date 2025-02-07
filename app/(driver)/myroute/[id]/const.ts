export const selectRoute = {
  departureDate: true, // Залишаємо це поле
  arrivalDate: true, // Залишаємо це поле
  departureFrom: true, // Залишаємо це поле
  arrivalTo: true, // Залишаємо це поле
  AvailableSeats: true,
  routePrice: true, // Залишаємо це поле
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

export const selectUser = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
};
