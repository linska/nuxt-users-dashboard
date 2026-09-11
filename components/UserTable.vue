<template>
  <div ref="tableWrapper" class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

          <th @click="$emit('sort', 'age')">
            <div class="sorting">
              <span>{{ getSortIcon('age') }}</span>
              <span class="center">Age</span>
            </div>
          </th>

          <th>Role</th>

          <th @click="$emit('sort', 'createdAt')">
            <div class="sorting">
              <span>{{ getSortIcon('createdAt') }}</span>
              <span class="center">Created</span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
      <tr v-if="users.length === 0">
        <td colspan="5" class="empty-state">
          No users found
        </td>
      </tr>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>
            <HighlightedText
              :text="user.name"
              :query="search"
            />
          </td>
          <td>
            <HighlightedText
              :text="user.email"
              :query="search"
            />
          </td>
          <td class="center">{{ user.age }}</td>
          <td class="center">{{ user.role }}</td>
          <td class="center">
            {{ formatDate(user.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {User} from '~/types/User.ts'
import type {SortDirection, SortField} from "~/constants/sorting.ts";
import HighlightedText from "~/components/HighlightedText.vue";

const props = defineProps<{
  users: User[],
  sortBy: SortField,
  sortDirection: SortDirection,
  search: string;
}>()

defineEmits<{
  sort: [field: SortField];
}>();

function formatDate(date: string) {
  return date
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.');
}

function getSortIcon(field: SortField) {
  if (props.sortBy !== field) {
    return '⇅';
  }

  return props.sortDirection === 'asc' ? '↑' : '↓';
}

const tableWrapper =
  useTemplateRef<HTMLDivElement>('tableWrapper');

function scrollToTop() {
  tableWrapper.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

defineExpose({
  scrollToTop,
});
</script>

<style scoped>
.table-wrapper {
  height: 100%;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--surface-bg);
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  min-width: 720px;
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  white-space: nowrap;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--table-header-bg);
  color: var(--text-color);
  width: 200px;
  padding: 12px 16px;
}

th:nth-child(1), th:nth-child(2) {
  width: 400px;
}

.sorting {
  display: grid;
  grid-template-columns: 20px 1fr 20px;

  cursor: pointer;
}

td {
  padding: 10px 16px;

  border-bottom: 1px dashed var(--border-color);
}

tr:last-child td {
  border-bottom: none;
}

.table-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: var(--surface-bg);
}

.table-wrapper::-webkit-scrollbar-thumb {
  border: 2px solid var(--surface-bg);
  border-radius: 999px;
  background: var(--control-border);
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--control-border-hover);
}
</style>
