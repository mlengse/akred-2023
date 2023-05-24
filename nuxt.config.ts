export default defineNuxtConfig({
  extends: [
    // '@nuxt-themes/docus',
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
  modules: [
    '@nuxthq/ui',
    '@vueuse/nuxt',
    '@nuxt/content',
    // '@nuxt/devtools',
    // '@nuxthq/studio',
    // '@nuxtjs/plausible',
    'nuxt-lodash',
    // 'nuxt-component-meta'
  ],
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        light: 'material-lighter',
        dark: 'material-palenight'
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    }
  },
  ui: {
    global: true,
    // icons: ['heroicons', 'simple-icons']
    icons: ['all']
  },
  typescript: {
    strict: false,
    includeWorkspace: true
  },
  // routeRules: {
  //   '/': { redirect: '/getting-started' }
  // },
  // generate: {
  //   routes: ['/']
  // }
})
