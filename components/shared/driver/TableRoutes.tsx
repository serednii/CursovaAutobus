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
  width: { EN: number; UA: number; CS: number },
  lang: "UA" | "EN" | "CS",
  handleClick: (route: IRoutesByIdDriver) => void,
  text: string
): GridColDef => ({
  field,
  headerName,
  minWidth: width[lang],
  flex: 1,
  sortable: false,
  renderCell: (params: GridRenderCellParams) => (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{ fontSize: "10px" }}
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

  let lang: "UA" | "EN" | "CS" = "EN";
  lang = form("activate_again") === "Активувати ще раз" ? "UA" : lang;
  lang = form("activate_again") === "Activate Again" ? "EN" : lang;
  lang = form("activate_again") === "Znovu aktivovat" ? "CS" : lang;

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
    { field: "departureDate", headerName: form("departure_date"), minWidth: 130, flex: 1 },
    { field: "arrivalDate", headerName: form("arrival_date"), minWidth: 130, flex: 1 },
    { field: "departureFrom", headerName: form("from"), minWidth: 100, flex: 1 },
    { field: "arrivalTo", headerName: form("to"), minWidth: 100, flex: 1 },
    { field: "maxSeats", headerName: form("max_seats"), minWidth: 90, flex: 1 },
    { field: "bookedSeats", headerName: form("booked_seats"), minWidth: 90, flex: 1 },
    { field: "routePrice", headerName: form("price"), minWidth: 50, flex: 1 },
    createColumnButton(
      "viewRoute",
      form("view_route"),
      { UA: 170, EN: 105, CS: 120 },
      lang,
      handleViewRoute,
      form("view_route")
    ),
  ];

  // Колонки, якщо isRouteAgain === true
  const extraColumns: GridColDef[] = isRouteAgain
    ? [
        createColumnButton(
          "againRoute",
          form("activate_again"),
          { UA: 150, EN: 125, CS: 125 },
          lang,
          handleAgainRoute,
          form("activate_again")
        ),
        createColumnButton(
          "deleteRoute",
          form("delete_route"),
          { UA: 170, EN: 120, CS: 120 },
          lang,
          handleCancelRoute,
          form("delete_route")
        ),
      ]
    : [
        createColumnButton(
          "changeRoute",
          form("change_route"),
          { UA: 150, EN: 120, CS: 110 },
          lang,
          handleChangeRoute,
          form("change_route")
        ),
        createColumnButton(
          "newRoute",
          form("new_route"),
          { UA: 140, EN: 100, CS: 100 },
          lang,
          handleAgainRoute,
          form("new_route")
        ),
        createColumnButton(
          "cancelRoute",
          form("cancel_route"),
          { UA: 180, EN: 120, CS: 120 },
          lang,
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
