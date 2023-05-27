<template lang="pug">
nav
  ProseStrong
    span(v-for="(breadcrumb, index) in breadcrumbs" :key="index")
      NuxtLink(:to="breadcrumb._path")  {{ breadcrumb.title }} 
      span(v-if="index < breadcrumbs.length - 1")  / 
  ProseHr
</template>

<script setup>
const { navPageFromPath } = useContentHelpers()
const { navigation } = useContent()
const breadcrumbs = useBreadcrumbs().value.map( aaa => navPageFromPath(aaa.to, navigation.value)).filter( e => !!e)
</script>