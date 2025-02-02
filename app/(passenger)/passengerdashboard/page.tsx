"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Container } from "@/components/shared/container";

import CheckboxOptions from "@/components/shared/form/checkboxOptions";
import CustomTextField from "@/components/shared/form/customTextField";

import { FormValues } from "@/types/form.types";

import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";

import { UserSession } from "@/types/session.types";
import SearchDataPicker from "@/components/shared/form/searchDataPicker/searchDataPicker";
import TableSearchRoutes from "@/components/shared/passenger/TableSearchRoutes";
import {
  GetSearchRoutePassengers,
  TableSearchRoutesType,
} from "@/types/route-passenger.types";
import { searchRoute } from "@/fetchFunctions/fetchroutes";

// type TSearchDates = {
//   departureDate: string; // Залишаємо це поле
//   arrivalDate: string; // Залишаємо це поле
//   departureFrom: string; // Залишаємо це поле
//   arrivalTo: string; // Залишаємо це поле
//   routePrice: number; // Залишаємо це поле
// };

export default function PassengersDashboard() {
  const highlightedDatesRef = useRef<Date[] | []>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[] | []>([]);
  const [searchDates, setSearchDates] = useState<TableSearchRoutesType[] | []>(
    []
  );
  // console.log("searchDate", searchDates);
  // console.log("highlightedDates", highlightedDates);

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
    const data = {
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

      select: {
        id: true,
        driverId: true,
        departureDate: true,
        arrivalDate: true,
        departureFrom: true,
        arrivalTo: true,
        busNumber: true,
        routePrice: true,
        notate: true,
        wifi: true,
        coffee: true,
        power: true,
        restRoom: true,
        modelBus: true,
        maxSeats: true,
        bookedSeats: true,
      },
    };

    (departureFrom || arrivalTo || departureDate) &&
      searchRoute(data)
        .then((response) => {
          if (response) {
            const routes: GetSearchRoutePassengers[] = response.routes;

            const filterHighlightedDates = routes.map(
              (item: any) => new Date(item.departureDate)
            );

            // console.log("filterHighlightedDates", filterHighlightedDates);

            setHighlightedDates(
              (departureFrom || arrivalTo) && filterHighlightedDates.length > 0
                ? filterHighlightedDates
                : highlightedDatesRef.current
            );

            console.log("Response----------:", routes);

            const newSearchDates: TableSearchRoutesType[] | [] = routes.map(
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

  useEffect(() => {
    const data = {
      select: {
        departureDate: true,
      },
    };

    searchRoute(data)
      .then((response) => {
        if (response) {
          const dates = response.routes.map(
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
    <Container>
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        {/* Форму тепер обгортаємо в onSubmit */}
        <form>
          {/* TextField з react-hook-form */}

          {/* Додавання CustomDatePicker */}

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
      </main>
      <div className="footer"></div>
    </Container>
  );
}
