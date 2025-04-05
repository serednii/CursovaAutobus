import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { UseFormSetValue } from "react-hook-form";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
// import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
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
  data: FormValuesRoute,
  dataLayoutBus: ILayoutData,
  sessionUser: UserSession
): ISendDataBaseRouteDriver => {
  // console.log("data", data);
  // console.log("dataLayoutBus", dataLayoutBus);
  // console.log("sessionUser", sessionUser);

  const newFormatPassenger = dataLayoutBus.passenger.map(
    ({ number, busSeatStatus, passenger }) => ({
      number,
      busSeatStatus,
      passenger,
    })
  );

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: Number(sessionUser?.id),
  };

  if (data?.subFirstName && data?.subLastName && data?.subPhone && data?.subEmail) {
    if (data?.subFirstName && data.subFirstName.length > 0) {
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

export const handleChangeVariantBus = (
  number: number,
  // setDataLayoutBus: (
  //   value: ILayoutData | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined) | null | undefined,
  //   action: RoleEnum
  // ) => void,
  setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>,
  dataLayoutBus?: IBusSeats[]
) => {
  console.log("handleChangeVariantBus+++++++++++++++", number);
  setIndexSelectVariantBus(number);
  if (dataLayoutBus) {
    const selectLayoutsData = layoutsData[number].passenger.map((e) => {
      const findSeats = dataLayoutBus.find((seat) => seat.number === e.number);
      return {
        ...e,
        busSeatStatus: findSeats?.busSeatStatus || SeatStatusEnum.AVAILABLE,
        passenger: findSeats?.passenger || null,
      };
    });
    busStore.setDataLayoutBus(
      { ...layoutsData[number], passenger: selectLayoutsData },
      RoleEnum.DRIVER
    );
  } else {
    busStore.setDataLayoutBus(layoutsData[number], RoleEnum.DRIVER);
  }
};

export const updateValues = <T extends IGetRouteUpdate | IGetRouteAgain>(
  res: T,
  setValue: UseFormSetValue<FormValuesRoute>,
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>,
  setDataLayoutBus: (
    value:
      | ILayoutData
      | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined)
      | null
      | undefined,
    action: RoleEnum
  ) => void,
  setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setValue("routePrice", String(res.routePrice));
  setValue("departureFrom", res.departureFrom);
  setValue("arrivalTo", res.arrivalTo);
  setValue("busNumber", res.modelBus);
  setValue("selectBusLayout", res.modelBus);
  setStartStops(res.intermediateStops.map((e) => e.stopName));
  const findIndexLayoutsBus = layoutsData.findIndex((e) => e.modelBus === res.modelBus);
  handleChangeVariantBus(
    findIndexLayoutsBus,
    setIndexSelectVariantBus,
    "busSeats" in res ? res.busSeats : undefined
  );
};
