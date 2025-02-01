"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { TableSearchRoutesType } from "@/types/route-passenger.types";

const paginationModel = { page: 0, pageSize: 5 };

interface Props {
  routes: TableSearchRoutesType[];
}

export default function TableSearchRoutes({ routes }: Props) {
  const router = useRouter();

  const handleViewRoute = (route: TableSearchRoutesType) => {
    // console.log("Viewing route:", route);
    router.push(`/seatselection/${route.id}`);
    // alert(`Viewing route from ${route.id}`);
  };

  // Основні колонки без колонки againRouter
  const columns: GridColDef[] = [
    {
      field: "departureDate",
      headerName: "Departure Date",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "arrivalDate",
      headerName: "Arrival Date",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "departureFrom",
      headerName: "From",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "arrivalTo",
      headerName: "To",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "availableSeats",
      headerName: "Available Seats",
      minWidth: 100,
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
      minWidth: 130,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleViewRoute(params.row)}
        >
          Book Now
        </Button>
      ),
    },
  ];

  // Додаємо колонку againRouter, якщо isRouteAgain === true

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={routes}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        // pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
