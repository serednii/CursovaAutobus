"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { MyDialog } from "@/components/ui/MyDialog/MyDialog";
import { IRoutesTable } from "@/app/(passenger)/mybookings/page";

const paginationModel = { page: 0, pageSize: 5 };
interface Props<T> {
  routes: T[];
  isRouteAgain?: boolean;
  removeRoutePassenger?: (route: number) => void;
}

export default function TableMyBookings<T>({
  routes,
  isRouteAgain,
  removeRoutePassenger,
}: Props<T>) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [route, setRoute] = React.useState({} as IRoutesTable);
  const handleCancelOrderRoute = (route: any) => {
    console.log("Viewing route:", route);
    console.log("Canceling route:", route);
    setOpen(true);
    setRoute(route);
    // removeRoutePassenger(route.id);
    // router.push(`/myroute/${route.id}`);
    // alert(`Viewing route from ${route.id}`);
  };

  const setOk = () => removeRoutePassenger && removeRoutePassenger(route.id);

  // Основні колонки без колонки againRouter
  const baseColumns: GridColDef[] = [
    {
      field: "departureDate",
      headerName: "Date & Time",
      minWidth: 180,
      flex: 1,
    },
    { field: "departureFrom", headerName: "From", minWidth: 130, flex: 1 },
    { field: "arrivalTo", headerName: "To", minWidth: 130, flex: 1 },
    {
      field: "seatsNumber",
      headerName: "Seats Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "routeTotalPrice",
      headerName: "Total Price",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
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
              onClick={() => handleCancelOrderRoute(params.row)}
            >
              Cancel Booking
            </Button>
          ),
        },
      ]
    : baseColumns;

  return (
    <>
      <MyDialog
        title="You really want to delete the route?"
        // description="description"
        // content="content"
        setOpen={setOpen}
        open={open}
        setOk={setOk}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={routes}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
