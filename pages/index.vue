<template>
  <section class="container users">
    <UserFilters
      :search="search"
      :role="role"
      :perPage="perPage"
      :can-reset="canResetTableState"
      @update:search="search = $event"
      @update:role="role = $event"
      @update:perPage="perPage = $event"
      @click:reset="resetTableState"
    />

    <UserTable
      :users="paginatedUsers"
      @sort="onSort"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
      :search="search"
      ref="userTable"
    />

    <PaginationControls
      v-model="page"
      :total-pages="totalPages"
    />
  </section>
</template>

<script setup>
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'
import PaginationControls from "~/components/PaginationControls.vue";

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
  canResetTableState,
  onSort,
  resetTableState,
} = useUsersTable(users)

const userTable = useTemplateRef('userTable');

watch(page, async () => {
  await nextTick();
  userTable.value?.scrollToTop();
});
</script>

<style scoped>
.users {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
