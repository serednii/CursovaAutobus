import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { IUpdateRoute } from "@/types/route-passenger.types";
import { ISubPassengersList } from "@/types/interface";
import { SubPassengerGroup } from "@/types/form.types";
import { SeatStatusEnum } from "@/enum/shared.enums";

export const transformData = (id: number, data: SubPassengerGroup, dataLayoutBus: ILayoutData, sessionUser: UserSession): IUpdateRoute => {
  // Змінюємо статус вибраних місць на зарезервовані
  const busSeats = dataLayoutBus.passenger.map((seat) => ({
    ...seat,
    busSeatStatus: seat.busSeatStatus === SeatStatusEnum.SELECTED ? SeatStatusEnum.RESERVED : seat.busSeatStatus,
  }));

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: Number(sessionUser.id),
  };

  if (
    data.subFirstName &&
    data.subLastName &&
    data.subPhone &&
    data.subEmail &&
    Array.isArray(data.subFirstName) &&
    Array.isArray(data.subLastName) &&
    Array.isArray(data.subPhone) &&
    Array.isArray(data.subEmail) &&
    data.subFirstName.length === data.subLastName.length &&
    data.subLastName.length === data.subPhone.length &&
    data.subPhone.length === data.subEmail.length
  ) {
    const subPassengersList = data.subFirstName.map((_, index) => ({
      subFirstName: data.subFirstName ? data.subFirstName[index] : "",
      subLastName: data.subLastName ? data.subLastName[index] : "",
      subPhone: data.subPhone ? data.subPhone[index] : "",
      subEmail: data.subEmail ? data.subEmail[index] : "",
    }));
    passengersSeatsList.subPassengersList = subPassengersList;
  }

  return {
    id,
    busSeats,
    bookedSeats: busSeats.filter((seat) => seat.busSeatStatus === SeatStatusEnum.RESERVED).length,
    passengersSeatsList: [passengersSeatsList],
  };
};
