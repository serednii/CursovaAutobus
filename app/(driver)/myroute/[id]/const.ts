import { IGetSearchRouteMyRouteOption } from "@/fetchFunctions/fetchGetRoutesById";
import { IGetUsersByIdBySelectOption } from "@/fetchFunctions/fetchUsers";

// export const selectRoute: IGetSearchRouteMyRouteOption = {
//   departureDate: true, // Залишаємо це поле
//   arrivalDate: true, // Залишаємо це поле
//   departureFrom: true, // Залишаємо це поле
//   arrivalTo: true, // Залишаємо це поле
//   routePrice: true, // Залишаємо це поле
//   busSeats: true,
//   passengersSeatsList: true,
// };

export const selectRoute: IGetSearchRouteMyRouteOption = {
  departureDate: true, // Залишаємо це поле
  arrivalDate: true, // Залишаємо це поле
  departureFrom: true, // Залишаємо це поле
  arrivalTo: true, // Залишаємо це поле
  routePrice: true, // Залишаємо це поле
  busSeats: {
    select: {
      idBus: true,
      busNumber: true,
      selectBusLayout: true,
      modelBus: true,
      maxSeats: true,
      bookedSeats: true,
    },
  },
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

export const selectUser: IGetUsersByIdBySelectOption = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
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
