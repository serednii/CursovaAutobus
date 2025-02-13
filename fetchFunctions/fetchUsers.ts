import { RoleEnum } from "@/enum/shared.enums";
import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { UserDataBase } from "@/types/next-auth";

import { z } from "zod";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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

const schemaUser: z.ZodType<IGetUsersByIdBySelect> = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum([
    RoleEnum.DRIVER,
    RoleEnum.PASSENGER,
    RoleEnum.ADMIN,
    RoleEnum.GUEST,
  ] as const),
});

export async function getUsersFetchByIdsBySelect(
  ids: number[],
  select: IGetUsersByIdBySelectOption
): Promise<IGetUsersByIdBySelect[]> {
  try {
    const response = await fetch(`${API_URL}/api/getUsersByIdBySelect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids, select }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Request error:", errorData.error || "Unknown error");
      throw new Error(errorData.error || "Unknown error");
    }

    const data: unknown = await response.json();
    const parsedData = schemaUser.array().parse(data);

    return parsedData;
  } catch (error) {
    console.error("Error during request execution:", error);
    throw error;
  }
}
