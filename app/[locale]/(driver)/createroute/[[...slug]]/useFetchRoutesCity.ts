import { useEffect, useRef, useState } from "react";
import { selectRouteCity } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { IGetRouteCity } from "@/fetchFunctions/v1/searchRoute";
import { fetchGetUniqueRoutes } from "@/fetchFunctions/fetchGetUniqueRoutes";

export const useFetchRoutesCity = () => {
  const [departureFromCity, setDepartureFromCity] = useState<string[]>([]);
  const [arrivalToCity, setArrivalToCity] = useState<string[]>([]);
  const fullDepartureFromCity = useRef<string[] | []>([]);
  const fullArrivalToCity = useRef<string[] | []>([]);
  console.log("fullArrivalToCity", departureFromCity);
  useEffect(() => {
    console.log("fetch routes byCity************************************");
    fetchGetUniqueRoutes.searchRoute(selectRouteCity, "byCity").then((value) => {
      const result = value as IGetRouteCity[] | null;
      console.log("result city", result);

      if (result === null || result.length === 0) return;
      const departureFromCityFull = new Set(result.map((item) => item.departureFrom));
      const arrivalToFull = new Set(result.map((item) => item.arrivalTo));
      const departureFromCity = Array.from(departureFromCityFull);
      const arrivalToCity = Array.from(arrivalToFull);
      setDepartureFromCity(departureFromCity);
      setArrivalToCity(arrivalToCity);
      fullDepartureFromCity.current = departureFromCity;
      fullArrivalToCity.current = arrivalToCity;
    });
  }, [setDepartureFromCity, setArrivalToCity]);

  return {
    departureFromCity,
    setDepartureFromCity,
    arrivalToCity,
    setArrivalToCity,
    fullDepartureFromCity,
    fullArrivalToCity,
  };
};
