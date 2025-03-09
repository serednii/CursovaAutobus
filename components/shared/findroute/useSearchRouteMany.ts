import { useEffect } from "react";
import { debounce } from "lodash";
import { IGetSearchRouteMany, IGetSearchRouteManyOption, searchRoute } from "@/fetchFunctions/searchRoute";
import { firstLetterUpperCase } from "@/lib/utils";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";
import { UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { selectMany, selectOne } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { IGetSearchRouteManyOptionData } from "@/types/searchRoute.types";

// export interface IGetSearchRouteManyOptionData {
//   departureSearch: string | undefined;
//   arrivalToSearch: string | undefined;
//   endOfDay: Date;
//   startOfDay: Date;
//   wifi: boolean;
//   coffee: boolean;
//   power: boolean;
//   restRoom: boolean;
//   select: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> & IGetBusSeatsBoolean & IGetPassengersSeatsList;
// }

interface IUseSearchRouteMany {
  setIsLoadingOne: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlightedDates: React.Dispatch<React.SetStateAction<Date[] | []>>;
  highlightedDatesRef: React.MutableRefObject<Date[] | []>;
  sessionIdUser: number;
  watch: UseFormWatch<FormValuesRoute>;
  setSearchDates: React.Dispatch<React.SetStateAction<TypeBaseRoute[] | []>>;
}

export const useSearchRouteMany = ({
  setIsLoadingOne,
  watch,
  sessionIdUser,
  highlightedDatesRef,
  setHighlightedDates,
  setSearchDates,
}: IUseSearchRouteMany) => {
  const departureFrom = watch("departureFrom")?.trim();
  const arrivalTo = watch("arrivalTo")?.trim();
  const departureDate = watch("departureDate");
  const wifi = watch("wifi");
  const coffee = watch("coffee");
  const power = watch("power");
  const restRoom = watch("restRoom");

  useEffect(() => {
    const debouncedSearchTerm = debounce(() => {
      const newDate =
        departureDate &&
        `${departureDate.getFullYear()}-${String(departureDate.getMonth() + 1).padStart(2, "0")}-${String(departureDate.getDate()).padStart(2, "0")}`;
      const startOfDay = new Date(`${newDate}T00:00:00`);

      const endOfDay = new Date(`${newDate}T23:59:59`);
      const data: IGetSearchRouteManyOptionData = {
        departureSearch: firstLetterUpperCase(departureFrom),
        arrivalToSearch: firstLetterUpperCase(arrivalTo),
        startOfDay,
        endOfDay,
        wifi,
        coffee,
        power,
        restRoom,
        select: selectMany,
      };

      if (departureFrom || arrivalTo || departureDate) {
        setIsLoadingOne(true);
        searchRoute
          .strategySearchRoute(data, "many")
          .then((value) => {
            const routes = value as IGetSearchRouteMany[] | null;
            if (routes) {
              console.log("response", routes);
              const filterHighlightedDates = routes.map((item: IGetSearchRouteMany) => new Date(item.departureDate));
              //update list date routes
              setHighlightedDates(
                (departureFrom || arrivalTo) && filterHighlightedDates.length > 0 ? filterHighlightedDates : highlightedDatesRef.current
              );
              const newSearchDates: TypeBaseRoute[] | [] = routes.map((item) => {
                const isReservation = item.busSeats.some(
                  (busSeat) => busSeat.passenger === sessionIdUser && busSeat.busSeatStatus === SeatStatusEnum.RESERVED
                ); //if there is a reserved user on this route
                const newItem: TypeBaseRoute = {
                  id: item.id,
                  departureDate: format(item.departureDate, "d MM yyyy HH:mm", {
                    locale: uk,
                  }),
                  arrivalDate: format(item.arrivalDate, "d MM yyyy HH:mm", {
                    locale: uk,
                  }),
                  departureFrom: item.departureFrom,
                  arrivalTo: item.arrivalTo,
                  routePrice: item.routePrice,
                  availableSeats: item.maxSeats - item.bookedSeats,
                  isReservation,
                };
                return newItem;
              });
              setSearchDates(newSearchDates);
            } else {
              console.log("No data received or an error occurred.");
            }
          })
          .catch((err) => console.error("Fetch failed:", err))
          .finally(() => setIsLoadingOne(false));
      } else {
        //update list date routes
        setHighlightedDates(highlightedDatesRef.current);
        setSearchDates([]);
      }
    }, 800);
    debouncedSearchTerm();

    return () => {
      if (debouncedSearchTerm) {
        debouncedSearchTerm.cancel();
      }
    };

    // Виконайте додаткову логіку тут
  }, [departureFrom, arrivalTo, departureDate, wifi, coffee, power, restRoom]);
};
