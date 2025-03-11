import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/system";

interface Props<T> {
  routes: T[];
  columns: GridColDef[];
  pageSize?: number;
  pageSizeOptions?: number[];
  sx?: SxProps<Theme>; // Коректний тип для sx
}

export default function TableRoutesUI<T>({
  routes,
  columns,
  pageSize = 20,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  sx = { height: 400, width: "100%" },
}: Props<T>) {
  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={routes}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } }, // 10 рядків за замовчуванням
          }}
          pageSizeOptions={pageSizeOptions}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
