<script setup lang="ts">
const { tree } = useDocus()
const { isSearchModalOpen } = useDocs()
const { metaSymbol } = useShortcuts()
</script>

<template lang="pug">
nav
  .bg-white.relative.pointer-events-auto( class='dark:bg-gray-900')
    UButton.w-full(icon="i-heroicons-magnifying-glass-20-solid" color="gray" @click="isSearchModalOpen = true") Search
      .hidden.items-center.ml-auto.-my-1( class="gap-0.5 lg:flex")
        UKbd {{ metaSymbol }}
        UKbd K
  ProseHr
  DocsAsideTree( v-if="tree?.length > 0" :links="tree")
  NuxtLink.go-back-link( v-else to="/")
    Icon.icon(name="heroicons-outline:arrow-left")
    span.text Go back
</template>

<style scoped lang="ts">
css({
  '.go-back-link': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '{text.sm.fontSize}',
    lineHeight: '{text.sm.lineHeight}',
    cursor: 'pointer',
    color: '{color.gray.500}',
    '&:hover': {
      color: '{color.gray.700}',
    },
    '.icon': {
      width: '{space.4}',
      height: '{space.4}'
    },
    '.text': {
      marginLeft: '{space.2}'
    }
  }
})
</style>
