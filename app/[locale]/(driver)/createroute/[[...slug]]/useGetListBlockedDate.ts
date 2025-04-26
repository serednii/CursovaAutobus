import { useEffect, useState } from "react";
import getRoutesByDriverId, {
  IRoutesByIdDriverListBlocked,
  selectRouteListBlocked,
} from "@/api/v1/gеtRoutesByDriverId";

interface UseFetchRouteProps {
  driverId: number;
  id: number;
  type: string | string[];
}

export const useGetListBlockedDate = ({ driverId, type, id }: UseFetchRouteProps) => {
  const [listBlockedDate, setListBlockedDate] = useState<IRoutesByIdDriverListBlocked[] | []>([]);

  useEffect(() => {
    if (driverId && driverId > 0) {
      getRoutesByDriverId
        .searchRoute([driverId], selectRouteListBlocked, "listBlocked")
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
