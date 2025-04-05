"use client";
import React, { useContext, memo, useEffect, useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import { PassengerDetails } from "@/types/route-driver.types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { colorCombinations } from "./colors";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  passengerDetails: (PassengerDetails | undefined)[];
  isRouteAgain?: boolean;
}

export default memo(function TablePassengerDetails({ passengerDetails }: Props) {
  const { t } = useAppTranslation("myroute");

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{t("seats")}</TableCell>
              <TableCell align="left">{t("order_passenger")}</TableCell>
              <TableCell align="left">{t("passenger")}</TableCell>
              <TableCell align="left">{t("phone")}</TableCell>
              <TableCell align="left">{t("email")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengerDetails.length !== 0 &&
              passengerDetails.map((row: PassengerDetails | undefined) => {
                return (
                  <TableRow
                    key={row?.seat || ""}
                    style={{
                      backgroundColor: colorCombinations[row?.orderPassengersId || 0].background,
                      color: colorCombinations[row?.orderPassengersId || 0].text,
                    }}
                  >
                    <TableCell align="left">{row?.seat || ""}</TableCell>
                    <TableCell align="left">{row?.orderPassengers || ""}</TableCell>
                    <TableCell align="left">{row?.passenger || ""}</TableCell>
                    <TableCell align="left">{row?.phone || ""}</TableCell>
                    <TableCell align="left">{row?.email || ""}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});
