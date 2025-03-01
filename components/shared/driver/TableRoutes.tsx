"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { useRouter } from "next/navigation";
import { IRoutesByIdDriver, IRoutesTable } from "@/types/route-passenger.types";
import { MyDialogIsDelete } from "@/components/ui/MyDialogIsDelete/MyDialogIsDelete";
import fetchDeleteRouteById from "@/fetchFunctions/fetchDeleteRouteById";
import toast from "react-hot-toast";

const handleAgainRoute = (route: any) => {
  console.log("Activating route again:", route);
  // alert(`Activating route again from ${route.id}`);
};

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
    console.log("Cancel route again:", route);
    setOpen(true);
    setRoute(route);
  };

  const handleOkDeleteRoute = (route: IRoutesByIdDriver | null) => {
    console.log("Delete route again:", route);
    if (route) {
      setOpen(false);
      setOk && setOk(route.id);
    }
  };

  const handleCngeRoute = (route: IRoutesByIdDriver) => {
    router.push(`/editroute/${route.id}`);
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
          field: "deleteRouter",
          headerName: "Delete Route",
          width: 250,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCancelRoute(params.row)}>
              Delete Route
            </Button>
          ),
        },
        {
          field: "againRouter",
          headerName: "Activate Again",
          width: 250,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleAgainRoute(params.row)}>
              Activate this route again
            </Button>
          ),
        },
      ]
    : [
        ...baseColumns,
        {
          field: "againRouter",
          headerName: "Activate Again",
          width: 250,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCancelRoute(params.row)}>
              Cancel Route
            </Button>
          ),
        },
        {
          field: "changeRouter",
          headerName: "Change Route",
          width: 250,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCngeRoute(params.row)}>
              Change Route
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
