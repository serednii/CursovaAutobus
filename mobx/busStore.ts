import { makeAutoObservable, runInAction } from "mobx";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { SubPassengerDetails } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { NullableNumber } from "@/types/types";
import debounce from "lodash/debounce";

class BusStore {
  userSessionId: number | null = null;
  subPassengers: SubPassengerDetails[] = [];
  dataLayoutBus: ILayoutData | null = null;
  idOrderPassengers: NullableNumber[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUserIdSession = (value: number | null) => {
    this.userSessionId = value;
  };

  setSubPassengers = (
    value: SubPassengerDetails[] | ((prev: SubPassengerDetails[]) => SubPassengerDetails[])
  ) => {
    this.subPassengers = typeof value === "function" ? value(this.subPassengers) : value ?? [];
  };

  setDataLayoutBus = (value: ILayoutData | null, action: RoleEnum) => {
    this.dataLayoutBus = value;
    // console.log("busStore.ts", value, this.userSessionId, action);
    if (!value || !("passenger" in value)) {
      this.idOrderPassengers = [];
      return;
    }

    let newIdOrderPassengers = value.passenger
      .filter(
        (e) =>
          e.passenger === this.userSessionId &&
          e.busSeatStatus ===
            (action === RoleEnum.PASSENGER ? SeatStatusEnum.SELECTED : SeatStatusEnum.RESERVEDEMPTY)
      )
      .map((e) => e.passenger);

    // console.log("newIdOrderPassengers in busStore ---------------- ", newIdOrderPassengers);
    if (action === RoleEnum.PASSENGER && newIdOrderPassengers.length >= 0)
      newIdOrderPassengers.pop();
    this.setIdOrderPassengers(newIdOrderPassengers);
  };

  setIdOrderPassengers = debounce((newIdOrderPassengers: NullableNumber[]) => {
    runInAction(() => {
      this.idOrderPassengers = newIdOrderPassengers;
    });
  }, 800);
}

const busStore = new BusStore();
export default busStore;
