
export default {
  bloginote: {
    search: {
      exclude: [
        '/',
        '/about/',
        '/subscribe/',
        '/list/'
      ]
    },
  },
  docus: {
    title: 'Akreditasi 2023',
    description: 'Puskesmas Pajang. Sahabat menuju sehat.',
    url: process.env.SITE_URL,
    socials: {
      youtube: '@puskesmaspajang',
      instagram: 'puskesmaspajang',
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
      iconLinks: [
        {
          href: 'https://pkm-pajang.surakarta.go.id/',
          icon: 'mdi:web',
          label: 'laman resmi Puskesmas Pajang'
        }
      ]
    }
  },
}