<template>
  <NuxtLayout name="default">
    <div data-testid="search-results" class="relative" :class="{ 'pointer-events-none opacity-50': loading }">
      <SfLoaderCircular v-if="loading" class="fixed top-[50%] right-0 left-0 m-auto z-[99999]" size="2xl" />
      <CategoryPageContent
        v-if="productsCatalog"
        :title="t('search.searchResults', { phrase: route.query.term })"
        :total-products="productsCatalog.pagination.totals"
        :products="productsCatalog.products"
        :items-per-page="Number(productsPerPage)"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import { SfLoaderCircular } from '@storefront-ui/vue';
const { getRobots, setRobotForStaticPage } = useRobots();

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  layout: false,
  type: 'search',
});

const route = useRoute();
const { getSearch, data: productsCatalog, productsPerPage, loading } = useSearch();
const { getFacetsFromURL } = useCategoryFilter();

const handleQueryUpdate = async () => {
  await getSearch(getFacetsFromURL());
};

await handleQueryUpdate();

watch(
  () => route.query,
  async () => {
    handleQueryUpdate();
  },
);

await getRobots();
setRobotForStaticPage('SearchResult');
</script>
