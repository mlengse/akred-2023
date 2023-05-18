<template>
  <AppLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot 
      :width="712"
      :height="712"
    />
    <NuxtPage />
  </AppLayout>
</template>
