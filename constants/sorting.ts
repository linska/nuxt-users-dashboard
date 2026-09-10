export const SORT_BY_OPTIONS = ['age', 'createdAt'] as const;
export const SORT_DIRECTION_OPTIONS = ['asc', 'desc'] as const;

export type SortField = (typeof SORT_BY_OPTIONS)[number];
export type SortDirection = (typeof SORT_DIRECTION_OPTIONS)[number];

