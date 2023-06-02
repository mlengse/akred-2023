<script setup lang="ts">
const colorMode = useColorMode()
const onClick = () => {
  const values = ['system', 'light', 'dark', 'sepia']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template lang="pug">
button(aria-label="Color Mode" @click="onClick")
  AkColorScheme(name='color mode' placeholder="...")
    Icon(v-if="colorMode.preference === 'dark'" name="uil:moon")
    Icon(v-else-if="colorMode.preference === 'sepia'" name="uil:coffee")
    Icon(v-else-if="colorMode.preference === 'light'" name="uil:sun")
    Icon(v-else name="uil:desktop")

</template>

<style lang="ts" scoped>
css({
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
  }
})
</style>
