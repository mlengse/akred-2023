<template>
  <AppLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot 
      :width="480"
      :height="480"
    />
    <NuxtPage />
  </AppLayout>
</template>
