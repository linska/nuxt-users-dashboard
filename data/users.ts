import {type User, USER_ROLES} from "~/types/User.ts";

const BASE_DATE = Date.UTC(2025, 0, 1);

export const users: User[] = Array.from(
  { length: 52 },
  (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 18 + (i % 40),
    role: USER_ROLES[i % USER_ROLES.length]!,
    createdAt: new Date(
      BASE_DATE - i * 1000 * 60 * 60 * 24,
    ).toISOString(),
  }),
);
