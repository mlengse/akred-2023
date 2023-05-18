export default defineAppConfig({
  docus: {
    title: 'Puskesmas Jayengan',
    description: 'Sahabat menuju sehat.',
    image: '/preview.png',
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
