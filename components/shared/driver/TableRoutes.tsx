"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { useRouter } from "next/navigation";

const handleAgainRoute = (route: any) => {
  console.log("Activating route again:", route);
  // alert(`Activating route again from ${route.id}`);
};

const paginationModel = { page: 0, pageSize: 5 };
interface Props {
  routes: GetRoutesByDriverId[];
  isRouteAgain?: boolean;
}

export default function TableRoutes({ routes, isRouteAgain }: Props) {
  const router = useRouter();

  const handleViewRoute = (route: any) => {
    // console.log("Viewing route:", route);
    router.push(`/myroute/${route.id}`);
    // alert(`Viewing route from ${route.id}`);
  };

  // Основні колонки без колонки againRouter
  const baseColumns: GridColDef[] = [
    { field: "departureDate", headerName: "Departure Date", width: 180 },
    { field: "arrivalDate", headerName: "Arrival Date", width: 180 },
    { field: "departureFrom", headerName: "From", width: 130 },
    { field: "arrivalTo", headerName: "To", width: 130 },
    { field: "maxSeats", headerName: "Max Seats", width: 100 },
    { field: "bookedSeats", headerName: "Booked Seats", width: 100 },
    { field: "routePrice", headerName: "Price", width: 50 },
    {
      field: "viewRouter",
      headerName: "View Route",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleViewRoute(params.row)}
        >
          View Route
        </Button>
      ),
    },
  ];

  // Додаємо колонку againRouter, якщо isRouteAgain === true
  const columns: GridColDef[] = isRouteAgain
    ? [
        ...baseColumns,
        {
          field: "againRouter",
          headerName: "Activate Again",
          width: 250,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleAgainRoute(params.row)}
            >
              Activate this route again
            </Button>
          ),
        },
      ]
    : baseColumns;

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={routes}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
