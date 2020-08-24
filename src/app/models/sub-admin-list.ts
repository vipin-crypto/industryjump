class SubAdminAccess {
  read: boolean;
  write: boolean;
  edit: boolean;
  delete: boolean;
}
export class SubAdminList {
  name: string;
  email: string;
  password: string;
  phone: string;
  id: string;
  access: SubAdminAccess;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
