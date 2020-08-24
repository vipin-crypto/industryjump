export class AdminAccess {
  read: boolean;
  write: boolean;
  edit: boolean;
  delete: boolean;
}
export class Admin {
  access: AdminAccess;
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  token: string;
  id: string;
}
