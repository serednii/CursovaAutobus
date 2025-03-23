import { useEffect, useRef, useState } from "react";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useStore from "@/zustand/createStore";
import { RoleEnum } from "@/enum/shared.enums";
import { cloneDeep } from "lodash";
import { is } from "date-fns/locale";
let isEqual: any = 0;
const useBusLayoutData = (route: IGetRouteSeatSelection | undefined) => {
  // const [prevDataLayoutBus, setPrevDataLayoutBus] = useState<ILayoutData | null>(null);
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const counterRender = useRef(0);

  // useEffect(() => {
  //   setDataLayoutBus(null, RoleEnum.PASSENGER);
  // }, []);

  console.log("route VVVVVVVVVVVVVVVVVVV");
  useEffect(() => {
    console.log("route XXXXXXXXXXXXX", route);
    if (route && counterRender.current < 2) {
      counterRender.current++;
      const filteredData = cloneDeep(layoutsData).find((item) => item.modelBus === route.modelBus);

      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      const transformData = filteredData.passenger.map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeatStatus = cloneDeep(route.busSeats)?.find((item) => item.number === number);

        const findPassenger = {
          ...rest,
          number,
          busSeatStatus: findBusSeatStatus ? findBusSeatStatus.busSeatStatus : busSeatStatus,
          passenger: findBusSeatStatus ? findBusSeatStatus.passenger : null,
        };
        return findPassenger;
      });

      const newData: ILayoutData = { ...filteredData, passenger: transformData };

      console.log("route YYYYYYYYYYYY isEqual", isEqual);
      console.log("isEqual", isEqual === setDataLayoutBus);
      isEqual = setDataLayoutBus;

      console.log("newData", newData);
      setDataLayoutBus(newData, RoleEnum.PASSENGER);
    }
  }, [route, setDataLayoutBus, layoutsData]);

  return null;
};

export default useBusLayoutData;
