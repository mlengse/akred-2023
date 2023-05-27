<script setup lang="ts">
const { config } = useDocus()
</script>

<template lang="pug">
.page-layout
  Container(
      :fluid="config?.main?.fluid"
      :padded="config?.main?.padded"
    )
      article
        slot
</template>

<style lang="ts" scoped>
css({
  '.page-layout': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }
})
</style>
