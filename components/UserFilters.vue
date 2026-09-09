<template>
  <div class="filters">
    <input
      v-model="localSearch"
      placeholder="Search by name or email"
      @input="updateSearch"
    />

    <BaseSelect
      :model-value="role"
      @update:model-value="$emit('update:role', $event)"
      :options="['admin', 'manager', 'user']"
    />

    <BaseSelect
      :model-value="perPage"
      @update:model-value="$emit('update:perPage', Number($event))"
      :options="perPageOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {PER_PAGE_OPTIONS, type PerPage} from '~/constants/pagination';

const props = defineProps<{
  search?: string;
  role?: string | null;
  perPage?: PerPage;
}>()

const emit = defineEmits([
  'update:search',
  'update:role',
  'update:perPage',
])

const perPageOptions = [...PER_PAGE_OPTIONS]

const localSearch = ref(props.search);

let searchTimer: ReturnType<typeof setTimeout>;

function updateSearch() {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    emit('update:search', localSearch.value);
  }, 300);
}

watch(
  () => props.search,
  value => {
    localSearch.value = value;
  },
);

onBeforeUnmount(() => {
  clearTimeout(searchTimer);
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
