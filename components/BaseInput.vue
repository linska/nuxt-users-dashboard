<template>
  <div class="field">
    <label
      class="field__label"
      :for="name"
    >
      {{ label }}
    </label>

    <div class="search-field">
      <input
        :id="name"
        v-model="model"
        class="search-field__input"
        :name="name"
        :placeholder="placeholder"
      />

      <button
        v-if="model"
        type="button"
        class="search-field__clear"
        aria-label="Clear input"
        @mousedown.prevent
        @click="clearInput"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  clear: [];
}>();

const model = defineModel<string>({
  default: '',
});

function clearInput() {
  model.value = '';
  emit('clear');
}
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

.search-field {
  position: relative;
}

.search-field__input {
  width: 100%;
  height: 44px;
  padding: 0 38px 0 12px;

  border: 1px solid var(--control-border);
  border-radius: 8px;
  outline: none;

  background: var(--control-bg);
  color: var(--text-color);
  font: inherit;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-field__clear {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  display: grid;
  place-items: center;

  min-width: 24px;
  width: 24px;
  height: 24px;
  padding: 0;

  border: 0;
  background: transparent;
  color: var(--muted-text-color);
  font-size: 20px;
  cursor: pointer;
}

.search-field__clear:hover {
  color: var(--text-color);
  background-color: transparent;
}

.search-field__input::placeholder {
  color: var(--control-placeholder);
}

.search-field__input:hover {
  border-color: var(--control-border-hover);
}

.search-field__input:focus {
  border-color: var(--control-focus);
  box-shadow: 0 0 0 3px color-mix(
    in srgb,
    var(--control-focus) 20%,
    transparent
  );
}
</style>