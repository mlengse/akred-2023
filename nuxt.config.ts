import { createResolver } from '@nuxt/kit'
// import en from './patterns/en'
// import id from './patterns/id'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    // '@nuxt-themes/docus',
    '@nuxt-themes/elements',    
    '@nuxt-themes/typography',    
    // '@nuxt-themes/tokens',    
    'nuxt-seo-kit'
  ],
  // sitemap: {
  //   hostname: 'http://localhost:3000'
  // },
  // @ts-ignore
  modules: [
    '@nuxt-themes/tokens',    
    'pinceau/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxthq/ui',
    'nuxt-simple-sitemap',
    'nuxt-delay-hydration',
    // '@nuxt/devtools',
    // '@nuxthq/studio',
    // '@nuxtjs/plausible',
    // 'nuxt-lodash',
    // 'nuxt-config-schema',
    // 'nuxt-component-meta'
    // '@vite-pwa/nuxt',
    // '~/modules/sitemap',
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL,
      siteName: 'Akreditasi 2023',
      siteDescription: 'Puskesmas Jayengan. Sahabat menuju sehat.',
      language: 'id',

    }
  },
  app: {
    head: {
      // link: [
      //   {
      //     rel: 'stylesheet',
      //     href: '/_pagefind/pagefind-ui.css'
      //   }
      // ],
      // script: [
      //   {
      //     src: '/_pagefind/pagefind-ui.js',
      //     type: 'text/javascript'
      //   }
      // ],
      htmlAttrs: {
        lang: 'id'
      }
    }
  },
  css: [
    resolve('./assets/css/main.css')
  ],
  components: [
    {
      prefix: '',
      path: resolve('./components/akred'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/app'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/docs'),
      global: true
    }
  ],
  content: {
    documentDriven: true,
    highlight: {
      preload: [ 'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate', 'header', 'main', 'aside', 'footer']
    },
    // markdown: {
    //   remarkPlugins: {
    //     'remark-super':{

    //     },
    //   },
    // }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
    mode: 'init'
  },
  colorMode: {
    preference: 'system', 
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'AkColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  
  experimental: {
    inlineSSRStyles: false
  },
  ui: {
    icons: ['all']
  },
  typescript: {
    strict: false,
    includeWorkspace: true
  },
  sitemap: {
    siteUrl: process.env.SITE_URL,
  },
  // routeRules: {
  //   '/': { redirect: '/getting-started' }
  // },
  // generate: {
  //   routes: ['/']
  // }
})
