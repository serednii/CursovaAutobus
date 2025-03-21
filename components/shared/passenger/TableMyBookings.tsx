"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { IRoutesTable } from "@/types/route-passenger.types";
import { MyDialogIsDelete } from "@/components/ui/MyDialogIsDelete/MyDialogIsDelete";
import { MyDialogDetailsRoute } from "@/components/ui/MyDialogDetailsRoute/MyDialogDetailsRoute";
import { ISubPassengersList } from "@/types/interface";
import { ContainerViewCenter } from "@/components/ui/ContainerViewCenter";
import TableRoutesUI from "@/components/ui/TableRoutesUI";

interface Props<T> {
  routes: T[];
  isRouteAgain?: boolean;
  removeRoutePassenger?: (route: number) => void;
}

export default function TableMyBookings<T extends { id: string | number }>({ routes, isRouteAgain, removeRoutePassenger }: Props<T>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState({} as IRoutesTable);
  const [openDetails, setOpenDetails] = useState(false);
  const [routeDetails, setRouteDetails] = useState<ISubPassengersList>();

  const handleCancelOrderRoute = (route: IRoutesTable) => {
    setOpen(true);
    setRoute(route);
  };

  const handleChangeOrderRoute = (route: IRoutesTable) => {
    router.push(`/seatselection/${route.id}`);
  };

  const handleDetailOrderRoute = (route: IRoutesTable) => {
    setRouteDetails(route.passengersSeatsList);
    setOpenDetails(true);
    console.log("Route Details", route);
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
      minWidth: 90,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: "Price",
      minWidth: 60,
      flex: 1,
    },
  ];

  // Додаємо колонку againRouter, якщо isRouteAgain === true
  const columns: GridColDef[] = isRouteAgain
    ? [
        ...baseColumns,
        {
          field: "changeRouter",
          headerName: "Change Route",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleChangeOrderRoute(params.row)}>
              Change Booking
            </Button>
          ),
        },
        {
          field: "againRouter",
          headerName: "Activate Again",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleCancelOrderRoute(params.row)}>
              Cancel Booking
            </Button>
          ),
        },
        {
          field: "detailsRoute",
          headerName: "Details Route",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" size="small" onClick={() => handleDetailOrderRoute(params.row)}>
              Detais
            </Button>
          ),
        },
      ]
    : baseColumns;

  return (
    <>
      <MyDialogIsDelete
        title="You really want to delete the route?"
        // description="description"
        // content="content"
        setOpen={setOpen}
        open={open}
        setOk={setOk}
      />

      {openDetails && (
        <ContainerViewCenter className="mx-auto max-w-[1280px] px-4" setOpen={setOpenDetails}>
          <MyDialogDetailsRoute passengersSeatsList={routeDetails} />
        </ContainerViewCenter>
      )}

      <TableRoutesUI routes={routes} columns={columns} />
    </>
  );
}
