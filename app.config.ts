
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
    description: 'Puskesmas Jayengan. Sahabat menuju sehat.',
    url: process.env.SITE_URL,
    socials: {
      youtube: '@puskesmasjayengan',
      instagram: 'puskesmasjayengan',
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
          href: 'https://pkm-jayengan.surakarta.go.id/',
          icon: 'mdi:web',
          label: 'laman resmi Puskesmas Jayengan'
        }
      ]
    }
  },
}