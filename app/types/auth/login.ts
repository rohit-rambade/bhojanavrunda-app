import { Role } from "@/src/enums/Role";

export type LoginCredentials = {
  UserName: string;
  Password: string;
  RoleId: Role;
};
