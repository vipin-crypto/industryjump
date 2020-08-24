export class Access {
  read: boolean = false;
  write: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
}
export class AddSubAdminBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  id: string;
  role: string = 'SubAdmin';
  access: Access;
}
