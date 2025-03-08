import { IGetSearchRouteOne, IGetSearchRouteOneOption, searchRouteOne } from "@/fetchFunctions/searchRoute";
import { selectOne } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { IGetSearchRouteOneOptionData } from "@/types/searchRoute.types";
import { useEffect, useState } from "react";

const data: IGetSearchRouteOneOptionData = {
  select: selectOne,
};

interface IUseClickToDate {
  setIsLoadingOne: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlightedDates: React.Dispatch<React.SetStateAction<Date[] | []>>;
  highlightedDatesRef: React.MutableRefObject<Date[] | []>;
  sessionIdUser: number;
}

export const useClickToDate = ({
  setIsLoadingOne,
  setHighlightedDates,
  highlightedDatesRef,
  sessionIdUser,
}: IUseClickToDate): { clickToDate: number; setClickToDate: React.Dispatch<React.SetStateAction<number>> } => {
  const [clickToDate, setClickToDate] = useState(0);
  useEffect(() => {
    if (clickToDate) {
      setIsLoadingOne(true);
      searchRouteOne([data])
        .then((response: IGetSearchRouteOne[] | null) => {
          if (response) {
            console.log("response", response);
            const dates: Date[] = response
              .filter((item) => item.driverId !== sessionIdUser)
              .map((route: { departureDate: string }) => new Date(route.departureDate));
            //update list date routes
            setHighlightedDates(dates);
            highlightedDatesRef.current = dates;
          } else {
            console.log("No data received or an error occurred.");
          }
        })
        .catch((err) => console.error("Fetch failed:", err))
        .finally(() => setIsLoadingOne(false));
    }
  }, [clickToDate]);
  // }, [clickToDate, setIsLoadingOne, setHighlightedDates, highlightedDatesRef, sessionIdUser]);

  return { clickToDate, setClickToDate };
};
