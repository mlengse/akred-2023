<script setup lang="ts">
const pagefindPath = "/_pagefind/pagefind.js"
const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.app.baseURL
let pagefind: any;
// if (!process.dev) {
if (process.client) {
  try {
    pagefind = await import(/* @vite-ignore */pagefindPath);
    if (baseURL !== '/') {
      await pagefind.options({
        baseURL: baseURL
      })
    }
  } catch (error) {
      console.log(error);
  }
}
// search modal
const { isSearchModalOpen } = useDocs()

// const showSearchModal = useState<Boolean>('showSearchModal', () => false)
// stop body scroll when search modal show up
watch(isSearchModalOpen, () => {
  if (!document?.body) { return }
  if (isSearchModalOpen.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})
// const searchInputDOM = ref<HTMLElement | null>(null) // get the input DOM
// when the search modal show up, auto focus the input box
onMounted(() => {
  // watch(isSearchModalOpen, () => {
  //   if (searchInputDOM.value && isSearchModalOpen.value) {
  //     nextTick(() => {
  //       searchInputDOM.value?.focus()
  //     })
  //   }
  // })
})
// const focusInputHandler = () => {
//   if (searchInputDOM.value) {
//     searchInputDOM.value.focus()
//   }
// }
// listen input and then search
const searchState = ref<'waiting' | 'solved'>('waiting')
const inputText = ref<string>('')
const searchResults = ref<any[]>([])
watch(inputText, () => {
  searchState.value = 'waiting'
})
let timer: (null | ReturnType<typeof setTimeout>) = null
const appConfig = useAppConfig()
const debouncedSearch = async (key: string, delay: number = 100) => {
  if (timer) {
    clearTimeout(timer)
  }
  if (key) {
    // timer = setTimeout(async () => {
      if (pagefind) {
        try {
          const metaResults = await pagefind.debouncedSearch(key);
          timer = null
          if (metaResults?.results?.length > 0) {
            console.log(`${key}: ${metaResults.results.length}`)
            const resultsData = await Promise.all(metaResults.results.map((r: any) => r.data()));
            let filterResults = []
            if (appConfig?.bloginote?.search?.exclude && appConfig.bloginote.search.exclude.length > 0) {
              filterResults = resultsData.filter(item => !appConfig.bloginote.search.exclude.includes(item.url))
            } else {
              filterResults = resultsData
            }
            searchResults.value = filterResults.map( item => {
              const res = Object.assign({}, item, {
                url: item.url.replace(/\/$/, "")
              })
              // console.log(res.excerpt)
              return res
            });
          } else {
            searchResults.value = []
          }
        } catch (error) {
          console.log(error);
        } finally {
          searchState.value = 'solved'
        }
      } else {
        // console.log('tidak ada pagefind')
      }
    // }, delay)
  } else {
    timer = null
    searchResults.value = []
    inputText.value = ''
    searchState.value = 'solved'
  }
}
const inputHandler = async (event: Event) => {
  const target = event.target as HTMLInputElement
  // console.log(target.value)
  if (pagefind) {
    if(target.value.length === 1) {
      await pagefind.preload(target.value);
    }
    await debouncedSearch(target.value)
  } else {
    // console.log(process.dev)
    // console.log('tidak ada pagefind.preload')

  }
}
const clearInputTextHandler = () => {
  inputText.value = ''
  searchResults.value = []
  searchState.value = 'waiting'
}
const { usingInput } = useShortcuts()
const canToggleModal = computed(() => isSearchModalOpen.value || !usingInput.value)
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
  },
  delete: {
    usingInput: true,
    whenever: [isSearchModalOpen],
    handler: () => { inputText.value = ''; searchResults.value = [] }
  }

})
</script>

<template lang="pug">
Client-Only 
  .expand-window.p-4.fixed.inset-0.flex.justify-center.items-start(v-if="isSearchModalOpen" class="z-[80]")
    .expand-window.absolute.inset-0.-z-10.flex.justify-center.items-center.backdrop-blur( class="bg-black/5" @click="isSearchModalOpen =false")
    .modal-container.flex.flex-col.w-full.max-w-prose.bg-white(class="sepia:bg-yellow-300 dark:bg-gray-900")
      .px-4.py-4.flex.items-center.gap-4.border-b.rounded-t-lg
        UInput(
          name="searchInputDOM"
          :autofocus='isSearchModalOpen && !inputText.length '
          v-model="inputText"
          type="text"
          placeholder="Search Content"
          class="grow focus:outline-none"
          @input="inputHandler")
        button.flex.justify-center.items-center(v-if='inputText.length && searchState !== "waiting"')
          Icon.shrink-0.w-6.h-6.text-gray-600(name="tabler:search")
        button(
          v-if='inputText.length'
          title='pencet Del utk hapus semua'
          class="px-2 py-1 text-xs text-gray-400 hover:text-gray-600 font-mono font-bold hover:bg-gray-50 border border-gray-400 hover:border-gray-600 rounded transition-colors duration-300"
          @click="clearInputTextHandler")
            UKbd Del
        button(
          class="px-2 py-1 text-xs text-gray-400 hover:text-gray-600 font-mono font-bold hover:bg-gray-50 border border-gray-400 hover:border-gray-600 rounded transition-colors duration-300"
          title="penceet Esc untuk menutup"
          @click="isSearchModalOpen=false") 
            UKbd Esc
      div(class="modal-content-container px-4 overflow-y-auto rounded-b-lg")
        div(
          v-show="!inputText"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-400")
          Icon(
            name="fluent:text-t-28-filled"
            class="w-12 h-12")
          p Ketik untuk mencari
        div(
          v-show="inputText && searchState === 'waiting'"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-400")
          Icon(
            name="fluent:slide-search-28-filled"
            class="w-12 h-12 animate-bounce")
          p Mencari
        ul(
          v-show="searchResults.length>0"
          class="search-result p-4 space-y-2")
          li(
            v-for="item in searchResults"
            :key="item.url"
            class="p-4 hover:text-white hover:bg-purple-500 rounded")
            NuxtLink(
              :to="item.url"
              @click.exact="isSearchModalOpen=false")
              p( class="font-bold") {{ item.meta.title }}
              p(
                class="text-sm"
                v-html="item.excerpt")
        div(
          v-show="inputText && searchState === 'solved' && !(searchResults.length > 0)"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-red-400")
          Icon(
            name="fluent:mail-inbox-dismiss-28-filled"
            class="w-12 h-12 ")
          p Mboten wonten.
</template>

<style scoped>
.search-result mark {
  @apply bg-yellow-300; 
}
.modal-container {
  max-height: 90dvh;
}
.modal-content-container::-webkit-scrollbar {
  display: none;
}
.bg {
  background-color: '{docus.body.backgroundColor}';
}
</style>