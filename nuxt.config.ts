export default defineNuxtConfig({
  extends: [
    '@nuxt-themes/docus',
    'nuxt-seo-kit'
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL,
      siteName: 'Akreditasi 2023',
      siteDescription: 'Puskesmas Jayengan. Sahabat menuju sehat.',
      language: 'id-ID',
    }
  },
})
