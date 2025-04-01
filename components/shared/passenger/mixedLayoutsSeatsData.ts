import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { ILayoutData } from "@/types/layoutbus.types";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";

const mixedLayoutsSeatsData = (route: IGetRouteSeatSelection): ILayoutData => {
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

  return newData;
};

export default mixedLayoutsSeatsData;
