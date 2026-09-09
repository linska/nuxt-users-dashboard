export const USER_ROLES = ['admin', 'manager', 'user'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: number,
  name: string,
  email: string,
  age: number,
  role: UserRole,
  createdAt: string,
}