<template>
  <AppLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot 
      :width="712"
      mask="header, footer"
      selector="article.page-body"
    />
    <NuxtPage />
  </AppLayout>
</template>
