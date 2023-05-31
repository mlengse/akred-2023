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
      theme: {
        light: 'material-lighter',
        default: 'material-default',
        dark: 'material-palenight'
      },
      preload: [ 'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate', 'header', 'main', 'aside', 'footer']
    },
    markdown: {
      // toc: {
      //   depth: 5,
      //   searchDepth: 5
      // },
      remarkPlugins: {
        // 'remark-math', 
        // 'remark-sub', 
        'remark-super':{

        },
        // 'remark-hypher': {
        //   language: id,
        //   // language: en,
        //   leftmin: 2,
        //   rightmin: 3,
        //   minLength: 4,
        // },
      },
      // rehypePlugins: {
      //   'rehype-katex': {
      //     // the math formula will render as HTML and Mathml
      //     // because the Mathml <annotation> contain the formula text content
      //     // and enable to copy the formula from the web page
      //     // refer to https://katex.org/docs/options.html#:~:text=output
      //     output: 'mathml' // the default value is `htmlAndMathml`
      //   }
      // }
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
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  
  experimental: {
    inlineSSRStyles: false
  },
  ui: {
    // global: true,
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
