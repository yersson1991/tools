import { Role } from './enums';

export interface User {
  uid: string;
  displayName: string,
  photoURL?: string,
  roles: Array<Role>,
  selectedRole: string;
  provider: string;
}
