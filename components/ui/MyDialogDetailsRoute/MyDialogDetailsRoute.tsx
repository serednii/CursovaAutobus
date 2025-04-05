import { ISubPassengersList } from "@/types/interface";
import { GridColDef } from "@mui/x-data-grid";
import "./dialog.css";
import TableRoutesUI from "../TableRoutesUI";
import { t } from "i18next";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface DialogProps {
  passengersSeatsList: ISubPassengersList | undefined;
}

export const MyDialogDetailsRoute = ({ passengersSeatsList }: DialogProps) => {
  const { t: form } = useAppTranslation("form");

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
      headerName: form("firstName"),
      minWidth: 180,
      flex: 1,
    },
    { field: "subLastName", headerName: form("lastName"), minWidth: 130, flex: 1 },
    { field: "subPhone", headerName: form("phone"), minWidth: 130, flex: 1 },
    {
      field: "subEmail",
      headerName: form("email"),
      minWidth: 150,
      flex: 1,
    },
  ];

  return <TableRoutesUI routes={subPassengersListWithId} columns={columns} />;
};
