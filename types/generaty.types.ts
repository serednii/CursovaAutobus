export type GenerateBooleanType<T extends string> = {
  [Key in T]: boolean;
};

export type GenerateType<T, K extends keyof T> = {
  [key in K]: key extends K ? T[key] : never;
};

export type IGetBusSeatsBoolean = {
  busSeats: {
    select: {
      idBus: boolean;
      busNumber: boolean;
      selectBusLayout: boolean;
      modelBus: boolean;
      maxSeats: boolean;
      bookedSeats: boolean;
    };
  };
};

export type IGetPassengersSeatsList = {
  passengersSeatsList: {
    select: {
      idPassenger: boolean;
      subPassengersList: {
        select: {
          subFirstName: boolean;
          subLastName: boolean;
          subPhone: boolean;
          subEmail: boolean;
        };
      };
    };
  };
};
