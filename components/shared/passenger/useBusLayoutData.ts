import { useEffect, useRef } from "react";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
// import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useStore from "@/zustand/createStore";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { cloneDeep } from "lodash";
import { BusSeatInfo, ILayoutData } from "@/types/layoutbus.types";

const x6: BusSeatInfo[] = [
  { left: 150, top: 5, passenger: 2, number: 3, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 220, top: 5, passenger: null, number: 7, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 290, top: 5, passenger: 4, number: 11, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 360, top: 5, passenger: null, number: 15, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 430, top: 5, passenger: null, number: 19, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 500, top: 5, passenger: 8, number: 23, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, top: 5, passenger: null, number: 27, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 150, top: 48, passenger: null, number: 4, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 220, top: 48, passenger: 3, number: 8, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 290, top: 48, passenger: 4, number: 12, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 360, top: 48, passenger: null, number: 16, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 430, top: 48, passenger: null, number: 20, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 500, top: 48, passenger: 6, number: 24, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, top: 48, passenger: 8, number: 28, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 150, bottom: 48, passenger: null, number: 2, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 220, bottom: 48, passenger: 10, number: 6, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 290, bottom: 48, passenger: 1, number: 10, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 360, bottom: 48, passenger: 4, number: 14, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 430, bottom: 48, passenger: 1, number: 18, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 500, bottom: 48, passenger: 5, number: 22, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, bottom: 48, passenger: 1, number: 26, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 640, bottom: 48, passenger: 6, number: 30, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 150, bottom: 5, passenger: null, number: 1, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 220, bottom: 5, passenger: null, number: 5, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 290, bottom: 5, passenger: null, number: 9, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 360, bottom: 5, passenger: 1, number: 13, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 430, bottom: 5, passenger: 1, number: 17, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 500, bottom: 5, passenger: 1, number: 21, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 570, bottom: 5, passenger: 5, number: 25, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 640, bottom: 5, passenger: 5, number: 29, busSeatStatus: SeatStatusEnum.RESERVED },
  { right: 5, top: 5, passenger: null, number: 35, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 48, passenger: 7, number: 34, busSeatStatus: SeatStatusEnum.RESERVED },
  { right: 5, top: 92, passenger: null, number: 33, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 135, passenger: null, number: 32, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 178, passenger: null, number: 31, busSeatStatus: SeatStatusEnum.AVAILABLE },
];

const x4: BusSeatInfo[] = [
  { left: 150, top: 5, passenger: 2, number: 3, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 220, top: 5, passenger: null, number: 7, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 290, top: 5, passenger: 4, number: 11, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 360, top: 5, passenger: null, number: 15, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 430, top: 5, passenger: null, number: 19, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 500, top: 5, passenger: 8, number: 23, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, top: 5, passenger: null, number: 27, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 150, top: 48, passenger: null, number: 4, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 220, top: 48, passenger: 3, number: 8, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 290, top: 48, passenger: 4, number: 12, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 360, top: 48, passenger: null, number: 16, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 430, top: 48, passenger: null, number: 20, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 500, top: 48, passenger: 6, number: 24, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, top: 48, passenger: 8, number: 28, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 150, bottom: 48, passenger: 1, number: 2, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 220, bottom: 48, passenger: 10, number: 6, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 290, bottom: 48, passenger: 1, number: 10, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 360, bottom: 48, passenger: 1, number: 14, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 430, bottom: 48, passenger: null, number: 18, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 500, bottom: 48, passenger: 5, number: 22, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 570, bottom: 48, passenger: null, number: 26, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 640, bottom: 48, passenger: 6, number: 30, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 150, bottom: 5, passenger: null, number: 1, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 220, bottom: 5, passenger: null, number: 5, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 290, bottom: 5, passenger: null, number: 9, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 360, bottom: 5, passenger: null, number: 13, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 430, bottom: 5, passenger: 1, number: 17, busSeatStatus: SeatStatusEnum.SELECTED },
  { left: 500, bottom: 5, passenger: null, number: 21, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { left: 570, bottom: 5, passenger: 5, number: 25, busSeatStatus: SeatStatusEnum.RESERVED },
  { left: 640, bottom: 5, passenger: 5, number: 29, busSeatStatus: SeatStatusEnum.RESERVED },
  { right: 5, top: 5, passenger: null, number: 35, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 48, passenger: 7, number: 34, busSeatStatus: SeatStatusEnum.RESERVED },
  { right: 5, top: 92, passenger: null, number: 33, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 135, passenger: null, number: 32, busSeatStatus: SeatStatusEnum.AVAILABLE },
  { right: 5, top: 178, passenger: null, number: 31, busSeatStatus: SeatStatusEnum.AVAILABLE },
];

const useBusLayoutData = (route: IGetRouteSeatSelection | undefined) => {
  // const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null>(null);
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const setDataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);
  const counterRender = useRef(0);
  // const updateIdOrderPassengers = useStore((state) => state.updateIdOrderPassengers);

  //В модель автобуса layoutsData добавляємо дані про пасажирів із маршруту route
  useEffect(() => {
    if (route && counterRender.current < 2) {
      counterRender.current++;
      // console.log("route", route);
      //Находимо модель автобуса яка використовується
      const filteredData = cloneDeep(layoutsData).find((item) => item.modelBus === route.modelBus);
      console.log("filteredData", route, filteredData);

      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      const transformData = cloneDeep(filteredData.passenger).map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeat = route.busSeats?.find((item) => item.number === number);
        findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus", findBusSeat);

        const findBusSeatStatus = {
          ...rest,
          number,
          busSeatStatus: findBusSeat?.busSeatStatus ?? busSeatStatus,
          passenger: findBusSeat?.passenger ?? e.passenger,
        };

        findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus +++++", findBusSeatStatus);

        return findBusSeatStatus;
      });

      console.log("transformDatanew", transformData);

      const filteredDataModified = { ...filteredData, passenger: transformData };
      console.log("transformData", filteredDataModified);

      setDataLayoutBus(filteredDataModified);
      setDataLayoutBusMap(filteredDataModified);
    }
  }, [route, setDataLayoutBusMap, setDataLayoutBus, layoutsData]);

  return null;
};

export default useBusLayoutData;
