import { RoleEnum } from "@/enum/shared.enums";
import { IGetUsersByIdBySelect } from "@/fetchApi/v1/getUsersById";
import { UserSelect } from "@/types/next-auth";
import { z } from "zod";

export const zodSchemaUsers: z.ZodType<IGetUsersByIdBySelect> = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum([RoleEnum.DRIVER, RoleEnum.PASSENGER, RoleEnum.ADMIN, RoleEnum.GUEST] as const),
});

export const zodSchemaUsersInApi: z.ZodType<UserSelect> = z
  .object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    role: z.boolean().optional(),
    picture: z.boolean().optional(),
    image: z.boolean().optional(),
    license: z.boolean().optional(),
    isNewUser: z.boolean().optional(),
    avatar_url: z.boolean().optional(),
    createdAt: z.boolean().optional(),
  })
  .partial()
  .strict();
