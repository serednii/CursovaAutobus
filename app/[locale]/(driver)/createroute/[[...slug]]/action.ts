import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { UseFormSetValue } from "react-hook-form";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchApi/v1/getRoutesById";
import layoutsData from "@/components/shared/layoutBus/LayoutData";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
// import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
import { layoutsData_90deg } from "@/components/shared/layoutBus/LayoutData_90deg";
import { layoutsData_0deg } from "@/components/shared/layoutBus/LayoutData_0deg";
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

export const getNewDataLayoutBus = (isMobile: boolean): ILayoutData | null => {
  //select rotate bus or normal bus and select number Seat bus
  console.log("22222222222222222");
  if (!busStore.dataLayoutBus) return null;
  const selectLayoutsData = (isMobile ? layoutsData_90deg : layoutsData_0deg).filter(
    (item) => item.passengerLength === busStore.dataLayoutBus?.passengerLength
  )[0];
  console.log("sselectLayoutsData", selectLayoutsData);
  console.log("busStore.dataLayoutBus", busStore.dataLayoutBus);

  const newDataLayoutBus = {
    ...busStore.dataLayoutBus,
    driverSeat: busStore.dataLayoutBus.driverSeat || {},
    modelBus: busStore.dataLayoutBus.modelBus || "",
    passengerLength: selectLayoutsData.passengerLength,
    busWidth: selectLayoutsData.busWidth,
    busHeight: selectLayoutsData.busHeight,
    stairs: selectLayoutsData.stairs,
    passenger: (busStore.dataLayoutBus?.passenger ?? []).map((item) => ({
      number: item.number,
      busSeatStatus: item.busSeatStatus,
      passenger: item.passenger,
      ...selectLayoutsData.passenger.find((seat) => seat.number === item.number),
    })),
  };
  console.log("newDataLayoutBus", newDataLayoutBus);
  return newDataLayoutBus;
};

export const transformData = (
  data: FormValuesRoute,
  // dataLayoutBus: ILayoutData,
  sessionUser: UserSession
): ISendDataBaseRouteDriver => {
  // console.log("transformData Render");
  console.log("transformData data", data);
  // console.log("sessionUser", sessionUser);

  const newFormatPassenger = busStore.dataLayoutBus?.passenger.map(
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

  console.log(
    "XXXXXXXXX",
    sessionUser.id,
    Number(sessionUser.id),
    busStore.dataLayoutBus?.modelBus
  );
  return {
    ...data,
    routePrice: Number(data.routePrice),
    modelBus: busStore.dataLayoutBus?.modelBus || "",
    busNumber: data.busNumber,
    busSeats: newFormatPassenger || [],
    driverId: Number(sessionUser.id),
    departureDate: new Date(data.departureDate),
    notate: "This is a comfortable route.",
    selectBusLayout: String(data.selectBusLayout),
    intermediateStops: data.intermediateStops || [],
    maxSeats: newFormatPassenger?.length || 0,
    bookedSeats: newFormatPassenger?.filter((e) => e.busSeatStatus === "reserved").length || 0,
    passengersSeatsList: [passengersSeatsList],
  };
};

export const handleChangeVariantBus = (
  number: number,
  isMobile: boolean,
  route?: IGetRouteUpdate | IGetRouteAgain | undefined
  // setDataLayoutBus: (
  //   value: ILayoutData | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined) | null | undefined,
  //   action: RoleEnum
  // ) => void,
) => {
  const busSeats = route && "busSeats" in route ? route.busSeats : null;
  console.log("handleChangeVariantBus+++++++++++++++", number, busStore.dataLayoutBus);
  busStore.setIndexSelectVariantBus(number);
  if (busSeats) {
    const selectLayoutsData = layoutsData(isMobile)[number].passenger.map((e) => {
      const findSeats = busSeats.find((seat) => e.number === seat.number);
      return {
        ...e,
        busSeatStatus: findSeats?.busSeatStatus || SeatStatusEnum.AVAILABLE,
        passenger: findSeats?.passenger || null,
      };
    });

    busStore.setDataLayoutBus(
      { ...layoutsData(isMobile)[number], passenger: selectLayoutsData },
      RoleEnum.DRIVER
    );
  } else {
    busStore.setDataLayoutBus(layoutsData(isMobile)[number], RoleEnum.DRIVER);
  }
};

export const updateValues = <T extends IGetRouteUpdate | IGetRouteAgain>(
  route: T,
  setValue: UseFormSetValue<FormValuesRoute>,
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>
  // setDataLayoutBus: (
  //   value:
  //     | ILayoutData
  //     | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined)
  //     | null
  //     | undefined,
  //   action: RoleEnum
  // ) => void,
  // setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setValue("routePrice", String(route.routePrice));
  setValue("departureFrom", route.departureFrom);

  setValue("arrivalTo", route.arrivalTo);

  setValue("busNumber", route.busNumber);

  setValue("selectBusLayout", route.modelBus);

  setStartStops(route.intermediateStops.map((e) => e.stopName));

  const findIndexLayoutsBus = layoutsData(false).findIndex((e) => e.modelBus === route.modelBus);

  handleChangeVariantBus(
    findIndexLayoutsBus,
    // setIndexSelectVariantBus,
    // "busSeats" in res ? res.busSeats : undefined
    false,
    route
  );
};
