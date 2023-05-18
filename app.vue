<template>
  <AppLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot 
      :width="712"
      colorScheme="dark"
      selector=".page-body"
    />
    <NuxtPage />
  </AppLayout>
</template>
