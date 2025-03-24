import { makeAutoObservable, runInAction } from "mobx";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { SubPassengerDetails } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { NullableNumber } from "@/types/types";
import debounce from "lodash/debounce";

class BusStore {
  userIdSession: number | null = null;
  subPassengers: SubPassengerDetails[] = [];
  dataLayoutBus: ILayoutData | null = null;
  idOrderPassengers: NullableNumber[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUserIdSession = (value: number | null) => {
    this.userIdSession = value;
  };

  setSubPassengers = (value: SubPassengerDetails[] | ((prev: SubPassengerDetails[]) => SubPassengerDetails[])) => {
    this.subPassengers = typeof value === "function" ? value(this.subPassengers) : value ?? [];
  };

  setDataLayoutBus = (value: ILayoutData | null, action: RoleEnum) => {
    this.dataLayoutBus = value;

    if (!value || !("passenger" in value)) {
      this.idOrderPassengers = [];
      return;
    }

    const newIdOrderPassengers = value.passenger
      .filter(
        (e) =>
          e.passenger === this.userIdSession &&
          e.busSeatStatus === (action === RoleEnum.PASSENGER ? SeatStatusEnum.SELECTED : SeatStatusEnum.RESERVEDEMPTY)
      )
      .map((e) => e.passenger);

    console.log("newIdOrderPassengers in busStore", newIdOrderPassengers);
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
