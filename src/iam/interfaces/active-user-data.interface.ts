
export interface ActiveUserData {
  /** user id */
  sub: number;
  /** user email */
  email?: string;
  /** user code */
  code?: string;
  /** user role */
  // role: Role;
  /** user permissions */
  // permissions: PermissionType[];
}
