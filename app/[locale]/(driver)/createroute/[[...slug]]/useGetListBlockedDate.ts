import { useEffect, useState } from "react";
import {
  getRoute,
  IRoutesByIdDriverListBlocked,
  selectRouteListBlocked,
} from "@/fetchFunctions/v1/getRoutes";

interface UseFetchRouteProps {
  driverId: number;
  id: number;
  type: string | string[];
}

export const useGetListBlockedDate = ({ driverId, type, id }: UseFetchRouteProps) => {
  const [listBlockedDate, setListBlockedDate] = useState<IRoutesByIdDriverListBlocked[] | []>([]);

  useEffect(() => {
    if (driverId && driverId > 0) {
      getRoute
        .searchRoute({ driverId, select: selectRouteListBlocked }, "listBlocked")
        .then((value) => {
          const result = value as IRoutesByIdDriverListBlocked[] | null;
          if (result === null || result.length === 0) {
            setListBlockedDate([]);
          } else {
            if (type === "change") {
              const filteredResult = result.filter((item) => item.id !== id);
              setListBlockedDate(filteredResult);
            } else {
              setListBlockedDate(result);
            }
          }
        });
    }
  }, [driverId, setListBlockedDate, type, id]);

  return { listBlockedDate };
};
