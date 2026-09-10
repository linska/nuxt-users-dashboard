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

const title = 'User Dashboard | Nuxt';
const description =
  'A responsive user dashboard with search, filtering, sorting, pagination, and light and dark themes.';

useHead(() => ({
  htmlAttrs: {
    class: isDark.value ? 'dark' : '',
    lang: 'en',
  },
}));

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogType: 'website',
})
</script>

<style scoped>
.header {
  background-color: var(--header-color);
  padding: 16px;
  height: 82px;
}

.main {
  height: calc(100vh - 82px);
}
</style>