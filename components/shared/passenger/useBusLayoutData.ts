import { useEffect, useState } from "react";
import { layoutsData } from "@/components/shared/layoutBus/OOLayoutData";
import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";

const useBusLayoutData = (route: IGetRouteSeatSelection | undefined) => {
  const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null>(null);

  useEffect(() => {
    if (route) {
      const filteredData = layoutsData.find((item) => item.modelBus === route.modelBus);
      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      const transformData = filteredData.passenger.map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeatStatus = route.busSeats?.find((item) => item.number === number);
        return {
          ...rest,
          number,
          busSeatStatus: findBusSeatStatus ? findBusSeatStatus.busSeatStatus : busSeatStatus,
          passenger: findBusSeatStatus ? findBusSeatStatus.passenger : null,
        };
      });

      setDataLayoutBus({ ...filteredData, passenger: transformData });
    }
  }, [route]);

  return { dataLayoutBus, setDataLayoutBus };
};

export default useBusLayoutData;
