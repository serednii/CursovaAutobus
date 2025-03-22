import React, { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";
import { IPassengersSeatsList, ISubPassengerList } from "@/types/interface";

interface UseFetchRouteProps {
  userIdSession: number;
  type: string | string[];
  setValue: UseFormSetValue<FormValuesRoute>;
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>;
  route: IGetRouteUpdate | IGetRouteAgain | null;
}

export const updateValues = <T extends IGetRouteUpdate | IGetRouteAgain>(
  res: T,
  setValue: UseFormSetValue<FormValuesRoute>,
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setValue("routePrice", String(res.routePrice));
  setValue("departureFrom", res.departureFrom);
  setValue("arrivalTo", res.arrivalTo);
  setValue("busNumber", res.modelBus);
  setValue("selectBusLayout", res.modelBus);
  setStartStops(res.intermediateStops.map((e) => e.stopName));
};

export const useUpdateValues = ({ userIdSession, type, route, setValue, setStartStops }: UseFetchRouteProps) => {
  useEffect(() => {
    if (!route || !type) return;
    if (type === "change") {
      const routeType = route as IGetRouteUpdate;
      updateValues(route, setValue, setStartStops);
      setValue("departureDate", new Date(routeType.departureDate));
      setValue("arrivalDate", new Date(routeType.arrivalDate));
      setValue("wifi", routeType.wifi);
      setValue("coffee", routeType.coffee);
      setValue("power", routeType.power);
      setValue("restRoom", routeType.restRoom);
      const [subPassenger] = routeType.passengersSeatsList.filter((e) => e.idPassenger === userIdSession);

      subPassenger?.subPassengersList.forEach((subPassenger, index) => {
        if (!subPassenger) return;
        Object.entries(subPassenger).forEach(([key, value]) => {
          setValue(`${key as "subFirstName" | "subLastName" | "subPhone" | "subEmail"}.${index}`, value);
        });
      });
    } else if (type === "again") {
      const routeType = route as IGetRouteAgain;
      updateValues(routeType, setValue, setStartStops);
    }
  }, [userIdSession, type, route, setStartStops, setValue]);

  return { route };
};
