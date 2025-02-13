import { RoleEnum } from "@/enum/shared.enums";
import { IGetUsersByIdBySelect } from "@/fetchFunctions/fetchUsers";
import { z } from "zod";

export const zodSchemaUser: z.ZodType<IGetUsersByIdBySelect> = z.object({
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
