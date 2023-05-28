<script setup lang="ts">
// import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue'
const { config } = useDocus()
const { navigation } = useContent()
const { isSearchModalOpen } = useDocs()

const hasDialog = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)
const isDialogOpen = ref(false)
function openDocsSearch () {
  isDialogOpen.value = false

  setTimeout(() => {
    isSearchModalOpen.value = true
  }, 100)
}

defineProps({
  //@ts-ignore
  ...variants
})
</script>

<template lang="pug">
      
header( :class="{ 'has-dialog': hasDialog }" data-pagefind-ignore)
  Container( :fluid="config?.header?.fluid ")
    .section.left
      AppHeaderDialog( v-if="hasDialog")
      AppHeaderLogo
    .section.center
      AppHeaderLogo(v-if="hasDialog")
      AppHeaderNavigation
    .section.right
      Client-Only
        button(@click="openDocsSearch")
          Icon( name="heroicons:magnifying-glass")
        //- ColorThemeSelect
        ThemeSelect
      .social-icons
        AppSocialIcons
</template>

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  },

  '.navbar-logo': {
    '.left &': {
      '.has-dialog &': {
        display: 'none',
        '@lg': {
          display: 'block'
        }
      },
    },
    '.center &': {
      display: 'block',
      '@lg': {
        display: 'none'
      }
    }
  },

  button: {
    display: 'flex',
    padding: '{space.4}',

    color: '{color.gray.500}',
    '@dark': {
      color: '{color.gray.400}'
    },

    '&:hover': {
      color: '{color.gray.700}',
      '@dark': {
        color: '{color.gray.200}',
      }
    },
  },

  header: {
    backdropFilter: '{elements.backdrop.filter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {elements.border.primary.static}',
    backgroundColor: '{elements.backdrop.background}',
    height: '{docus.header.height}',

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '{space.2}'
    },

    '.section': {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 4 / span 4',
        '@lg': {
          marginLeft: 0
        },
      },
      '&.center': {
        gridColumn: 'span 4 / span 4',
        justifyContent: 'center',
        flex: '1',
        zIndex: '1'
      },
      '&.right': {
        display: 'flex',
        gridColumn: 'span 4 / span 4',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 'none',
        marginRight: 'calc(0px - {space.4})',
        '.social-icons': {
          display: 'none',
          '@md': {
            display: 'flex',
            alignItems: 'center',
          }
        }
      }
    }
  }
})
</style>
