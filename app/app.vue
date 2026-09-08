<script setup lang="ts">
// Locale-aware <head> for every route: html lang, canonical, hreflang
// alternates (de, en, x-default) and og:locale. Pages add title, description
// and Open Graph on top; nothing here is page-specific.
const head = useLocaleHead({ lang: true, dir: true, seo: true })
useHead(head)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
