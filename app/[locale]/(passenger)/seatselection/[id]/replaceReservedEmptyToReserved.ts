import { IGetRouteSeatSelection } from "@/api/v1/getRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";

function replaceReservedEmptyToReserved({
  route,
}: {
  route: IGetRouteSeatSelection;
}): IGetRouteSeatSelection {
  if (route && route.busSeats) {
    const updatedPassengers = route.busSeats.map((seat) =>
      seat.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY
        ? { ...seat, busSeatStatus: SeatStatusEnum.RESERVED }
        : seat
    );
    route.busSeats = updatedPassengers;
  }

  return route;
}

export default replaceReservedEmptyToReserved;
