import { FormValues } from "@/types/form.types";
import { ISubPassengersList } from "@/fetchFunctions/interface";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";

export const transformData = (
  data: FormValues,
  dataLayoutBus: ILayoutData,
  sessionUser: UserSession
) => {
  const newFormatPassenger = dataLayoutBus.passenger.map((e) => {
    const { number, busSeatStatus, passenger } = e;
    return { number, busSeatStatus, passenger };
  });

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: 0,
  };

  if (
    data.subFirstName &&
    data.subLastName &&
    data.subPhone &&
    data.subEmail &&
    Array.isArray(data.subFirstName) &&
    Array.isArray(data.subLastName) &&
    Array.isArray(data.subPhone) &&
    Array.isArray(data.subEmail) &&
    data.subFirstName.length === data.subLastName.length &&
    data.subLastName.length === data.subPhone.length &&
    data.subPhone.length === data.subEmail.length
  ) {
    const subPassengersList = data.subFirstName.map((_, index) => ({
      subFirstName: data.subFirstName ? data.subFirstName[index] : "",
      subLastName: data.subLastName ? data.subLastName[index] : "",
      subPhone: data.subPhone ? data.subPhone[index] : "",
      subEmail: data.subEmail ? data.subEmail[index] : "",
    }));

    // passengersSeatsList.subPassengersList = subPassengersList;
    // passengersSeatsList.idPassenger = Number(sessionUser?.id);
  }
  const createRouteDriver: ISendDataBaseRouteDriver = {
    ...data,
    routePrice: Number(data.routePrice),
    modelBus: dataLayoutBus.modelBus,
    busSeats: newFormatPassenger,
    driverId: Number(sessionUser?.id),
    departureDate: new Date(data.departureDate),
    notate: "This is a comfortable route.",
    selectBusLayout: String(data.selectBusLayout),
    intermediateStops: data.intermediateStops || [],
    maxSeats: newFormatPassenger.length,

    bookedSeats: newFormatPassenger.filter(
      (e) => e.busSeatStatus === "reserved"
    ).length, //в дальнішому треба добавити дані для всіх пасажирів а для водія буде просто масив пасажирів
    // passengersSeatsList: [passengersSeatsList],
    // passengersSeatsList: [],
  };

  return createRouteDriver;
};

// export const getPassengersLength = (layoutsData: ILayoutData[]): number[] =>
//   layoutsData.map((e) => e.passengerLength);
