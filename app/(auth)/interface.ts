import { RoleEnum } from "@/enum/shared.enums";

export interface FormValues {
  password: string;
  password_repeat: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleEnum;
}
