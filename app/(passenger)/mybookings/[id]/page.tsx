import { routeFetch } from "@/fetchFunctions/fetchdriver";
import { IGetRouteById } from "@/types/route-driver.types";
import React from "react";

interface Props {
  params: { id: string };
}

interface IGetRoutePassengerById extends IGetRouteById {}

export default async function MyBookings({ params }: Props) {
  const id = await params.id;

  const routeRaw: IGetRoutePassengerById[] | null =
    (await routeFetch(Number(id))) || ({} as IGetRoutePassengerById[]);
  console.log("routeRaw", id, routeRaw);
  return <div>MyBookings{id}</div>;
}
