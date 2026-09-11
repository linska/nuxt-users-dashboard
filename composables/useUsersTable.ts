import {type User, type UserRole} from "~/types/User.ts";
import type {LocationQueryRaw} from 'vue-router';
import {DEFAULT_PER_PAGE} from "~/constants/pagination.ts";
import type {SortDirection, SortField} from "~/constants/sorting.ts";
import {filterUsers, sortUsers} from '~/utils/usersTable';
import {isPerPage, isSortDirection, isSortField, isUserRole} from '~/utils/usersTableGuards';

export function useUsersTable(users: User[]) {
  const route = useRoute();
  const router = useRouter();

  function updateQuery(query: LocationQueryRaw) {
    return router.replace({
      query: {
        ...route.query,
        ...query,
      },
    });
  }

  const search = computed<string>({
    get() {
      const value = route.query.search;

      return typeof value === 'string' ? value : '';
    },

    set(value) {
      updateQuery({
        search: value.length ? value : undefined,
        page: undefined,
      });
    },
  });

  const role = computed<UserRole | null>({
    get() {
      const value = route.query.role;

      return isUserRole(value) ? value : null;
    },

    set(value) {
      updateQuery({
        role: value ?? undefined,
        page: undefined,
      });
    },
  });

  const sortBy = computed<SortField | null>(() => {
    const value = route.query.sortBy;

    return isSortField(value) ? value : null;
  });

  const sortDirection = computed<SortDirection>(() => {
    const value = route.query.sortDirection;

    return isSortDirection(value) ? value : 'asc';
  });

  function onSort(field: SortField) {
    if (sortBy.value !== field) {
      updateQuery({
        sortBy: field,
        sortDirection: 'asc',
        page: undefined,
      });

      return;
    }

    if (sortDirection.value === 'asc') {
      updateQuery({
        sortBy: field,
        sortDirection: 'desc',
        page: undefined,
      });

      return;
    }

    updateQuery({
      sortBy: undefined,
      sortDirection: undefined,
      page: undefined,
    });
  }

  function resetTableState() {
    updateQuery({
      search: undefined,
      role: undefined,
      sortBy: undefined,
      sortDirection: undefined,
      page: undefined,
      perPage: undefined,
    });
  }

  const filteredUsers = computed(() =>
    filterUsers(users, search.value, role.value),
  );

  const sortedUsers = computed(() =>
    sortUsers(
      filteredUsers.value,
      sortBy.value,
      sortDirection.value,
    ),
  );

  const perPage = computed({
    get() {
      const rawValue = route.query.perPage;

      if (typeof rawValue !== 'string' || rawValue === '') {
        return DEFAULT_PER_PAGE;
      }

      const queryValue = Number(rawValue);

      return isPerPage(queryValue)
        ? queryValue
        : DEFAULT_PER_PAGE;
    },
    
    set(value) {
      updateQuery({
        perPage: String(value),
        page: undefined,
      });
    },
  })

  const totalPages = computed(() => {
    if (perPage.value === 0) {
      return 1;
    }

    return Math.max(
      1,
      Math.ceil(sortedUsers.value.length / perPage.value),
    );
  });

  const page = computed<number>({
    get() {
      const value = Number(route.query.page);

      if (!Number.isInteger(value) || value < 1) {
        return 1;
      }

      return Math.min(value, totalPages.value);
    },

    set(value) {
      updateQuery({
        page: value === 1 ? undefined : String(value),
      });
    },
  });

  const paginatedUsers = computed(() => {
    if (perPage.value === 0) {
      return sortedUsers.value;
    }

    const sliceFrom = (page.value - 1) * perPage.value;

    return sortedUsers.value.slice(
      sliceFrom,
      sliceFrom + perPage.value,
    );
  });

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,

    onSort,
    resetTableState,
  }
}
