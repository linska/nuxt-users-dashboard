import {USER_ROLES, type UserRole} from '~/types/User';
import {SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS, type SortDirection, type SortField} from '~/constants/sorting';
import {PER_PAGE_OPTIONS, type PerPage} from '~/constants/pagination';

export function isUserRole(
  value: unknown,
): value is UserRole {
  return USER_ROLES.some(role => role === value);
}

export function isSortField(
  value: unknown,
): value is SortField {
  return SORT_BY_OPTIONS.some(field => field === value);
}

export function isSortDirection(
  value: unknown,
): value is SortDirection {
  return SORT_DIRECTION_OPTIONS.some(
    direction => direction === value,
  );
}

export function isPerPage(
  value: number,
): value is PerPage {
  return (
    value === 0
    || PER_PAGE_OPTIONS.some(option => option === value)
  );
}