<template>
  <AppLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot />
    <NuxtPage />
  </AppLayout>
</template>
<script setup lang="ts">
// a. Composition API
defineOgImageScreenshot({
  // wait for animations
  // delay: 1000,
  width: 712,
  colorScheme: 'dark',
  seletor: '.page-body'
})
</script>