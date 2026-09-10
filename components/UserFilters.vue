<template>
  <div class="filters">
    <button
      type="button"
      class="reset-button"
      @click="$emit('click:reset')"
    >
      Reset all
    </button>

    <BaseInput
      v-model="localSearch"
      name="search"
      label="Search"
      placeholder="Search by name or email"
      @update:model-value="updateSearch"
      @clear="clearSearch"
    />

    <BaseSelect
      :model-value="role"
      @update:model-value="$emit('update:role', $event)"
      :options="['admin', 'manager', 'user']"
      name="role"
      label="Role"
    />

    <BaseSelect
      :model-value="perPageModel"
      @update:model-value="$emit('update:perPage', Number($event))"
      :options="perPageOptions"
      name="perPage"
      label="Rows per page"
    />
  </div>
</template>

<script setup lang="ts">
import {PER_PAGE_OPTIONS, type PerPage, type PageSize} from '~/constants/pagination';

const props = defineProps<{
  search?: string;
  role?: string | null;
  perPage: PerPage;
}>()

const emit = defineEmits([
  'click:reset',
  'update:search',
  'update:role',
  'update:perPage',
])

const perPageModel = computed<PageSize | null>({
  get() {
    return props.perPage === 0
      ? null
      : props.perPage;
  },
  set(value) {
    emit('update:perPage', value ?? 0);
  },
});


const perPageOptions = [...PER_PAGE_OPTIONS]
const localSearch = ref(props.search);
let searchTimer: ReturnType<typeof setTimeout>;

function updateSearch() {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    emit('update:search', localSearch.value);
  }, 300);
}

function clearSearch() {
  clearTimeout(searchTimer);

  localSearch.value = '';
  emit('update:search', '');
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
  flex-wrap: wrap;
  align-items: end;
  gap: 8px;
  margin-bottom: 12px;
}

.field:last-child {
  margin-left: auto;
}
</style>
