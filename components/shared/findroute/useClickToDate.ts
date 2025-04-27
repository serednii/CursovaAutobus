import { IGetSearchRouteOne, getRoute } from "@/fetchApi/v1/getRoutes";
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
  userSessionId: number;
}

export const useClickToDate = ({
  setIsLoadingOne,
  setHighlightedDates,
  highlightedDatesRef,
  userSessionId,
}: IUseClickToDate): {
  clickToDate: number;
  setClickToDate: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [clickToDate, setClickToDate] = useState(0);

  useEffect(() => {
    if (clickToDate) {
      setIsLoadingOne(true);
      console.log("**************------------", data);
      getRoute
        .searchRoute(data, "one")
        .then((value) => {
          const route = value as IGetSearchRouteOne[] | null;
          // console.log("response searchRoute", route);
          if (route) {
            //Відкидаємо маршрути від водія , щоб він не міг на свої маршрути резервувати місця

            const dates: Date[] = route
              .filter((item) => item.driverId !== userSessionId)
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
  }, [clickToDate, setIsLoadingOne, setHighlightedDates, highlightedDatesRef, userSessionId]);

  return { clickToDate, setClickToDate };
};
