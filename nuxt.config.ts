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
      algolia: {
        docSearch: {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          apiKey: process.env.ALGOLIA_API_KEY,
          applicationId: process.env.ALGOLIA_APPLICATION_ID
        }
      }
    }
  },
  modules: [['@nuxtjs/algolia', {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    globalIndex: '',
    lite: true,
    cache: false,
    instantSearch: true,
    docSearch:{
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      meta: ['title', 'description'],
      include: () => true
    },
    recommend: true,
  }]],
})
