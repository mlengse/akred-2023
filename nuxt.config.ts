export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL,
      siteName: 'Akreditasi',
      siteDescription: 'Puskesmas Jayengan. Sahabat menuju sehat.',
      language: 'id', // prefer more explicit language codes like `en-AU` over `en`
    }
  },
  extends: [
    '@nuxt-themes/docus',
    'nuxt-seo-kit'
  ],
})
