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
  idOrderSubPassengers: NullableNumber[] = [];
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
    console.log("busStore.ts value", value);
    console.log("busStore.ts", this.dataLayoutBus, this.userSessionId, action);

    if (!value || !("passenger" in value)) {
      this.idOrderSubPassengers = [];
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

    if (action === RoleEnum.PASSENGER && newIdOrderPassengers.length > 0) {
      this.setIdOrderSubPassengers(newIdOrderPassengers.slice(1));
    } else if (action === RoleEnum.DRIVER) {
      this.setIdOrderSubPassengers(newIdOrderPassengers);
    }
    this.setIdOrderPassengers(newIdOrderPassengers);
  };

  setIdOrderPassengers = debounce((newIdOrderPassengers: NullableNumber[]) => {
    runInAction(() => {
      this.idOrderPassengers = newIdOrderPassengers;
    });
    console.log(
      "newIdOrderPassengers in busStore ---------------- ",
      newIdOrderPassengers,
      this.idOrderSubPassengers.length,
      this.idOrderPassengers.length
    );
  }, 800);

  setIdOrderSubPassengers = debounce((newIdOrderPassengers: NullableNumber[]) => {
    runInAction(() => {
      this.idOrderSubPassengers = newIdOrderPassengers;
    });
    console.log(
      "newIdOrderPassengers in busStore ---------------- ",
      newIdOrderPassengers,
      this.idOrderSubPassengers.length,
      this.idOrderPassengers.length
    );
  }, 800);
}

const busStore = new BusStore();
export default busStore;
