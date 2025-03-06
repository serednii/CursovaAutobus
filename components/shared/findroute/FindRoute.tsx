"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, CircularProgress, FormControlLabel, Typography } from "@mui/material";

import CustomTextField from "@/components/shared/form/CustomTextField";

import { FormValuesRoute } from "@/types/form.types";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";
import SearchDataPicker from "@/components/shared/form/searchDataPicker/SearchDataPicker";
import TableSearchRoutes from "@/components/shared/passenger/TableSearchRoutes";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import { cn, firstLetterUpperCase } from "@/lib/utils";
import {
  IGetSearchRouteMany,
  IGetSearchRouteManyOption,
  IGetSearchRouteOne,
  IGetSearchRouteOneOption,
  searchRouteMany,
  searchRouteOne,
} from "@/fetchFunctions/searchRoute";

import { useRouter, useSearchParams } from "next/navigation";
import CheckboxOptionsMain from "../form/CheckboxOptionsMain";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";
import { selectMany, selectOne } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { FindRouteContext } from "./findRouteContext";

// interface IGetSearchRouteManyOptionData extends IGetSearchRouteMany {
//   select: IGetSearchRouteManyOption & IGetBusSeatsBoolean & IGetPassengersSeatsList;
// }

interface IGetSearchRouteManyOptionData {
  departureSearch: string | undefined;
  arrivalToSearch: string | undefined;
  endOfDay: Date;
  startOfDay: Date;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;

  select: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> & IGetBusSeatsBoolean & IGetPassengersSeatsList;
}

interface IGetSearchRouteOneOptionData {
  select: IGetSearchRouteOneOption;
}

const data: IGetSearchRouteOneOptionData = {
  select: selectOne,
};

export default function FindRoute({ className }: { className?: string }) {
  const router = useRouter();

  const highlightedDatesRef = useRef<Date[] | []>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[] | []>([]);
  const [searchDates, setSearchDates] = useState<TypeBaseRoute[] | []>([]);
  const [clickToDate, setClickToDate] = useState(0);
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  const [isLoadingMany, setIsLoadingMany] = useState(false);
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const sessionIdUser = Number(session?.user.id);
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log("session****", session);
  // useEffect(() => {
  //   if (session) {
  //     router.replace(decodeURIComponent(callbackUrl));
  //   }
  // }, [session, router, callbackUrl]);

  console.log("searchDate", searchDates);
  console.log("highlightedDates", highlightedDates);

  // const [idRoute, setIdRoute] = typeof window !== "undefined" ? useSessionStorage<number | null>("idRoute", null) : [null, () => {}];
  // const [transition, setTransition] = typeof window !== "undefined" ? useSessionStorage<string>("transition", "") : ["", () => {}];
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  // console.log("session****", session);
  console.log("route****", router);

  // console.log("sessionUser", sessionUser);
  const {
    register,
    // unregister,
    formState: { errors },
    // formState: { errors, isValid },
    // handleSubmit,
    reset,
    watch,
    control,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
  });

  const departureFrom = watch("departureFrom")?.trim();
  const arrivalTo = watch("arrivalTo")?.trim();
  const departureDate = watch("departureDate");
  const wifi = watch("wifi");
  const coffee = watch("coffee");
  const power = watch("power");
  const restRoom = watch("restRoom");

  let idRoute: string | null = null;
  let transition: string | null = "";

  // if (window !== undefined) {
  idRoute = sessionStorage.getItem("idRoute");
  transition = sessionStorage.getItem("transition");
  // }

  console.log("Watch", watch());

  useEffect(() => {
    if (idRoute && transition === "seatselection" && status === "authenticated") {
      sessionStorage.removeItem("idRoute");
      sessionStorage.removeItem("transition");
      // console.log("go to seatselection");
      router.push(`/seatselection/${idRoute}`);
    }
  }, [idRoute, transition, status, router]);

  useEffect(() => {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");

    const debouncedSearchTerm = debounce(() => {
      console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");

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
        searchRouteMany<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(data)
          .then((response: IGetSearchRouteMany[] | null) => {
            if (response) {
              console.log("response", response);
              const filterHighlightedDates = response.map((item: IGetSearchRouteMany) => new Date(item.departureDate));
              //update list date routes
              setHighlightedDates(
                (departureFrom || arrivalTo) && filterHighlightedDates.length > 0 ? filterHighlightedDates : highlightedDatesRef.current
              );
              const newSearchDates: TypeBaseRoute[] | [] = response.map((item) => {
                const isReservation = item.busSeats.some(
                  (busSeat) => busSeat.passenger === Number(session?.user.id) && busSeat.busSeatStatus === SeatStatusEnum.RESERVED
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

  useEffect(() => {
    if (clickToDate) {
      setIsLoadingOne(true);
      searchRouteOne<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(data)
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

  if (status === "loading")
    return (
      <>
        FindRoute
        <MyScaleLoader />
      </>
    );

  return (
    <FindRouteContext.Provider value={{ isLoadingOne, setIsLoadingMany }}>
      <div className={cn(className, "relative px-4 bg-[white] rounded-xl min-h-[530px]")}>
        {isLoadingOne && <MyScaleLoader className="absolute top-0 left-1/2" settings={{ height: 30, width: 5 }} />}
        <form className="mb-10">
          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomTextField
              register={register}
              errors={errors}
              // handleSearch={handleSearch}
              name={"departureFrom"}
              title={"Departure From"}
              className="grow"
            />
            <CustomTextField register={register} errors={errors} name={"arrivalTo"} title={"Arrival To"} className="grow" />
            <SearchDataPicker
              title="Departure Date"
              name="departureDate"
              register={register}
              errors={errors}
              highlightedDates={highlightedDates}
              control={control} // Передаємо control
              className="pt-8 grow search-data-picker"
              clickToDate={clickToDate}
              setClickToDate={setClickToDate}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                Select options
              </Typography>
              <CheckboxOptionsMain register={register} watch={watch} />
            </div>
          </div>
        </form>
        <h2>Available Routes</h2>
        {Array.isArray(searchDates) && searchDates.length > 0 && <TableSearchRoutes routes={searchDates} status={status} />}
        <div className="footer"></div>
      </div>
    </FindRouteContext.Provider>
  );
}
