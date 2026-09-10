import type { User, UserRole } from '~/types/User';
import type {
  SortDirection,
  SortField,
} from '~/constants/sorting';

export function filterUsers(
  users: User[],
  search: string,
  role: UserRole | null,
) {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  return users.filter(user => {
    const matchesRole =
      role === null || user.role === role;

    const matchesSearch =
      normalizedSearch === ''
      || user.name.toLowerCase().includes(normalizedSearch)
      || user.email.toLowerCase().includes(normalizedSearch);

    return matchesRole && matchesSearch;
  });
}

export function sortUsers(
  users: User[],
  sortBy: SortField | null,
  sortDirection: SortDirection,
) {
  if (sortBy === null) {
    return users;
  }

  const direction = sortDirection === 'asc' ? 1 : -1;

  return [...users].sort((firstUser, secondUser) => {
    if (sortBy === 'age') {
      return (
        firstUser.age - secondUser.age
      ) * direction;
    }

    return (
      Date.parse(firstUser.createdAt)
      - Date.parse(secondUser.createdAt)
    ) * direction;
  });
}