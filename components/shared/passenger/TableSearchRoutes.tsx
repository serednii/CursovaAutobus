"use client";
import * as React from "react";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import TableRoutesUI from "@/components/ui/TableRoutesUI";

interface Props {
  routes: TypeBaseRoute[];
  status: "authenticated" | "loading" | "unauthenticated";
  t: any;
}

export default function TableSearchRoutes({ routes, status, t }: Props) {
  const router = useRouter();

  const handleViewRoute = (route: TypeBaseRoute) => {
    if (status !== "authenticated") {
      sessionStorage.setItem("idRoute", String(route.id));
      sessionStorage.setItem("transition", "seatselection");
    }

    const newRoute = route.isReservation ? "mybookings" : `/seatselection/${route.id}`;

    router.push(newRoute);
  };

  // Основні колонки без колонки againRouter
  const columns: GridColDef[] = [
    {
      field: "departureDate",
      headerName: t("form:departure_date"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "arrivalDate",
      headerName: t("form:arrival_date"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "departureFrom",
      headerName: t("form:from"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "arrivalTo",
      headerName: t("form:to"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "availableSeats",
      headerName: t("form:available_seats"),
      minWidth: 80,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: t("form:price"),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "viewRouter",
      headerName: t("form:view_route"),
      minWidth: 250,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.isReservation ? "secondary" : "primary"}
          size="small"
          onClick={() => handleViewRoute(params.row)}
        >
          {params.row.isReservation ? t("form:edit_reservation") : t("form:book_now")}
        </Button>
      ),
    },
  ];

  // Функція для зміни класу рядка за умовою isReservation
  const getRowClassName = (params: GridRowParams<TypeBaseRoute>) => {
    return params.row.isReservation ? "reservation-row" : "";
  };

  // Перевірка на наявність даних
  if (routes.length === 0) {
    return <Paper sx={{ width: "100%", padding: 2 }}>No routes available.</Paper>;
  }
  // Додаємо колонку againRouter, якщо isRouteAgain === true

  return <TableRoutesUI routes={routes} columns={columns} getRowClassName={getRowClassName} />;
}
