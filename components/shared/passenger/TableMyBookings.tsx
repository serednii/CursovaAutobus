"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";

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
import { createColumnButton } from "../driver/TableRoutes";

interface Props {
  routes: Omit<IRoutesTable, "isReservation">[];
  isRouteAgain?: boolean;
}
// Функція для створення кнопок у таблиці
// const createColumnButton = (
//   field: string,
//   headerName: string,
//   width: { EN: number; UA: number; CS: number },
//   lang: "UA" | "EN" | "CS",
//   handleClick: (route: IRoutesTable) => void,
//   text: string
// ): GridColDef => ({
//   field,
//   headerName,
//   minWidth: width[lang],
//   flex: 1,
//   sortable: false,
//   renderCell: (params: GridRenderCellParams) => (
//     <Button
//       variant="contained"
//       color="primary"
//       size="small"
//       sx={{ fontSize: "10px" }}
//       onClick={() => handleClick(params.row)}
//     >
//       {text}
//     </Button>
//   ),
// });

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

  let lang: "UA" | "EN" | "CS" = "EN";
  lang = form("activate_again") === "Активувати ще раз" ? "UA" : lang;
  lang = form("activate_again") === "Activate Again" ? "EN" : lang;
  lang = form("activate_again") === "Znovu aktivovat" ? "CS" : lang;

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
      minWidth: 140,
      flex: 1,
    },
    { field: "departureFrom", headerName: form("from"), minWidth: 110, flex: 1 },
    { field: "arrivalTo", headerName: form("to"), minWidth: 110, flex: 1 },
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
        createColumnButton(
          "changeRouter",
          form("change_bookings"),
          { UA: 160, EN: 135, CS: 130 },
          lang,
          handleChangeOrderRoute,
          form("change_bookings")
        ),
        createColumnButton(
          "againRouter",
          form("cancel_booking"),
          { UA: 130, EN: 125, CS: 120 },
          lang,
          handleCancelOrderRoute,
          form("cancel_booking")
        ),
        createColumnButton(
          "detailsRoute",
          form("details_bookings"),
          { UA: 150, EN: 135, CS: 140 },
          lang,
          handleDetailOrderRoute,
          form("details_bookings")
        ),
      ]
    : baseColumns;

  return (
    <>
      <MyDialogIsDelete title={t("is_delete_route")} setOpen={setOpen} open={open} setOk={setOk} />

      {openDetails && (
        <ContainerViewCenter className="mx-auto max-w-[1920px] px-4" setOpen={setOpenDetails}>
          <MyDialogDetailsRoute passengersSeatsList={routeDetails} />
        </ContainerViewCenter>
      )}

      <TableRoutesUI routes={routes} columns={columns} />
    </>
  );
}
