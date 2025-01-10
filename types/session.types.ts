export type UserSession = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  license: string;
  isNewUser: boolean;
};
