"use client";
import * as React from "react";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import TableRoutesUI from "@/components/ui/TableRoutesUI";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  routes: TypeBaseRoute[];
  status: "authenticated" | "loading" | "unauthenticated";
}

export default function TableSearchRoutes({ routes, status }: Props) {
  const router = useRouter();

  const { t: form } = useAppTranslation("form");
  let lang: "UA" | "EN" | "CS" = "EN";
  lang = form("activate_again") === "Активувати ще раз" ? "UA" : lang;
  lang = form("activate_again") === "Activate Again" ? "EN" : lang;
  lang = form("activate_again") === "Znovu aktivovat" ? "CS" : lang;
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
      headerName: form("departure_date"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "arrivalDate",
      headerName: form("arrival_date"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "departureFrom",
      headerName: form("from"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "arrivalTo",
      headerName: form("to"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "availableSeats",
      headerName: form("available_seats"),
      minWidth: 80,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: form("price"),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "viewRouter",
      headerName: form("view_route"),
      minWidth: { UA: 220, EN: 165, CS: 160 }[lang],
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.isReservation ? "secondary" : "primary"}
          size="small"
          onClick={() => handleViewRoute(params.row)}
        >
          {params.row.isReservation ? form("edit_reservation") : form("book_now")}
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
