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
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        langAttribute: "lang",
        // docSearch: {
        //   indexName: process.env.ALGOLIA_INDEX_NAME,
        // },
      }
    }
  },
  // modules: [['@nuxtjs/algolia', {
  //   applicationId: process.env.ALGOLIA_APPLICATION_ID,
  //   apiKey: process.env.ALGOLIA_API_KEY,
  //   // globalIndex: '',
  //   // lite: true,
  //   // cache: true,
  //   // instantSearch: true,
  //   // instantSearch: {
  //   //   insights: true,
  //   // },
  //   docSearch:{
  //     indexName: process.env.ALGOLIA_INDEX_NAME,
  //   },
  //   crawler: {
  //     apiKey: process.env.ALGOLIA_CRAWLER_KEY,
  //     indexName: process.env.ALGOLIA_INDEX_NAME,
  //     meta: ['title', 'description'],
  //     // meta: async (html: string, route: string) => {
  //     //   const isInclude = !route.startsWith('admin') 
  //     //     && !route.endsWith('.png') 
  //     //     && !route.endsWith('.js')
  //     //     && !route.endsWith('.json')
  //     //     && !route.endsWith('.txt')

  //     //   console.log(html)
  //     //   return ['title', 'description']
  //     //   // const result = await somePromise(route)
  //     //   // return {
  //     //   //   ...result,
  //     //   //   foo: 'bar'
  //     //   // }
  //     // },
  //     include:   (route: string) => {
  //       const isInclude = !route.startsWith('admin') 
  //         && !route.endsWith('.png') 
  //         && !route.endsWith('.js')
  //         && !route.endsWith('.json')
  //         && !route.endsWith('.txt')

  //       // console.log(isInclude)
  //       return isInclude
  //     },
  //     // "index_name": process.env.ALGOLIA_INDEX_NAME,
  //     // // "start_urls": ["*******"],
  //     // // "stop_urls": ["*******"],
  //     // "selectors": {
  //     //   "lvl0": {
  //     //     "selector": "",
  //     //     "default_value": ""
  //     //   },
  //     //   "lvl1": "article h1",
  //     //   "lvl2": "article h2",
  //     //   "lvl3": "article h3",
  //     //   "lvl4": "article h4",
  //     //   "lvl5": "article h5",
  //     //   "text": "article p, article li",
  //     //   "lang": {
  //     //     "selector": "/html/@lang",
  //     //     "type": "xpath",
  //     //     "global": true
  //     //   }
  //     // },
  //     // "strip_chars": " .,;:#",
  //     // "selectors_exclude": [".sr-only"],
  //     // "custom_settings": {
  //     //   "attributesForFaceting": ["lang", "tags"]
  //     // }
  //   },
  //   recommend: true,
  // }]],
})
