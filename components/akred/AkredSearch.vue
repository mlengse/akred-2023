<script setup>
const modal = useState('modal', () => false)
const showModal = () => {
  modal.value = !modal.value
}
</script>
<template lang="pug">
.doc-search(@click="showModal")
  button( type="button" aria-label="Search" )
    span.content
      Icon(name="heroicons-outline:search")
      span Search
      span
        kbd ⌘
        kbd K
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
            fontSize: '{fontSize.xs}',
            fontWeight: '{fontWeight.medium}',
          },
          '&:nth-child(2)': {
            flex: 'none',
            display: 'none',
            fontSize: '{fontSize.xs}',
            fontWeight: '{fontWeight.semibold}',
            '@sm': {
              display: 'block'
            }
          }
        }
      }
    },

  }
})
</style>