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
import { useDeletePassengerRoute } from "@/app/[locale]/(passenger)/mybookings/useDeletePassengerRoute";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  routes: Omit<IRoutesTable, "isReservation">[];
  isRouteAgain?: boolean;
}

export default function TableMyBookings({ routes, isRouteAgain }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState({} as IRoutesTable);
  const [openDetails, setOpenDetails] = useState(false);
  const [routeDetails, setRouteDetails] = useState<ISubPassengersList>();
  const { userSessionId } = useGetSessionParams();
  const { removeRoutePassenger } = useDeletePassengerRoute(routes, userSessionId);
  const { t } = useAppTranslation("mybookings");
  const { t: form } = useAppTranslation("form");

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
    // console.log("Route Details", route);
  };

  const setOk = () => removeRoutePassenger(route.id);

  // Основні колонки без колонки againRouter
  const baseColumns: GridColDef[] = [
    {
      field: "departureDate",
      headerName: form("date_and_time"),
      minWidth: 180,
      flex: 1,
    },
    { field: "departureFrom", headerName: form("from"), minWidth: 130, flex: 1 },
    { field: "arrivalTo", headerName: form("to"), minWidth: 130, flex: 1 },
    {
      field: "seatsNumber",
      headerName: form("seats_number"),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "routeTotalPrice",
      headerName: form("total_price"),
      minWidth: 90,
      flex: 1,
    },
    {
      field: "routePrice",
      headerName: form("price"),
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
          headerName: form("change_route"),
          minWidth: 180,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleChangeOrderRoute(params.row)}
            >
              {form("change_route")}
            </Button>
          ),
        },
        {
          field: "againRouter",
          headerName: form("cancel_booking"),
          minWidth: 100,
          maxWidth: 200,
          width: 200,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleCancelOrderRoute(params.row)}
            >
              {form("cancel_booking")}
            </Button>
          ),
        },
        {
          field: "detailsRoute",
          headerName: form("details_route"),
          minWidth: 200,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleDetailOrderRoute(params.row)}
            >
              {form("details_route")}
            </Button>
          ),
        },
      ]
    : baseColumns;

  return (
    <>
      <MyDialogIsDelete title={t("is_delete_route")} setOpen={setOpen} open={open} setOk={setOk} />

      {openDetails && (
        <ContainerViewCenter className="mx-auto max-w-[1280px] px-4" setOpen={setOpenDetails}>
          <MyDialogDetailsRoute passengersSeatsList={routeDetails} />
        </ContainerViewCenter>
      )}

      <TableRoutesUI routes={routes} columns={columns} />
    </>
  );
}
