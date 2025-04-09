import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/system";

interface Props<T extends { id: string | number }> {
  routes: T[]; // Видалено зайву перевірку
  columns: GridColDef[];
  pageSize?: number;
  pageSizeOptions?: number[];
  getRowClassName?: (params: GridRowParams<T>) => string;
  sx?: SxProps<Theme>;
}

export default function TableRoutesUI<T extends { id: string | number }>({
  routes,
  columns,
  getRowClassName,
  pageSize = 20,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  sx = { height: 400, width: "100%" },
}: Props<T>) {
  return (
    <div className="px-1 bg-white">
      <Paper sx={sx}>
        <DataGrid
          rows={routes}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } },
          }}
          pageSizeOptions={pageSizeOptions}
          getRowClassName={getRowClassName}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
