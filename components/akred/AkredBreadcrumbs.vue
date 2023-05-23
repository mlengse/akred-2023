<template>
  <nav>
    <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <NuxtLink :to="breadcrumb.path"> 
        {{ breadcrumb.title }}
      </NuxtLink>
      <span v-if="index < breadcrumbs.length - 1">
        /
      </span>
    </span>
  </nav>
</template>

<script setup lang="ts">

export interface IBreadcrumb {
  path:   string,
  title:  string,
}

export type TBreadcrumbs = IBreadcrumb[];

const breadcrumbs = ref<TBreadcrumbs>([
  {
    path: '/',
    title: '',
  },
]);

const generateCrumbs = async () => {
  const contentQueryList = useBreadcrumbs().value

  const mbuh = [] 

  for(const aaa of contentQueryList) {
    const contentQuery = await queryContent().where({ _path: aaa.to }).only(['_path', 'title']).find();
    mbuh.push({
      path:  contentQuery[0]._path,
      title: contentQuery[0].title,
    })
  }

  mbuh.shift()

  return mbuh as TBreadcrumbs
  
}

onMounted(async () => {
  breadcrumbs.value = await generateCrumbs();
});
</script>
