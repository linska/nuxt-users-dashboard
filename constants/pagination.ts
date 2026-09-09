export const PER_PAGE_OPTIONS = [10, 15, 20] as const;

export type PageSize =
  (typeof PER_PAGE_OPTIONS)[number];

export type PerPage = PageSize | 0;

export const DEFAULT_PER_PAGE: PerPage = 10;