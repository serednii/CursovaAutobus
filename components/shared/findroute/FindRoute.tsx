"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";

import CustomTextField from "@/components/shared/form/CustomTextField";

import { FormValuesRoute } from "@/types/form.types";
import "react-datepicker/dist/react-datepicker.css";
import SearchDataPicker from "@/components/shared/form/searchDataPicker/SearchDataPicker";
import TableSearchRoutes from "@/components/shared/passenger/TableSearchRoutes";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import { cn } from "@/lib/utils";

import CheckboxOptionsMain from "../form/CheckboxOptionsMain";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import { FindRouteContext } from "./findRouteContext";
import { useClickToDate } from "./useClickToDate";
import { useSearchRouteMany } from "./useSearchRouteMany";
import { useFindRouteSession } from "./useFindRouteSession";
import { useFetchRoutesCity } from "@/app/(driver)/createroute/[id]/[type]/useFetchRoutesCity";

export default function FindRoute({ className }: { className?: string }) {
  const highlightedDatesRef = useRef<Date[] | []>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[] | []>([]);
  const [searchDates, setSearchDates] = useState<TypeBaseRoute[] | []>([]);
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
  });

  const departureFrom = watch("departureFrom")?.toLowerCase();
  const arrivalTo = watch("arrivalTo")?.toLowerCase();

  const { sessionIdUser, status } = useFindRouteSession();
  const { departureFromCity, setDepartureFromCity, arrivalToCity, setArrivalToCity, fullDepartureFromCity, fullArrivalToCity } = useFetchRoutesCity();

  useSearchRouteMany({
    setIsLoadingOne,
    watch,
    sessionIdUser,
    highlightedDatesRef,
    setHighlightedDates,
    setSearchDates,
  });

  useEffect(() => {
    if (searchDates && searchDates.length === 0) return;
    if (departureFrom || arrivalTo) {
      setDepartureFromCity(Array.from(new Set(searchDates.map((item) => item?.departureFromCity || ""))));
      setArrivalToCity(Array.from(new Set(searchDates.map((item) => item?.arrivalToCity || ""))));
    } else {
      setDepartureFromCity(fullDepartureFromCity.current);
      setArrivalToCity(fullArrivalToCity.current);
    }
    // }, [searchDates, departureFrom, arrivalTo]);
  }, [searchDates, departureFrom, arrivalTo, fullArrivalToCity, fullDepartureFromCity, setArrivalToCity, setDepartureFromCity]);
  const { clickToDate, setClickToDate } = useClickToDate({ setIsLoadingOne, setHighlightedDates, highlightedDatesRef, sessionIdUser });

  console.log("watch", watch());

  // if (status === "loading") return <MyScaleLoader />;
  // if (status === "loading") return <h1>Loading...</h1>;

  return (
    <FindRouteContext.Provider value={{ isLoadingOne, setIsLoadingOne }}>
      <div className={cn(className, "relative px-4 bg-[white] rounded-xl min-h-[530px]")}>
        {isLoadingOne && <MyScaleLoader className="absolute top-0 left-1/2" settings={{ height: 30, width: 5 }} />}
        <form className="mb-10">
          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomTextField
              register={register}
              setValue={setValue}
              errors={errors}
              // handleSearch={handleSearch}
              name={"departureFrom"}
              title={"Departure From"}
              className="grow"
              listCity={departureFromCity}
              action="searchRoute"
            />
            <CustomTextField
              register={register}
              setValue={setValue}
              errors={errors}
              name={"arrivalTo"}
              title={"Arrival To"}
              className="grow"
              listCity={arrivalToCity}
              action="searchRoute"
            />
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
