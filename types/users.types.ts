export interface UserSelect {
  id?: boolean;
  createdAt?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  phone?: boolean;
  role?: boolean;
  license?: boolean;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
