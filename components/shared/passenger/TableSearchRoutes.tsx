"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { TypeBaseRoute } from "@/types/route-passenger.types";
import { useSessionStorage } from "@uidotdev/usehooks";

// const paginationModel = { page: 0, pageSize: 5 };

interface Props {
  routes: TypeBaseRoute[];
}

export default function TableSearchRoutes({ routes }: Props) {
  const router = useRouter();
  const [idRoute, setIdRoute] = useSessionStorage<number | null>(
    "idRoute",
    null
  );
  const [transition, setTransition] = useSessionStorage<string>(
    "transition",
    ""
  );

  const handleViewRoute = (route: TypeBaseRoute) => {
    // console.log("Viewing route:", route);
    setIdRoute(route.id);
    setTransition("seatselection");
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
