import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { FormValuesRoute } from "@/types/form.types";
import {
  fetchGetRoutesByIdAgain,
  fetchGetRoutesByIdUpdate,
  IGetRouteAgain,
  IGetRouteUpdate,
  IGetSearchRouteAgainOption,
  IGetSearchRouteUpdateOption,
} from "@/fetchFunctions/fetchGetRoutesById";

interface UseFetchRouteProps {
  id: number;
  type: string | string[];
  selectRouteUpdate: IGetSearchRouteUpdateOption;
  selectRouteAgain: IGetSearchRouteAgainOption;
  setValue: UseFormSetValue<FormValuesRoute>;
  updateValues: (
    res: any,
    setValue: UseFormSetValue<FormValuesRoute>,
    setStartStops: any,
    setDataLayoutBus: any,
    setIndexSelectVariantBus: any
  ) => void;
  setStartStops: (stops: string[]) => void;
  setDataLayoutBus: (data: any) => void;
  setIndexSelectVariantBus: (index: number) => void;
}

export const useFetchRoute = ({
  id,
  type,
  selectRouteUpdate,
  selectRouteAgain,
  setValue,
  updateValues,
  setStartStops,
  setDataLayoutBus,
  setIndexSelectVariantBus,
}: UseFetchRouteProps) => {
  const [route, setRoute] = useState<IGetRouteUpdate | IGetRouteAgain | null>(null);

  useEffect(() => {
    if (id !== 0) {
      if (type === "change") {
        fetchGetRoutesByIdUpdate([Number(id)], selectRouteUpdate).then((result: IGetRouteUpdate[] | null) => {
          if (result === null || result.length === 0) return;
          const res = result[0];
          updateValues(res, setValue, setStartStops, setDataLayoutBus, setIndexSelectVariantBus);
          setValue("departureDate", new Date(res.departureDate));
          setValue("arrivalDate", new Date(res.arrivalDate));
          setValue("wifi", res.wifi);
          setValue("coffee", res.coffee);
          setValue("power", res.power);
          setValue("restRoom", res.restRoom);
          setRoute(res);
        });
      } else if (type === "again") {
        fetchGetRoutesByIdAgain([Number(id)], selectRouteAgain).then((result: IGetRouteAgain[] | null) => {
          if (result === null || result.length === 0) return;
          const res = result[0];
          updateValues(res, setValue, setStartStops, setDataLayoutBus, setIndexSelectVariantBus);
          setRoute(res);
        });
      }
    }
  }, [id, type]);

  return { route };
};
