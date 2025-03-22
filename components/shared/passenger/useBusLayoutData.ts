import { useEffect } from "react";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
// import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useStore from "@/zustand/createStore";

const useBusLayoutData = (route: IGetRouteSeatSelection | undefined) => {
  // const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null>(null);
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const setDataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);

  // const updateIdOrderPassengers = useStore((state) => state.updateIdOrderPassengers);

  //В модель автобуса layoutsData добавляємо дані про пасажирів із маршруту route
  useEffect(() => {
    if (route) {
      console.log("route", route);
      //Находимо модель автобуса яка використовується
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

      const filteredDataModified = { ...filteredData, passenger: transformData };
      console.log("transformData", filteredDataModified);

      setDataLayoutBus(filteredDataModified);
      setDataLayoutBusMap(filteredDataModified);
    }
  }, [route, setDataLayoutBusMap, setDataLayoutBus, layoutsData]);

  return null;
};

export default useBusLayoutData;
