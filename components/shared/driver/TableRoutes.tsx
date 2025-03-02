"use client";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import { MyDialogIsDelete } from "@/components/ui/MyDialogIsDelete/MyDialogIsDelete";

const paginationModel = { page: 0, pageSize: 5 };
interface Props {
  routes: IRoutesByIdDriver[];
  isRouteAgain?: boolean;
  setOk?: (id: number) => void;
}

export default function TableRoutes({ routes, isRouteAgain, setOk }: Props) {
  const [open, setOpen] = useState(false);

  const [route, setRoute] = useState<IRoutesByIdDriver | null>(null);
  const router = useRouter();

  console.log("Activating route again:", routes);
  const handleViewRoute = (route: IRoutesByIdDriver) => {
    router.push(`/myroute/${route.id}`);
  };

  const handleCancelRoute = (route: IRoutesByIdDriver) => {
    setOpen(true);
    setRoute(route);
  };

  const handleOkDeleteRoute = (route: IRoutesByIdDriver | null) => {
    if (route) {
      setOpen(false);
      setOk && setOk(route.id);
    }
  };

  const handleChangeRoute = (route: IRoutesByIdDriver) => {
    router.push(`/createroute/${route.id}/change`);
  };
  const handleAgainRoute = (route: any) => {
    router.push(`/createroute/${route.id}/again`);
  };

  // Основні колонки без колонки againRouter
  const baseColumns: GridColDef[] = [
    { field: "departureDate", headerName: "Departure Date", width: 150 },
    { field: "arrivalDate", headerName: "Arrival Date", width: 150 },
    { field: "departureFrom", headerName: "From", width: 100 },
    { field: "arrivalTo", headerName: "To", width: 100 },
    { field: "maxSeats", headerName: "Max Seats", width: 50 },
    { field: "bookedSeats", headerName: "Booked Seats", width: 50 },
    { field: "routePrice", headerName: "Price", width: 50 },
    {
      field: "viewRouter",
      headerName: "View Route",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small" onClick={() => handleViewRoute(params.row)}>
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
          width: 200,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleAgainRoute(params.row)}>
              Activate route again
            </Button>
          ),
        },
        {
          field: "deleteRouter",
          headerName: "Delete Route",
          width: 130,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCancelRoute(params.row)}>
              Delete Route
            </Button>
          ),
        },
      ]
    : [
        ...baseColumns,
        {
          field: "changeRouter",
          headerName: "Change Route",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleChangeRoute(params.row)}>
              Change Route
            </Button>
          ),
        },
        {
          field: "Cancel Route",
          headerName: "Cancel Route",
          width: 130,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCancelRoute(params.row)}>
              Cancel Route
            </Button>
          ),
        },
      ];

  return (
    <>
      <MyDialogIsDelete
        title="You really want to delete the route?"
        // description="description"
        // content="content"
        setOpen={setOpen}
        open={open}
        setOk={() => handleOkDeleteRoute(route)}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={routes} columns={columns} initialState={{ pagination: { paginationModel } }} pageSizeOptions={[5, 10]} sx={{ border: 0 }} />
      </Paper>
    </>
  );
}
