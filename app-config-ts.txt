export default defineAppConfig({
  // the alternative to Nuxt theme https://nuxt-themes.netlify.app/
  // bloginote: {
  //   // author: 'Benbinbin',
  //   // email: 'benthomsonbin@gmail.com',
  //   // avatar: '/default-avatar.png',
  //   // favicon: '/default-favicon.ico',
  //   // scrollSmooth: true,
  //   // homePage: {
  //   //   showBlogPosts: true,
  //   //   postItemLimit: 20
  //   // },
  //   // subscribePage: true,
  //   // articlePage: {
  //   //   showTime: true,
  //   //   outdated: {
  //   //     show: true,
  //   //     threshold: 30
  //   //   },
  //   //   showCatalog: true,
  //   // },
  //   search: {
  //     exclude: [
  //       '/',
  //     ]
  //   },
  //   assetTypes: []
  // },
  docus: {
    title: 'Akreditasi 2023',
    description: 'Puskesmas Jayengan. Sahabat menuju sehat.',
    url: process.env.SITE_URL,
    socials: {
      youtube: '@puskesmasjayengan',
      instagram: 'puskesmasjayengan'
    },
    aside: {
      level: 1,
      exclude: []
    },
    header: {
      logo: false,
      title: 'Akred 2023',
      showLinkIcon: true
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Bukan Demit',
        href: 'https://github.com/mlengse',
      },
      iconLinks: [
        {
          href: 'https://pkm-jayengan.surakarta.go.id/',
          icon: 'mdi:web'
        }
      ]
    }
  }
})
