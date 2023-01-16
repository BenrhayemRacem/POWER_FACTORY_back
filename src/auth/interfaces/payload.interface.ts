import { UserRole } from "../../user/enums/role.enum";

export interface PayloadInterface {
  username: string;
  role: UserRole;
}
