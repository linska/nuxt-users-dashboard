<template>
  <nav
    class="pagination"
    aria-label="Table pagination"
  >
    <button
      class="pagination__button"
      type="button"
      :disabled="model <= 1"
      aria-label="Previous page"
      @click="model--"
    >
      Prev
    </button>

    <span
      class="pagination__counter"
      aria-live="polite"
    >
      {{ model }} / {{ totalPages }}
    </span>

    <button
      class="pagination__button"
      type="button"
      :disabled="model >= totalPages"
      aria-label="Next page"
      @click="model++"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  totalPages: number;
}>();

const model = defineModel<number>({
  required: true,
});

</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: end;
}

.pagination__counter {
  min-width: 48px;
  color: var(--text-color);
  text-align: center;
  font-weight: 600;
}
</style>