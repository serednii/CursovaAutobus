"use client";
import React, { useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { MyDialogIsDelete } from "@/components/ui/MyDialogIsDelete/MyDialogIsDelete";
import TableRoutesUI from "@/components/ui/TableRoutesUI";
import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";

interface Props {
  routes: IRoutesByIdDriver[];
  isRouteAgain?: boolean;
  setOk?: (id: number) => void;
}

// Функція для створення кнопок у таблиці
const createColumnButton = (
  field: string,
  headerName: string,
  width: number,
  handleClick: (route: IRoutesByIdDriver) => void,
  text: string
): GridColDef => ({
  field,
  headerName,
  width,
  sortable: false,
  renderCell: (params: GridRenderCellParams) => (
    <Button variant="contained" color="primary" size="small" onClick={() => handleClick(params.row)}>
      {text}
    </Button>
  ),
});

export default function TableRoutes({ routes, isRouteAgain, setOk }: Props) {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState<IRoutesByIdDriver | null>(null);
  const router = useRouter();

  const handleViewRoute = (route: IRoutesByIdDriver) => router.push(`/myroute/${route.id}`);
  const handleChangeRoute = (route: IRoutesByIdDriver) => router.push(`/createroute/${route.id}/change`);
  const handleAgainRoute = (route: IRoutesByIdDriver) => router.push(`/createroute/${route.id}/again`);

  const handleCancelRoute = (route: IRoutesByIdDriver) => {
    setOpen(true);
    setRoute(route);
  };

  const handleOkDeleteRoute = () => {
    if (route) {
      setOpen(false);
      setOk?.(route.id);
    }
  };

  // Основні колонки
  const baseColumns: GridColDef[] = [
    { field: "departureDate", headerName: "Departure Date", width: 150 },
    { field: "arrivalDate", headerName: "Arrival Date", width: 150 },
    { field: "departureFrom", headerName: "From", width: 100 },
    { field: "arrivalTo", headerName: "To", width: 100 },
    { field: "maxSeats", headerName: "Max Seats", width: 50 },
    { field: "bookedSeats", headerName: "Booked Seats", width: 50 },
    { field: "routePrice", headerName: "Price", width: 50 },
    createColumnButton("viewRoute", "View Route", 130, handleViewRoute, "View Route"),
  ];

  // Колонки, якщо isRouteAgain === true
  const extraColumns: GridColDef[] = isRouteAgain
    ? [
        createColumnButton("againRoute", "Activate Again", 200, handleAgainRoute, "Activate route again"),
        createColumnButton("deleteRoute", "Delete Route", 130, handleCancelRoute, "Delete Route"),
      ]
    : [
        createColumnButton("changeRoute", "Change Route", 150, handleChangeRoute, "Change Route"),
        createColumnButton("newRoute", "New Route", 130, handleAgainRoute, "New Route"),
        createColumnButton("cancelRoute", "Cancel Route", 130, handleCancelRoute, "Cancel Route"),
      ];

  return (
    <>
      <MyDialogIsDelete title="You really want to delete the route?" setOpen={setOpen} open={open} setOk={handleOkDeleteRoute} />
      <TableRoutesUI routes={routes} columns={[...baseColumns, ...extraColumns]} />
    </>
  );
}
