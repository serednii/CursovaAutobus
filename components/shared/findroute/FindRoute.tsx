"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Container } from "@/components/shared/Container";

import CheckboxOptions from "@/components/shared/form/CheckboxOptions";
import CustomTextField from "@/components/shared/form/CustomTextField";

import { FormValues } from "@/types/form.types";

import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";

import SearchDataPicker from "@/components/shared/form/searchDataPicker/SearchDataPicker";
import TableSearchRoutes from "@/components/shared/passenger/TableSearchRoutes";
import {
  GetSearchRoutePassengers,
  TypeBaseRoute,
} from "@/types/route-passenger.types";
import { UserSession } from "@/types/next-auth";
import { cn } from "@/lib/utils";
import searchRoute from "@/fetchFunctions/searchRoute";
import { selectMany, selectOne } from "./const";
import {
  IGetSearchRouteMany,
  IGetSearchRouteManyOption,
  IGetSearchRouteOne,
  IGetSearchRouteOneOption,
} from "@/types/searchroute.types";

interface IGetSearchRouteManyOptionData {
  departureSearch: string | undefined;
  arrivalToSearch: string | undefined;
  endOfDay: Date;
  startOfDay: Date;
  select: IGetSearchRouteManyOption;
}

interface IGetSearchRouteOneOptionData {
  select: IGetSearchRouteOneOption;
}

export default function FindRoute({ className }: { className?: string }) {
  const highlightedDatesRef = useRef<Date[] | []>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[] | []>([]);
  const [searchDates, setSearchDates] = useState<TypeBaseRoute[] | []>([]);
  console.log("searchDate", searchDates);
  console.log("highlightedDates", highlightedDates);

  const { data: session, status } = useSession();

  let sessionUser: UserSession | null = null;

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

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
    },
  });

  const departureFrom = watch("departureFrom")?.trim();
  const arrivalTo = watch("arrivalTo")?.trim();
  const departureDate = watch("departureDate");

  useEffect(() => {
    // console.log("Значення змінилось departureFrom:", departureFrom);
    // console.log("Значення змінилось arrivalTo:", arrivalTo);
    const newDate =
      departureDate &&
      `${departureDate.getFullYear()}-${String(
        departureDate.getMonth() + 1
      ).padStart(2, "0")}-${String(departureDate.getDate()).padStart(2, "0")}`;

    const startOfDay = new Date(`${newDate}T00:00:00`);
    const endOfDay = new Date(`${newDate}T23:59:59`);

    console.log("startOfDay", startOfDay, newDate);

    console.log("endOfDay", endOfDay);
    const data: IGetSearchRouteManyOptionData = {
      departureSearch: departureFrom || undefined,
      arrivalToSearch: arrivalTo || undefined,
      // specificDateTo: departureDate,
      startOfDay,
      endOfDay,
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

    (departureFrom || arrivalTo || departureDate) &&
      searchRoute<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(data)
        .then((response: IGetSearchRouteMany[] | null) => {
          if (response) {
            // const routes: GetSearchRoutePassengers[] = response.routes;

            const filterHighlightedDates = response.map(
              (item: any) => new Date(item.departureDate)
            );

            // console.log("filterHighlightedDates", filterHighlightedDates);

            setHighlightedDates(
              (departureFrom || arrivalTo) && filterHighlightedDates.length > 0
                ? filterHighlightedDates
                : highlightedDatesRef.current
            );

            console.log("Response----------:", response);

            const newSearchDates: TypeBaseRoute[] | [] = response.map(
              (item: GetSearchRoutePassengers) => ({
                id: item.id,
                departureDate: item.departureDate,
                arrivalDate: item.arrivalDate,
                departureFrom: item.departureFrom,
                arrivalTo: item.arrivalTo,
                routePrice: item.routePrice,
                AvailableSeats: item.maxSeats - item.bookedSeats,
              })
            );

            setSearchDates(newSearchDates);
          } else {
            console.log("No data received or an error occurred.");
          }
        })
        .catch((err) => console.error("Fetch failed:", err));
    // Виконайте додаткову логіку тут
  }, [departureFrom, arrivalTo, departureDate]);

  const data: IGetSearchRouteOneOptionData = {
    select: selectOne,
  };

  useEffect(() => {
    searchRoute<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(data)
      .then((response: IGetSearchRouteOne[] | null) => {
        if (response) {
          const dates = response.map(
            (route: any) => new Date(route.departureDate)
          );
          setHighlightedDates(dates);
          highlightedDatesRef.current = dates;
          // console.log("Response----------:", dates);
        } else {
          console.log("No data received or an error occurred.");
        }
      })
      .catch((err) => console.error("Fetch failed:", err));
    // Виконайте додаткову логіку тут
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className={cn(className, "px-4 bg-[white] rounded-xl ")}>
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
          <CustomTextField
            register={register}
            errors={errors}
            name={"arrivalTo"}
            title={"Arrival To"}
            className="grow"
          />
          <SearchDataPicker
            title="Departure Date"
            name="departureDate"
            register={register}
            errors={errors}
            highlightedDates={highlightedDates}
            control={control} // Передаємо control
            className="pt-8 grow search-data-picker"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="grow">
            <Typography variant="h6" gutterBottom>
              Additional options:
            </Typography>
            <CheckboxOptions register={register} watch={watch} />
          </div>
        </div>
      </form>

      {searchDates && searchDates.length > 0 && (
        <TableSearchRoutes routes={searchDates} />
      )}
      <div className="footer"></div>
    </div>
  );
}
