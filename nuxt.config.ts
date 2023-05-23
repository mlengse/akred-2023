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
      // algolia: {
      //   applicationId: process.env.ALGOLIA_APPLICATION_ID,
      //   apiKey: process.env.ALGOLIA_API_KEY,
      //   langAttribute: "lang",
      //   // docSearch: {
      //   //   indexName: process.env.ALGOLIA_INDEX_NAME,
      //   // },
      // }
    }
  },
  modules: ['@nuxthq/ui']
})
