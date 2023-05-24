<script setup lang="ts">
const { navigation } = useContent()
const { config } = useDocus()

const filtered = computed(() => config.value.aside?.exclude || [])

const links = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const { visible, open, close } = useModal()
const enabled = ref(false)

watch(visible, v => (v ? open() : close()))
</script>

<template lang="pug">
div
  .doc-search(@click="open")
    button( type="button" aria-label="Search" )
      span.content
        Icon(name="heroicons-outline:search")
        span Search
        span
          kbd ⌘
          kbd K

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  teleport( to="body")
    nav(
      v-if="visible"
      class="dialog"
      @click="close"
    )
      div( @click.stop)
        div( class="wrapper")
          p ajjkb asdad asdasda asdad {{ visible }}
          button(
            aria-label="Menu"
            @click="close"
          )
            Icon(
              name="heroicons-outline:x"
              aria-hidden="”true”"
            )
            
</template>

<style scoped lang="ts">
css({
  '.doc-search': {
    display: 'flex',
    '&:hover': {
      button: {
        borderColor: '{color.gray.300}'
      }
    },
    button: {
      // padding: '{space.2} {space.4}',
      '.content': {
        borderRadius: '{radii.md}',
        display: 'flex',
        alignItems: 'center',
        color: '{color.gray.500}',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '{color.gray.100}',
        fontSize: '{fontSize.xs}',
        gap: '{space.2}',
        padding: '{space.rem.375}',
        '@dark': {
          color: '{color.gray.400}',
          borderColor: '{color.gray.900}',
        },
        '&:hover': {
          color: '{color.gray.700}',
          borderColor: '{color.gray.400}',
          '@dark': {
            color: '{color.gray.200}',
            borderColor: '{color.gray.700}',
          }
        },
        span: {
          '&:first-child': {
            display: 'block',
            fontSize: '{fontSize.s}',
            fontWeight: '{fontWeight.medium}',
          },
          '&:nth-child(2)': {
            flex: 'none',
            fontSize: '{fontSize.s}',
            fontWeight: '{fontWeight.semibold}',
            // '@sm': {
              display: 'block'
            // }
          }
        }
      }
    },
  },
  button: {
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    padding: '{space.4} {space.4} {space.4} 0',
    // '@lg': {
    //   display: 'none'
    // },
    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}',
    },
    '&:hover': {
      color: '{color.gray.700}',
      '@dark': {
        color: '{color.gray.200}',
      }
    },
  },
  '.dialog': {
    position: 'fixed',
    inset: '0 0 0 0',
    zIndex: '50',
    display: 'flex',
    alignItems: 'flex-start',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: '{elements.backdrop.filter}',
    '@dark': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    // '@lg': {
    //   display: 'none'
    // },
    '.icons': {
      overflow: 'auto'
    },
    // Dialog content
    '& > div': {
      maxWidth: '{size.s}',
      width: '100%',
      minHeight: '100%',
      boxShadow: '{shadow.md}',
      px: '{space.4}',
      backgroundColor: '{color.white}',
      '@dark': {
        backgroundColor: '{color.black}',
      },
      '@sm': {
        px: '{space.6}',
      },
      // Dialog header
      '& > div': {
        height: '{docus.header.height}',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid transparent',
        gap: '{space.2}',
        '.icons': {
          display: 'flex',
          alignItems: 'center',
        }
      }
    }
  },
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  }
})
</style>