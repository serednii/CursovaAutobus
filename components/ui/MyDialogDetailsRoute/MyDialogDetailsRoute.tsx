import { ISubPassengersList } from "@/types/interface";
import { GridColDef } from "@mui/x-data-grid";
import "./dialog.css";
import TableRoutesUI from "../TableRoutesUI";

interface DialogProps {
  passengersSeatsList: ISubPassengersList | undefined;
}

export const MyDialogDetailsRoute = ({ passengersSeatsList }: DialogProps) => {
  if (!passengersSeatsList) return null;
  const subPassengersList = passengersSeatsList.subPassengersList;

  const subPassengersListWithId = subPassengersList?.map((passenger, index) => ({
    ...passenger,
    id: index, // або passenger.someUniqueField якщо є унікальний ідентифікатор
  }));

  console.log("MyDialogDetailsRoute", subPassengersList);

  const columns: GridColDef[] = [
    {
      field: "subFirstName",
      headerName: "SubFirst Name",
      minWidth: 180,
      flex: 1,
    },
    { field: "subLastName", headerName: "SubLast Name", minWidth: 130, flex: 1 },
    { field: "subPhone", headerName: "Sub Phone", minWidth: 130, flex: 1 },
    {
      field: "subEmail",
      headerName: "Sub Email",
      minWidth: 150,
      flex: 1,
    },
  ];

  return <TableRoutesUI routes={subPassengersListWithId} columns={columns} />;
};
//successful
// import { ISubPassengersList } from "@/types/interface";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import "./dialog.css";
// import { useRef } from "react";

// interface DialogProps {
//   passengersSeatsList: ISubPassengersList | undefined;
// }

// export const MyDialogDetailsRoute = ({ passengersSeatsList }: DialogProps) => {
//   const subPassengersList = passengersSeatsList?.subPassengersList;
//   const useIdRef = useRef<number>(0);

//   console.log("MyDialogDetailsRoute", subPassengersList);

//   const paginationModel = { page: 0, pageSize: 5 };

//   const columns: GridColDef[] = [
//     {
//       field: "subFirstName",
//       headerName: "SubFirst Name",
//       minWidth: 180,
//       flex: 1,
//     },
//     { field: "subLastName", headerName: "SubLast Name", minWidth: 130, flex: 1 },
//     { field: "subPhone", headerName: "Sub Phone", minWidth: 130, flex: 1 },
//     {
//       field: "subEmail",
//       headerName: "Sub Email",
//       minWidth: 150,
//       flex: 1,
//     },
//   ];

//   return (
//     <Paper sx={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={subPassengersList}
//         getRowId={() => `MyDialogDetailsRoute${useIdRef.current++}`} //
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// };
