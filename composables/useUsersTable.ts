import {type User, USER_ROLES, type UserRole} from "~/types/User.ts";
import type {LocationQueryRaw} from 'vue-router';
import {DEFAULT_PER_PAGE, PER_PAGE_OPTIONS, type PerPage} from "~/constants/pagination.ts";

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

  // filters
  const search = computed<string | null>({
    get() {
      const value = route.query.search;

      return typeof value === 'string' ? value : null;
    },

    set(value) {
      updateQuery({
        search: value?.length ? value : undefined,
        page: undefined,
      });
    },
  });

  function isUserRole(value: unknown): value is UserRole {
    return USER_ROLES.some(role => role === value);
  }

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

  // sorting
  const sortBy = ref(null) // 'age' | 'createdAt'
  const sortDirection = ref('asc')

  // pagination
  const page = computed({
    get: () => {
      const value = Number(route.query.page);

      return Number.isInteger(value) && value > 0 ? value : 1;
    },
    set: value => updateQuery({
      page: value === 1 ? undefined : String(value),
    }),
  });


  function isPerPage(value: number): value is PerPage {
    return (
      value === 0
      || PER_PAGE_OPTIONS.some(option => option === value)
    );
  }

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




  // TODO:
  // - filteredUsers
  // - sortedUsers
  // - paginatedUsers
  // - totalPages
  function userRoleCheck(userRole: UserRole, checkRole: UserRole | null) {
    if (!checkRole) {
      return true;
    }

    return userRole === checkRole;
  }

  function userSearchCheck(user: User, value: string | null) {
    if (!value) {
      return true;
    }

    const valueNormanized = value.toLocaleLowerCase().trim();
    const nameNormalized = user.name.toLocaleLowerCase();
    const emailNormalized = user.email.toLocaleLowerCase();

    return nameNormalized.includes(valueNormanized) || emailNormalized.includes(valueNormanized);
  }

  const filteredUsers = computed(() => {
    if (role.value === null && search.value === null) {
      return users
    }

    return users.filter(user => {
      const roleCheck = userRoleCheck(user.role, role.value)
      const searchCheck = userSearchCheck(user, search.value)

      return roleCheck && searchCheck;
    })
  })

  const paginatedUsers = computed(() => {
    if (perPage.value === 0) {
      return filteredUsers.value;
    }

    const sliceFrom = (page.value - 1) * perPage.value;
    const sliceTo = sliceFrom + perPage.value;

    return filteredUsers.value.slice(sliceFrom, sliceTo);
  })

  const totalPages = computed(() => {
    if (perPage.value === 0) {
      return 1;
    }

    return Math.ceil(filteredUsers.value.length / perPage.value);
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
  }
}
