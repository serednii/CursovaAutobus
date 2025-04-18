import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import { updateValues } from "./action";
import { FormValuesRoute } from "@/types/form.types";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/v1/getRoutesById";
// import { ILayoutData } from "@/types/layoutbus.types";
import useStore from "@/zustand/createStore";

interface Props {
  id: number;
  type: string | string[];
  route: IGetRouteUpdate | IGetRouteAgain | undefined;
  setValue: UseFormSetValue<FormValuesRoute>;
  setStartStops: React.Dispatch<React.SetStateAction<string[]>>;
  setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useUpdateValues = ({
  id,
  type,
  route,
  setValue,
  setStartStops,
  setIndexSelectVariantBus,
}: Props) => {
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);

  useMemo(() => {
    if (id !== 0 && route) {
      if (type === "change") {
        const changeRoute = route as IGetRouteUpdate;
        updateValues(route, setValue, setStartStops, setIndexSelectVariantBus);
        setValue("departureDate", new Date(changeRoute.departureDate));
        setValue("arrivalDate", new Date(changeRoute.arrivalDate));
        setValue("wifi", changeRoute.wifi);
        setValue("coffee", changeRoute.coffee);
        setValue("power", changeRoute.power);
        setValue("restRoom", changeRoute.restRoom);
      } else if (type === "again") {
        updateValues(route, setValue, setStartStops, setIndexSelectVariantBus);
      }
    }
  }, [id, type, setDataLayoutBus, setIndexSelectVariantBus, setStartStops, setValue]);

  return { route };
};
