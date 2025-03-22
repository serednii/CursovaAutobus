import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { ISubPassengersList } from "@/types/interface";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";

// const exampleRote = {
//   arrivalDate: " Fri Mar 14 2025 20:00:00 GMT+0100 (Центральная Европа, стандартное время)",
//   arrivalTo: "Львів",
//   busNumber: "33456",
//   coffee: true,
//   departureDate: "Fri Mar 07 2025 20:15:00 GMT+0100 (Центральная Европа, стандартное время) ",
//   departureFrom: "New York",
//   intermediateStops: ["stop1", "stop2"],
//   power: true,
//   restRoom: false,
//   routePrice: "456",
//   selectBusLayout: 0,
//   subEmail?: ["RESERVATIONDRIVER@gmail.com", "RESERVATIONDRIVER@gmail.com"],
//   subFirstName?: ["RESERVATION DRIVER", "RESERVATION DRIVER"],
//   subLastName?: ["RESERVATION DRIVER", "RESERVATION DRIVER"],
//   subPhone?: ["476757575700", "476757575700"],
//   wifi: false,
// };

export const transformData = (
  // watch: UseFormWatch<FormValuesRoute>,
  data: FormValuesRoute,
  dataLayoutBus: ILayoutData,
  sessionUser: UserSession
): ISendDataBaseRouteDriver => {
  console.log("data", data);
  console.log("dataLayoutBus", dataLayoutBus);
  console.log("sessionUser", sessionUser);
  // const subFirstName = watch("subFirstName");
  // const subLastName = watch("subLastName");
  // const subPhone = watch("subPhone");
  // const subEmail = watch("subEmail");
  // const routePrice = watch("routePrice");
  // const departureDate = watch("departureDate");
  // const selectBusLayout = watch("selectBusLayout");
  // const intermediateStops = watch("intermediateStops");
  const newFormatPassenger = dataLayoutBus.passenger.map(({ number, busSeatStatus, passenger }) => ({
    number,
    busSeatStatus,
    passenger,
  }));
  console.log("newFormatPassenger +++++++++++++++++", newFormatPassenger);
  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: Number(sessionUser?.id),
  };

  if (data.subFirstName && data.subLastName && data.subPhone && data.subEmail) {
    if (data.subFirstName && data.subFirstName.length > 0) {
      const subPassengersList = data.subFirstName?.map((_, index) => ({
        subFirstName: data.subFirstName ? data.subFirstName[index] : "",
        subLastName: data.subLastName ? data.subLastName[index] : "",
        subPhone: data.subPhone ? data.subPhone[index] : "",
        subEmail: data.subEmail ? data.subEmail[index] : "",
      }));
      passengersSeatsList.subPassengersList = subPassengersList;
    }
  }

  return {
    ...data,
    routePrice: Number(data.routePrice),
    modelBus: dataLayoutBus.modelBus,
    busSeats: newFormatPassenger,
    driverId: Number(sessionUser.id),
    departureDate: new Date(data.departureDate),
    notate: "This is a comfortable route.",
    selectBusLayout: String(data.selectBusLayout),
    intermediateStops: data.intermediateStops || [],
    maxSeats: newFormatPassenger.length,
    bookedSeats: newFormatPassenger.filter((e) => e.busSeatStatus === "reserved").length,
    passengersSeatsList: [passengersSeatsList],
  };
};
