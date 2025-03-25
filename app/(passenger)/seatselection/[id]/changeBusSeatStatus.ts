"use client";
// import { useEffect } from "react";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";
// import { cloneDeep } from "lodash";

export default function changeBusSeatStatus({ userSessionId, route }: { userSessionId: number; route: IGetRouteSeatSelection | null }): void {
  // useEffect(() => {
  if (!userSessionId) return;

  if (route && route.busSeats) {
    const updatedPassengers = route.busSeats.map((seat) =>
      seat.passenger === userSessionId && seat.busSeatStatus === SeatStatusEnum.RESERVED ? { ...seat, busSeatStatus: SeatStatusEnum.SELECTED } : seat
    );
    route.busSeats = updatedPassengers;
  }
  // }, [route, userSessionId]);
}
