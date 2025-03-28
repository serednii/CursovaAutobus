import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { updateValues } from "./action";
import { selectRouteAgain, selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { FormValuesRoute } from "@/types/form.types";
import { fetchGetRoutesById, IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";
// import { ILayoutData } from "@/types/layoutbus.types";
import useStore from "@/zustand/createStore";

interface UseFetchRouteProps {
  id: number;
  type: string | string[];
  setValue: UseFormSetValue<FormValuesRoute>;
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>;
  setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useFetchRoute = ({ id, type, setValue, setStartStops, setIndexSelectVariantBus }: UseFetchRouteProps) => {
  const [route, setRoute] = useState<IGetRouteUpdate | IGetRouteAgain | null>(null);
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);

  useEffect(() => {
    if (id !== 0) {
      if (type === "change") {
        fetchGetRoutesById.searchRoute([id], selectRouteUpdate, "ByIdUpdate").then((value) => {
          const result = value as IGetRouteUpdate[] | null;
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
        fetchGetRoutesById.searchRoute([id], selectRouteAgain, "byIdAgain").then((value) => {
          const result = value as IGetRouteAgain[] | null;
          if (result === null || result.length === 0) return;
          const res = result[0];
          updateValues(res, setValue, setStartStops, setDataLayoutBus, setIndexSelectVariantBus);
          setRoute(res);
        });
      }
    }
  }, [id, type, setDataLayoutBus, setIndexSelectVariantBus, setStartStops, setValue]);

  return { route };
};
