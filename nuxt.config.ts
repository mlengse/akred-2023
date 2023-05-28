import { createResolver } from '@nuxt/kit'

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
  modules: [
    '@nuxt-themes/tokens',    
    'pinceau/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxthq/ui',
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
      language: 'id-ID',

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
      theme: {
        light: 'material-lighter',
        default: 'material-default',
        dark: 'material-palenight'
      },
      preload: [ 'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate', 'header', 'main', 'aside', 'footer']
    }

  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'AkColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  
  experimental: {
    inlineSSRStyles: false
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

  // pinceau: {
  //   options: {

  //   }
  // },
  
  // pwa: {
  //   // registerWebManifestInRouteRules: false,
  //   strategies: 'generateSW',
  //   injectRegister: 'script',
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     maximumFileSizeToCacheInBytes: 5000000,
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,xml,json,md,svg,webp,ico,png,jpg}'],
  //     globIgnores: ['google*.html'],
  //     cleanupOutdatedCaches: true,
  //     /*
  //     runtimeCaching: [
  //       {
  //         // source: https://vite-pwa-org.netlify.app/workbox/generate-sw.html
  //         urlPattern: ({ url }) => { return url.pathname.startsWith('/api') },
  //         handler: 'CacheFirst' as const,
  //         options: {
  //           cacheName: 'api-cache',
  //           cacheableResponse: { statuses: [0, 200] }
  //         }
  //       },
  //     ]
  //     */
  //   },
  //   devOptions: {
  //     enabled: true,
  //     navigateFallback: '/'
  //   },
  //   useCredentials: true,
  //   manifest: false,
  //   client: {
  //     installPrompt: true,
  //     // periodicSyncForUpdates: 300 // per 5 min for testing only
  //   }
  // },

  // routeRules: {
  //   '/': { redirect: '/getting-started' }
  // },
  generate: {
    routes: ['/']
  }
})
