import { useEffect, useRef } from "react";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { RoleEnum } from "@/enum/shared.enums";
import busStore from "@/mobx/busStore";
const useMixedLayoutsSeatsData = (route: IGetRouteSeatSelection | null) => {
  // const [prevDataLayoutBus, setPrevDataLayoutBus] = useState<ILayoutData | null>(null);
  // const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const counterRender = useRef(0);

  useEffect(() => {
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

      console.log("newData", newData);
      busStore.setDataLayoutBus(newData, RoleEnum.PASSENGER);
    }
  }, [route]);

  return null;
};

export default useMixedLayoutsSeatsData;
