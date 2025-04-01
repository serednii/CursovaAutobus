import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";

function replaceReservedToSelected({ userSessionId, route }: { userSessionId: number; route: IGetRouteSeatSelection }): IGetRouteSeatSelection {
  if (route && route.busSeats) {
    const updatedPassengers = route.busSeats.map((seat) =>
      seat.passenger === userSessionId && seat.busSeatStatus === SeatStatusEnum.RESERVED ? { ...seat, busSeatStatus: SeatStatusEnum.SELECTED } : seat
    );
    route.busSeats = updatedPassengers;
  }
  return route;
}

export default replaceReservedToSelected;
