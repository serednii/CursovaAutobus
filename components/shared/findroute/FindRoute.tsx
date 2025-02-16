"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

import CustomTextField from "@/components/shared/form/CustomTextField";

import { FormValues } from "@/types/form.types";

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
import { selectMany, selectOne } from "./const";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from "next/navigation";
import CheckboxOptionsMain from "../form/CheckboxOptionsMain";
interface IGetSearchRouteManyOptionData {
  departureSearch: string | undefined;
  arrivalToSearch: string | undefined;
  endOfDay: Date;
  startOfDay: Date;
  select: IGetSearchRouteManyOption;
  wifi: boolean | undefined;
  coffee: boolean | undefined;
  power: boolean | undefined;
  restRoom: boolean | undefined;
  isOption: boolean | undefined;
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

  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log("callbackUrl****", callbackUrl);
  useEffect(() => {
    if (session) {
      router.replace(decodeURIComponent(callbackUrl));
    }
  }, [session, router, callbackUrl]);

  // console.log("searchDate", searchDates);
  console.log("highlightedDates", highlightedDates);

  // const [idRoute, setIdRoute] = typeof window !== "undefined" ? useSessionStorage<number | null>("idRoute", null) : [null, () => {}];
  // const [transition, setTransition] = typeof window !== "undefined" ? useSessionStorage<string>("transition", "") : ["", () => {}];
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  // console.log("session****", session);
  console.log("route****", router);

  // useEffect(() => {
  //   if (session) {
  //     router.replace(callbackUrl); // Використовуємо replace, щоб не зберігати історію входу
  //   }
  // }, [session, router, callbackUrl]);

  // console.log("sessionUser", sessionUser);
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      wifi: true, // Початкове значення для чекбокса
      coffee: true,
      power: true,
      restRoom: true,
      isOption: false,
    },
  });

  const departureFrom = watch("departureFrom")?.trim();
  const arrivalTo = watch("arrivalTo")?.trim();
  const departureDate = watch("departureDate");
  const wifi = watch("wifi");
  const coffee = watch("coffee");
  const power = watch("power");
  const restRoom = watch("restRoom");
  const isOption = watch("isOption");
  // console.log("isOption ttt t t t t t t t ", watch("isOption"), isOption);

  // useEffect(() => {
  //   if (idRoute && transition && status === "authenticated") {
  //     setTransition("");
  //     setIdRoute(null);
  //     router.push(`/seatselection/${idRoute}`);
  //   }
  // }, [idRoute, transition]);

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
        // specificDateTo: departureDate,
        startOfDay,
        endOfDay,
        wifi,
        coffee,
        power,
        restRoom,
        isOption,
        // specificDateFrom:
        //   departureDate &&
        //   `${departureDate.getFullYear()}-${String(
        //     departureDate.getMonth() + 1
        //   ).padStart(2, "0")}-${String(departureDate.getDate()).padStart(
        //     2,
        //     "0"
        //   )}`,
        select: selectMany,
      };

      if (departureFrom || arrivalTo || departureDate) {
        searchRouteMany<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(data)
          .then((response: IGetSearchRouteMany[] | null) => {
            if (response) {
              const filterHighlightedDates = response.map((item: IGetSearchRouteMany) => new Date(item.departureDate));

              setHighlightedDates(
                (departureFrom || arrivalTo) && filterHighlightedDates.length > 0 ? filterHighlightedDates : highlightedDatesRef.current
              );
              const newSearchDates: TypeBaseRoute[] | [] = response.map((item) => {
                const newItem: TypeBaseRoute = {
                  id: item.id,
                  departureDate: item.departureDate,
                  arrivalDate: item.arrivalDate,
                  departureFrom: item.departureFrom,
                  arrivalTo: item.arrivalTo,
                  routePrice: item.routePrice,
                  AvailableSeats: item.maxSeats - item.bookedSeats,
                };
                return newItem;
              });
              setSearchDates(newSearchDates);
            } else {
              console.log("No data received or an error occurred.");
            }
          })
          .catch((err) => console.error("Fetch failed:", err));
      } else {
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
  }, [departureFrom, arrivalTo, departureDate, wifi, coffee, power, restRoom, isOption]);

  useEffect(() => {
    if (clickToDate) {
      setIsLoadingOne(true);
      searchRouteOne<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(data)
        .then((response: IGetSearchRouteOne[] | null) => {
          if (response) {
            const dates: Date[] = response.map((route: { departureDate: string }) => new Date(route.departureDate));
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
  console.log("clickToDate", clickToDate);
  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className={cn(className, "px-4 bg-[white] rounded-xl min-h-[530px]")}>
      <form>
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
            isLoading={isLoadingOne}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="grow">
            <Typography variant="h6" gutterBottom>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("isOption")}
                    checked={watch("isOption") || false} // Переконайтеся, що значення не `undefined`
                    onChange={(e) => {
                      const checked = e.target.checked;
                      reset({
                        ...watch(),
                        isOption: checked,
                        wifi: checked,
                        coffee: checked,
                        power: checked,
                        restRoom: checked,
                      });
                    }}
                  />
                }
                label={<div style={{ display: "flex", alignItems: "center" }}> Additional options:</div>}
              />
            </Typography>
            <CheckboxOptionsMain register={register} watch={watch} reset={reset} />
          </div>
        </div>
        restRoom
      </form>

      {Array.isArray(searchDates) && searchDates.length > 0 && <TableSearchRoutes routes={searchDates} />}
      <div className="footer"></div>
    </div>
  );
}
