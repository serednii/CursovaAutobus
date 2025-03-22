import { useEffect, useState } from "react";

import { selectRouteAgain, selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

import { fetchGetRoutesById, IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";

interface UseFetchRouteProps {
  id: number;
  type: string | string[];
}

export const useFetchRoute = ({ id, type }: UseFetchRouteProps) => {
  const [route, setRoute] = useState<IGetRouteUpdate | IGetRouteAgain | null>(null);

  useEffect(() => {
    if (id !== 0 && type !== "type") {
      if (type === "change") {
        fetchGetRoutesById.searchRoute([id], selectRouteUpdate, "ByIdUpdate").then((value) => {
          console.log("fetchGetRoutesById ByIdUpdate ++++++++++++++++", value);
          const result = value as IGetRouteUpdate[] | null;
          if (!result || result.length === 0) return;
          setRoute(result[0]);
        });
      } else if (type === "again") {
        fetchGetRoutesById.searchRoute([id], selectRouteAgain, "byIdAgain").then((value) => {
          console.log("fetchGetRoutesById byIdAgain ++++++++++++++++", value);
          const result = value as IGetRouteAgain[] | null;
          if (!result || result.length === 0) return;
          setRoute(result[0]);
        });
      }
    }
  }, [id, type]);

  return { route };
};
