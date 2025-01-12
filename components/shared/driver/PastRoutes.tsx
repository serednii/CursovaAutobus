"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const columns: GridColDef[] = [
  //   { field: "id", headerName: "Id", width: 30 },
  { field: "departureDate", headerName: "Departure Date", width: 130 },
  { field: "arrivalDate", headerName: "Arrival Date", width: 130 },
  { field: "departureFrom", headerName: "From", width: 130 },
  { field: "arrivalTo", headerName: "To", width: 130 },
  { field: "maxSeats", headerName: "Max Seats", width: 100 },
  { field: "bookedSeats", headerName: "Booked Seats", width: 100 },
  { field: "routePrice", headerName: "Price", width: 50 },
  {
    field: "viewRouter",
    headerName: "viewRouter",
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

  {
    field: "againRouter",
    headerName: "againRouter",
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
];

const handleViewRoute = (route: any) => {
  console.log("Viewing route:", route);
  alert(`Viewing route from ${route.id}`);
};

const handleAgainRoute = (route: any) => {
  console.log("Viewing route:", route);
  alert(`Viewing route from ${route.id}`);
};

const paginationModel = { page: 0, pageSize: 5 };

export default function PastRotes({ routes }: any) {
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
