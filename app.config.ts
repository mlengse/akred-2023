export default defineAppConfig({
  docus: {
    url: process.env.SITE_URL,
    title: 'Akreditasi',
    description: 'Puskesmas Jayengan. Sahabat menuju sehat.',
    image: 'https://jyg.my.id/preview.png',
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
