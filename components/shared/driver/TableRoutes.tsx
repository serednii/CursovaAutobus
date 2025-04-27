"use client";
import React, { useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { MyDialogIsDelete } from "@/components/ui/MyDialogIsDelete/MyDialogIsDelete";
import TableRoutesUI from "@/components/ui/TableRoutesUI";

import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import { IRoutesByIdDriver } from "@/fetchApi/v1/getRoutes";
import { useDeleteRoute } from "@/app/[locale]/(driver)/myroutes/useDeleteRoute";

interface Props {
  routes: IRoutesByIdDriver[];
  isRouteAgain?: boolean;
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
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => handleClick(params.row)}
    >
      {text}
    </Button>
  ),
});

export default function TableRoutes({ routes, isRouteAgain }: Props) {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState<IRoutesByIdDriver | null>(null);
  const router = useRouter();
  const { t: form } = useAppTranslation("form");
  const { t } = useAppTranslation("myroutes");

  const setRouteToDelete = useDeleteRoute();

  const handleViewRoute = (route: IRoutesByIdDriver) => router.push(`/myroute/${route.id}`);
  const handleChangeRoute = (route: IRoutesByIdDriver) =>
    router.push(`/createroute/${route.id}/change`);
  const handleAgainRoute = (route: IRoutesByIdDriver) =>
    router.push(`/createroute/${route.id}/again`);

  const handleCancelRoute = (route: IRoutesByIdDriver) => {
    setOpen(true);
    setRoute(route);
  };

  const handleOkDeleteRoute = () => {
    if (route) {
      setOpen(false);
      setRouteToDelete?.(route.id);
    }
  };

  // Основні колонки
  const baseColumns: GridColDef[] = [
    { field: "departureDate", headerName: form("departure_date"), width: 150 },
    { field: "arrivalDate", headerName: form("arrival_date"), width: 150 },
    { field: "departureFrom", headerName: form("from"), width: 100 },
    { field: "arrivalTo", headerName: form("to"), width: 100 },
    { field: "maxSeats", headerName: form("max_seats"), width: 50 },
    { field: "bookedSeats", headerName: form("booked_seats"), width: 50 },
    { field: "routePrice", headerName: form("price"), width: 50 },
    createColumnButton("viewRoute", form("view_route"), 130, handleViewRoute, form("view_route")),
  ];

  // Колонки, якщо isRouteAgain === true
  const extraColumns: GridColDef[] = isRouteAgain
    ? [
        createColumnButton(
          "againRoute",
          form("activate_again"),
          200,
          handleAgainRoute,
          t("activate_again")
        ),
        createColumnButton(
          "deleteRoute",
          form("delete_route"),
          130,
          handleCancelRoute,
          form("delete_route")
        ),
      ]
    : [
        createColumnButton(
          "changeRoute",
          form("change_route"),
          150,
          handleChangeRoute,
          form("change_route")
        ),
        createColumnButton("newRoute", form("new_route"), 130, handleAgainRoute, form("new_route")),
        createColumnButton(
          "cancelRoute",
          form("cancel_route"),
          130,
          handleCancelRoute,
          form("cancel_route")
        ),
      ];

  return (
    <>
      <MyDialogIsDelete
        title={t("is_delete_route")}
        setOpen={setOpen}
        open={open}
        setOk={handleOkDeleteRoute}
      />
      <TableRoutesUI routes={routes} columns={[...baseColumns, ...extraColumns]} />
    </>
  );
}
