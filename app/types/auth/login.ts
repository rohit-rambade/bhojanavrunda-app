import { Role } from "@/app/enums/Role";

export type LoginCredentials = {
  UserName: string;
  Password: string;
  RoleId: Role;
};
