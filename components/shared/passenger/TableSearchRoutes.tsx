"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import TableRoutesUI from "@/components/ui/TableRoutesUI";

interface Props {
  routes: TypeBaseRoute[];
  status: "authenticated" | "loading" | "unauthenticated";
}

export default function TableSearchRoutes({ routes, status }: Props) {
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
      headerName: "Departure Date",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "arrivalDate",
      headerName: "Arrival Date",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "departureFrom",
      headerName: "From",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "arrivalTo",
      headerName: "To",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "availableSeats",
      headerName: "Available Seats",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: "Price",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "viewRouter",
      headerName: "View Route",
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.isReservation ? "secondary" : "primary"}
          size="small"
          onClick={() => handleViewRoute(params.row)}
        >
          {params.row.isReservation ? "Edit Reservation" : "Book Now"}
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

  return <TableRoutesUI routes={routes} columns={columns} />;
}
