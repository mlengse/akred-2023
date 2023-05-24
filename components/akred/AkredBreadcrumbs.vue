<template>
  <nav>
    <ProseStrong>
      <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <NuxtLink :to="breadcrumb._path"> 
          {{ breadcrumb.title }}
        </NuxtLink>
        <span v-if="index < breadcrumbs.length - 1">
          /
        </span>
      </span>
    </ProseStrong>
    <ProseHr />
  </nav>
</template>

<script setup>
const { navPageFromPath } = useContentHelpers()

const { navigation } = useContent()

const breadcrumbs = useBreadcrumbs().value.map( aaa => navPageFromPath(aaa.to, navigation.value)).filter( e => !!e)
</script>