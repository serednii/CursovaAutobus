import { UserDataBase } from "./next-auth";

type selectUserKeys = (
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "role"
) &
  keyof UserDataBase;

export type IGetUsersByIdBySelectOption = {
  [K in selectUserKeys]: boolean;
};

export type IGetUsersByIdBySelect = {
  [K in keyof IGetUsersByIdBySelectOption &
    selectUserKeys]: K extends selectUserKeys ? UserDataBase[K] : never;
};
