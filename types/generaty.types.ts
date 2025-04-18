export type GenerateBooleanType<T extends string> = {
  [Key in T]: boolean;
};

export type GenerateType<T, K extends keyof T> = {
  [key in K]: key extends K ? T[key] : never;
};

export type IGetBusSeatsBoolean = {
  busSeats: {
    select: {
      id: boolean;
      passenger: boolean;
      number: boolean;
      busSeatStatus: boolean;
      routeDriverId: boolean;
      // routeDriver: boolean;
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

// Функція для створення об'єкта з усіма значеннями `true`
// function createSelectUser<T extends Record<string, boolean>>(): T {
//   const keys = Object.keys({} as T) as (keyof T)[];
//   console.log(keys);
//   return keys.reduce((acc, key) => {
//     acc[key] = true;
//     return acc;
//   }, {} as T);
// }

// // Використання
// export const selectUser = createSelectUser<IGetUsersByIdBySelectOption>();
