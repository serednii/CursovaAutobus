"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { PassengerDetails } from "@/types/route-driver.types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";

const colorCombinations = [
  // { text: "#000000", background: "#FFFFFF" }, // Чорний текст на білому
  // { text: "#FFFFFF", background: "#000000" }, // Білий текст на чорному
  { text: "#FF5733", background: "#FDEDEC" }, // Яскравий помаранчевий текст на світлому фоні
  // { text: "#C70039", background: "#F9EBEA" }, // Темно-червоний текст на рожевому фоні
  { text: "#900C3F", background: "#F5EEF8" }, // Бордовий текст на лавандовому фоні
  // { text: "#581845", background: "#F4ECF7" }, // Темно-фіолетовий текст на світло-фіолетовому фоні
  { text: "#1F618D", background: "#EBF5FB" }, // Синій текст на блакитному фоні
  { text: "#2874A6", background: "#D6EAF8" }, // Темно-блакитний текст на світло-блакитному фоні
  { text: "#148F77", background: "#D1F2EB" }, // Зелений текст на світло-зеленому фоні
  { text: "#117A65", background: "#D4EFDF" }, // Темно-зелений текст на м'ятному фоні
  { text: "#145A32", background: "#E9F7EF" }, // Лісовий зелений текст на пастельно-зеленому фоні
  { text: "#B7950B", background: "#FEF9E7" }, // Гірчичний текст на світло-жовтому фоні
  { text: "#9A7D0A", background: "#FBEEE6" }, // Золотистий текст на кремовому фоні
  { text: "#6E2C00", background: "#FEF5E7" }, // Коричневий текст на персиковому фоні
  { text: "#641E16", background: "#FADBD8" }, // Темно-червоний текст на блідо-рожевому фоні
  { text: "#2E4053", background: "#EBEDEF" }, // Графітовий текст на світло-сірому фоні
  { text: "#34495E", background: "#D6DBDF" }, // Темно-сірий текст на попелястому фоні
  { text: "#7D3C98", background: "#EBDEF0" }, // Лавандовий текст на рожевуватому фоні
  { text: "#2980B9", background: "#D4E6F1" }, // Небесно-блакитний текст на світло-блакитному фоні
  { text: "#48C9B0", background: "#D1F2EB" }, // Аквамариновий текст на бірюзовому фоні
  { text: "#F4D03F", background: "#FCF3CF" }, // Сонячно-жовтий текст на світло-жовтому фоні
  { text: "#E67E22", background: "#FAE5D3" }, // Помаранчевий текст на персиковому фоні
  { text: "#EC7063", background: "#FDEDEC" }, // Рожевий текст на пастельно-рожевому фоні
  { text: "#AAB7B8", background: "#F2F4F4" }, // Сріблястий текст на світло-сірому фоні
  { text: "#839192", background: "#EAEDED" }, // Сталевий текст на сірому фоні
  { text: "#5D6D7E", background: "#D5D8DC" }, // Тьмяно-синій текст на попелястому фоні
  { text: "#A569BD", background: "#EBDEF0" }, // Бузковий текст на світло-рожевому фоні
  { text: "#D35400", background: "#FAD7A0" }, // Яскраво-оранжевий текст на бежевому фоні
  { text: "#B03A2E", background: "#F5B7B1" }, // Яскраво-червоний текст на світло-рожевому фоні
  { text: "#566573", background: "#D5DBDB" }, // Кам'яно-сірий текст на попелястому фоні
  { text: "#F1C40F", background: "#FEF9E7" }, // Яскраво-жовтий текст на світло-жовтому фоні
  { text: "#229954", background: "#D4EFDF" }, // Соковито-зелений текст на пастельно-зеленому фоні
  { text: "#138D75", background: "#D1F2EB" }, // Малахітовий текст на бірюзовому фоні
  { text: "#5499C7", background: "#D6EAF8" }, // Блакитний текст на світло-блакитному фоні
  { text: "#884EA0", background: "#EBDEF0" }, // Фіолетовий текст на рожевому фоні
  { text: "#E59866", background: "#FDEBD0" }, // Світло-помаранчевий текст на бежевому фоні
  { text: "#AF7AC5", background: "#EBDEF0" }, // Світло-фіолетовий текст на пастельно-фіолетовому фоні
  { text: "#E74C3C", background: "#FADBD8" }, // Яскраво-червоний текст на рожевому фоні
  { text: "#1ABC9C", background: "#D1F2EB" }, // Бірюзовий текст на світло-бірюзовому фоні
  { text: "#34495E", background: "#ECF0F1" }, // Темно-синій текст на світло-сірому фоні
  { text: "#F39C12", background: "#FDEBD0" }, // Помаранчевий текст на кремовому фоні
  { text: "#9B59B6", background: "#EBDEF0" }, // Фіолетовий текст на світло-фіолетовому фоні
  { text: "#2980B9", background: "#D6EAF8" }, // Синій текст на світло-блакитному фоні
  { text: "#D35400", background: "#F6DDCC" }, // Помаранчевий текст на пастельному фоні
  { text: "#8E44AD", background: "#F5EEF8" }, // Темно-фіолетовий текст на світло-фіолетовому фоні
  { text: "#27AE60", background: "#D5F5E3" }, // Смарагдовий текст на зеленому фоні
  { text: "#D5D8DC", background: "#283747" }, // Світло-сірий текст на темно-синьому фоні
  { text: "#E8DAEF", background: "#6C3483" }, // Пастельно-фіолетовий текст на темно-фіолетовому фоні
  { text: "#5DADE2", background: "#EBF5FB" }, // Яскраво-блакитний текст на блакитному фоні
];

interface Props {
  passengerDetails: (PassengerDetails | undefined)[];
  isRouteAgain?: boolean;
}

export default React.memo(function TablePassengerDetails({ passengerDetails }: Props) {
  const { t } = useTranslation();
  console.log(passengerDetails);
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
