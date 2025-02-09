import { GenerateBooleanType, GenerateType } from "./generaty.types";
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

// export type IGetUsersByIdBySelectOption = {
//   [Key in selectUserKeys]: boolean;
// };

// export type IGetUsersByIdBySelect = {
//   [K in selectUserKeys]: K extends selectUserKeys ? UserDataBase[K] : never;
// };

export type IGetUsersByIdBySelectOption = GenerateBooleanType<selectUserKeys>;
export type IGetUsersByIdBySelect = GenerateType<UserDataBase, selectUserKeys>;
