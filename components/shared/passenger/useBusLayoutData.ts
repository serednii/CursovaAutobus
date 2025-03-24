import { useEffect, useRef, useState } from "react";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useStore from "@/zustand/createStore";
import { RoleEnum } from "@/enum/shared.enums";
import { cloneDeep } from "lodash";
import { is } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
let isEqual: any = 0;
const useBusLayoutData = (route: IGetRouteSeatSelection | null) => {
  // const [prevDataLayoutBus, setPrevDataLayoutBus] = useState<ILayoutData | null>(null);
  // const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const counterRender = useRef(0);

  console.log("route VVVVVVVVVVVVVVVVVVV");
  useEffect(() => {
    console.log("route XXXXXXXXXXXXX", route);
    if (route && counterRender.current < 2) {
      counterRender.current++;
      const filteredData = layoutsData.find((item) => item.modelBus === route.modelBus);

      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      const transformData = filteredData.passenger.map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeatStatus = route.busSeats?.find((item) => item.number === number);

        const findPassenger = {
          ...rest,
          number,
          busSeatStatus: findBusSeatStatus ? findBusSeatStatus.busSeatStatus : busSeatStatus,
          passenger: findBusSeatStatus ? findBusSeatStatus.passenger : null,
        };

        return findPassenger;
      });

      const newData: ILayoutData = { ...filteredData, passenger: transformData };

      // console.log("route YYYYYYYYYYYY isEqual", isEqual);
      // console.log("isEqual", isEqual === busStore.setDataLayoutBus);
      // isEqual = busStore.setDataLayoutBus;

      console.log("newData", newData);
      busStore.setDataLayoutBus(newData, RoleEnum.PASSENGER);
    }
  }, [route, busStore.setDataLayoutBus, layoutsData]);

  return null;
};

export default useBusLayoutData;
