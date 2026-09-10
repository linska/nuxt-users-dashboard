<template>
  <span>
    <template
      v-for="(part, index) in parts"
      :key="index"
    >
      <mark
        v-if="part.highlighted"
        class="highlight"
      >
        {{ part.text }}
      </mark>

      <template v-else>
        {{ part.text }}
      </template>
    </template>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  query: string;
}>();

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const parts = computed(() => {
  const query = props.query.trim();

  if (!query) {
    return [
      {
        text: props.text,
        highlighted: false,
      },
    ];
  }

  const expression = new RegExp(
    `(${escapeRegExp(query)})`,
    'gi',
  );

  return props.text
    .split(expression)
    .filter(Boolean)
    .map(part => ({
      text: part,
      highlighted:
        part.toLowerCase() === query.toLowerCase(),
    }));
});
</script>

<style scoped>
.highlight {
  padding: 1px 2px;
  border-radius: 3px;
  background: var(--highlight-bg);
  color: var(--highlight-text);
}
</style>