<template>
  <label class="field">
    <span class="field__label">
      {{ label }}
    </span>

    <select
      v-model="model"
      class="select"
      :name="name"
      :aria-label="ariaLabel"
    >
      <option :value="null">All</option>

      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
defineProps({
  options: {
    type: Array<string | number>,
  },
  name: String,
  label: String,
  ariaLabel: String,
})

const model = defineModel()
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  color: var(--muted-text-color);
  font-size: 14px;
  font-weight: 500;
}

.select {
  min-width: 150px;
  height: 44px;
  padding: 0 36px 0 12px;

  border: 1px solid var(--control-border);
  border-radius: 8px;
  outline: none;

  background-color: var(--control-bg);
  color: var(--text-color);
  font: inherit;
  text-transform: capitalize;
  cursor: pointer;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.select:hover {
  border-color: var(--control-border-hover);
}

.select:focus {
  border-color: var(--control-focus);
  box-shadow: 0 0 0 3px color-mix(
    in srgb,
    var(--control-focus) 20%,
    transparent
  );
}
</style>
