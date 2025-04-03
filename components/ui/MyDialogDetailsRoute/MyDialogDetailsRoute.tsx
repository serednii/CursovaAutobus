import { ISubPassengersList } from "@/types/interface";
import { GridColDef } from "@mui/x-data-grid";
import "./dialog.css";
import TableRoutesUI from "../TableRoutesUI";
import { t } from "i18next";

interface DialogProps {
  passengersSeatsList: ISubPassengersList | undefined;
  t: any;
}

export const MyDialogDetailsRoute = ({ passengersSeatsList, t }: DialogProps) => {
  if (!passengersSeatsList) return null;
  const subPassengersList = passengersSeatsList.subPassengersList;

  const subPassengersListWithId = subPassengersList?.map((passenger, index) => ({
    ...passenger,
    id: index, // або passenger.someUniqueField якщо є унікальний ідентифікатор
  }));

  // console.log("MyDialogDetailsRoute", subPassengersList);

  const columns: GridColDef[] = [
    {
      field: "subFirstName",
      headerName: t("form:subFirstName"),
      minWidth: 180,
      flex: 1,
    },
    { field: "subLastName", headerName: t("form:subLastName"), minWidth: 130, flex: 1 },
    { field: "subPhone", headerName: t("form:subPhone"), minWidth: 130, flex: 1 },
    {
      field: "subEmail",
      headerName: t("form:subEmail"),
      minWidth: 150,
      flex: 1,
    },
  ];

  return <TableRoutesUI routes={subPassengersListWithId} columns={columns} />;
};
