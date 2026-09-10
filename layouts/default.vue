<template>
  <header class="header">
    <BaseSwitch
      v-model="isDark"
      label="Toggle dark theme"
      @update:model-value="updateTheme"
    />
  </header>
  <main class="main">
    <slot />
  </main>
</template>

<script setup lang="ts">
import BaseSwitch from "~/components/BaseSwitch.vue";

type Theme = 'light' | 'dark';

const theme = useCookie<Theme>('theme', {
  default: () => 'light',
  sameSite: 'lax',
});

const isDark = computed(() => theme.value === 'dark');

function updateTheme(value: boolean) {
  theme.value = value ? 'dark' : 'light';
}

useHead(() => ({
  htmlAttrs: {
    class: isDark.value ? 'dark' : '',
  },
}));
</script>

<style scoped>
.header {
  background-color: var(--header-color);
  padding: 16px;
}

.main {
  min-height: calc(100vh - 56px);
}
</style>