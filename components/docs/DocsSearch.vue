<template>
  <!-- <UModal
    v-model="isSearchModalOpen"
    :ui="{
      padding: 'sm:p-4',
      rounded: 'sm:rounded-lg',
      width: 'sm:max-w-3xl',
      height: 'h-screen sm:h-[28rem]'
    
    }"
  > -->
    <div v-if="isSearchModalOpen" class="expand-window p-4 fixed inset-0 z-[80] flex justify-center items-start">
      <div
        class="expand-window absolute inset-0 -z-10 flex justify-center items-center bg-black/5 backdrop-blur"
        @click="isSearchModalOpen =false"
      />
      <div class="modal-container flex flex-col w-full max-w-prose bg-opacity-100">
        <UCommandPalette
          ref="commandPaletteRef"
          :groups="groups"
          :ui="ui"
          command-attribute="title"
          :fuse="{
            fuseOptions: { ignoreLocation: true, includeMatches: true, threshold: 0, keys: ['title', 'description', 'children.children.value', 'children.children.children.value'] },
            resultLimit: 100
          }"
          @update:model-value="onSelect"
          @close="isSearchModalOpen = false"
        />
        <ProseHr />
        <ColorThemeSelect />
        <ProseHr />
      </div>
    
    </div>

  <!-- </UModal> -->
</template>

<script setup lang="ts">
import type { Command } from '@nuxthq/ui/dist/runtime/types'

const { navigation } = useContent()
const router = useRouter()
const { usingInput } = useShortcuts()
const { isSearchModalOpen } = useDocs()

const commandPaletteRef = ref<HTMLElement & { query: Ref<string>, results: { item: Command }[] }>()

const { data: files } = await useLazyAsyncData('search', () => queryContent().where({ _type: 'markdown' }).find(), { default: () => [] })
const ui = {
  wrapper: 'flex flex-col flex-1 min-h-0 bg-gray-50 dark:bg-gray-800',
  input: {
    wrapper: 'relative flex items-center mx-3 py-3',
    base: 'w-full rounded border-2 border-primary-500 placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-0 bg-white dark:bg-gray-900',
    padding: 'px-4',
    height: 'h-14',
    size: 'text-lg',
    icon: {
      base: 'pointer-events-none absolute left-3 text-primary-500 dark:text-primary-400',
      size: 'h-6 w-6'
    }
  },
  group: {
    wrapper: 'p-3 relative',
    label: '-mx-3 px-3 -mt-4 mb-2 py-1 text-sm font-semibold text-primary-500 dark:text-primary-400 font-semibold sticky top-0 bg-gray-50 dark:bg-gray-800 z-10',
    container: 'space-y-1',
    command: {
      base: 'flex justify-between select-none items-center rounded px-2 py-4 gap-2 relative font-medium text-sm group shadow',
      active: 'bg-primary-500 dark:bg-primary-400 text-white',
      inactive: 'bg-white dark:bg-gray-900',
      label: 'flex flex-col min-w-0',
      suffix: 'text-xs',
      icon: {
        base: 'flex-shrink-0 w-6 h-6',
        active: 'text-white',
        inactive: 'text-gray-400 dark:text-gray-500'
      }
    }
  },
  empty: {
    wrapper: 'flex flex-col items-center justify-center flex-1 py-9',
    label: 'text-sm text-center text-gray-500 dark:text-gray-400',
    queryLabel: 'text-lg text-center text-gray-900 dark:text-white',
    icon: 'w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4'
  }
}
// Computed

const defaultGroups = computed(() => navigation.value.map(item => ({
  key: item._path,
  label: item.title,
  commands: files.value.filter(file => file._path.startsWith(item._path)).map(file => ({
    id: file._id,
    title: file.navigation?.title || file.title,
    to: file._path,
    suffix: file.description,
    icon: file.icon
  }))
})))

const queryGroups = computed(() => navigation.value.map(item => ({
  key: item._path,
  label: item.title,
  commands: files.value.filter(file => file._path.startsWith(item._path)).flatMap((file) => {
    return [{
      id: file._id,
      title: file.navigation?.title || file.title,
      to: file._path,
      description: file.description,
      icon: file.icon
    },
    // @ts-ignore
    ...Object.entries(groupByHeading(file.body.children)).map(([hash, { title, children }]) => ({
      id: `${file._path}${hash}`,
      title,
      prefix: `${file.navigation?.title || file.title} ->`,
      prefixClass: 'text-gray-700 dark:text-gray-200',
      to: `${file._path}${hash}`,
      children: concatChildren(children),
      icon: file.icon
    }))]
  })
})))

const groups = computed(() => commandPaletteRef.value?.query ? queryGroups.value : defaultGroups.value)

// avoid conflicts between multiple meta_k shortcuts
const canToggleModal = computed(() => isSearchModalOpen.value || !usingInput.value)

// Methods

function remapChildren (children: any[]) {
  return children?.map((grandChild) => {
    if (['code-inline', 'em', 'a', 'strong'].includes(grandChild.tag)) {
      return { type: 'text', value: grandChild.children.find(child => child.type === 'text')?.value || '' }
    }

    return grandChild
  })
}

function concatChildren (children: any[]) {
  return children.map((child) => {
    if (['alert'].includes(child.tag)) {
      child.children = concatChildren(child.children)
    }
    if (child.tag === 'p') {
      child.children = remapChildren(child.children)

      child.children = child.children?.reduce((acc, grandChild) => {
        if (grandChild.type === 'text') {
          if (acc.length && acc[acc.length - 1].type === 'text') {
            acc[acc.length - 1].value += grandChild.value
          } else {
            acc.push(grandChild)
          }
        } else {
          acc.push(grandChild)
        }
        return acc
      }, [])
    }
    if (['style'].includes(child.tag)) {
      return null
    }

    return child
  })
}

function groupByHeading (children: any[]) {
  const groups = {} // grouped by path
  let hash = '' // file.page with potential `#anchor` concat
  let title: string | null
  for (const node of children) {
    // if heading found, udpate current path
    if (['h2', 'h3'].includes(node.tag)) {
      // find heading text value
      title = node.children?.find(child => child.type === 'text')?.value
      if (title) {
        hash = `#${node.props.id}`
      }
    }
    // push to existing/new group based on path
    if (groups[hash]) {
      groups[hash].children.push(node)
    } else {
      groups[hash] = { children: [node], title }
    }
  }
  return groups
}

function onSelect (option) {
  isSearchModalOpen.value = false

  if (option.click) {
    option.click()
  } else if (option.to) {
    router.push(option.to)
  } else if (option.href) {
    window.open(option.href, '_blank')
  }
}

// Shortcuts

defineShortcuts({
  meta_k: {
    usingInput: true,
    whenever: [canToggleModal],
    handler: () => {
      isSearchModalOpen.value = !isSearchModalOpen.value
    }
  },
  escape: {
    usingInput: true,
    whenever: [isSearchModalOpen],
    handler: () => { isSearchModalOpen.value = false }
  }
})
</script>

<style lang="scss">
.search-result {
  mark {
    @apply bg-yellow-300;
  }
}

.modal-container {
  max-height: 90dvh;
}

.modal-content-container::-webkit-scrollbar {
  display: none;
}
</style>