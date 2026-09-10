<template>
  <section class="container">
    <UserFilters
      :search="search"
      :role="role"
      :perPage="perPage"
      @update:search="search = $event"
      @update:role="role = $event"
      @update:perPage="perPage = $event"
    />

    <UserTable
      :users="paginatedUsers"
      @sort="onSort"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
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
  onSort,
} = useUsersTable(users)
</script>

<style scoped>

</style>
