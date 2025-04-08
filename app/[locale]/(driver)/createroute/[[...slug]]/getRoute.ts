import { selectRouteAgain, selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

import {
  fetchGetRoutesById,
  IGetRouteAgain,
  IGetRouteUpdate,
} from "@/fetchFunctions/fetchGetRoutesById";

interface Props {
  id: number;
  type: string | string[];
}

export const getRoute = async ({
  id,
  type,
}: Props): Promise<IGetRouteUpdate | IGetRouteAgain | undefined> => {
  if (!id || id === 0) return;

  try {
    if (type === "change") {
      const value = await fetchGetRoutesById.searchRoute([id], selectRouteUpdate, "ByIdUpdate");
      const result = value as IGetRouteUpdate[] | null;
      return result?.[0];
    }

    if (type === "again") {
      const value = await fetchGetRoutesById.searchRoute([id], selectRouteAgain, "byIdAgain");
      const result = value as IGetRouteAgain[] | null;
      return result?.[0];
    }
  } catch (error) {
    console.error("getRoute error:", error);
  }

  return;
};
