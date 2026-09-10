<template>
  <label class="switch">
    <span class="switch__label">
      {{ label }}
    </span>
    <input
      v-model="model"
      type="checkbox"
      role="switch"
      :name="name"
      :aria-label="ariaLabel"
    />

    <span class="switch__track">
    <span class="switch__thumb" />
  </span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  label: String,
  ariaLabel: String,
})

const model = defineModel<boolean>({
  default: false,
});
</script>

<style scoped>
.switch {
  display: inline-block;
}
.switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switch__label {
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
}

.switch__track {
  display: flex;
  align-items: center;

  width: 44px;
  height: 24px;
  padding: 2px;

  margin-top: 4px;

  border-radius: 999px;
  background: var(--border-color);
  cursor: pointer;
  transition: background 0.2s;
}

.switch__thumb {
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
}

.switch input:checked + .switch__track {
  background: var(--primary-color);
}

.switch input:checked + .switch__track .switch__thumb {
  transform: translateX(20px);
}

.switch input:focus-visible + .switch__track {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>