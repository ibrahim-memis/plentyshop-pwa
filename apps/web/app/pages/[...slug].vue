<template>
  <NuxtLayout
    name="default"
    :breadcrumbs="breadcrumbs"
    class="relative"
    :class="{ 'pointer-events-none opacity-50': loading }"
  >
    <SfLoaderCircular v-if="loading" class="fixed top-[50%] right-0 left-0 m-auto z-[99999]" size="2xl" />

    <EditablePage
      :identifier="identifier"
      :type="'category'"
      data-testid="category-page-content"
      :prevent-blocks-request="productsCatalog.category?.type === 'item'"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import { categoryGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';
import { stripLocalePrefix } from '~/utils/pathHelper';
const { locale, t } = useI18n();
const route = useRoute();
const router = useRouter();
const { setCategoriesPageMeta } = useUrlPageMeta();
const { setBlocksListContext } = useBlocksList();
const { getFacetsFromURL, checkFiltersInURL } = useCategoryFilter();
const { fetchProducts, data: productsCatalog, loading } = useProducts();
const { data: categoryTree } = useCategoryTree();
const { buildCategoryLanguagePath } = useLocalization();

const identifier = computed(() =>
  productsCatalog.value.category?.type === 'content' ? productsCatalog.value.category?.id : 0,
);

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  layout: false,
  middleware: ['category-guard'],
  type: 'category',
  isBlockified: true,
  identifier: 0,
});

const breadcrumbs = computed(() => {
  if (productsCatalog.value.category) {
    const crumbs = categoryTreeGetters.generateBreadcrumbFromCategory(
      categoryTree.value,
      categoryGetters.getId(productsCatalog.value.category),
    );
    for (const crumb of crumbs) {
      if (crumb.link) crumb.link = stripLocalePrefix(crumb.link);
    }
    return [
      { name: t('common.labels.home'), link: '/' },
      ...crumbs,
    ];
  }

  return [];
});

const canonicalDb = productsCatalog.value.category?.details?.[0]?.canonicalLink;

const handleQueryUpdate = async () => {
  await fetchProducts(getFacetsFromURL()).then(() => checkFiltersInURL());

  if (!productsCatalog.value.category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
    });
  }
};

await handleQueryUpdate().then(() => {
  setCategoriesPageMeta(productsCatalog.value, getFacetsFromURL(), canonicalDb);
  setBlocksListContext(productsCatalog.value.category.type === 'item' ? 'productCategory' : 'content');
});

const { setPageMeta } = usePageMeta();
const categoryName = computed(() => categoryGetters.getCategoryName(productsCatalog.value.category));
const icon = 'sell';
setPageMeta(categoryName.value, icon);

watch(
  () => locale.value,
  (changedLocale: string) => {
    const langUrl = productsCatalog.value.languageUrls?.[changedLocale];
    if (!langUrl) return;
    router.push({
      path: buildCategoryLanguagePath(langUrl),
      query: route.query,
    });
  },
);

const headTitle = computed(() =>
  productsCatalog.value?.category
    ? ((categoryGetters.getMetaTitle(productsCatalog.value.category) || process.env.METATITLE) ?? '')
    : (process.env.METATITLE ?? ''),
);

const descriptionContent = computed(() =>
  productsCatalog.value?.category
    ? ((categoryGetters.getMetaDescription(productsCatalog.value.category) || process.env.METADESC) ?? '')
    : (process.env.METADESC ?? ''),
);

const keywordsContent = computed((): string =>
  productsCatalog.value?.category
    ? ((categoryGetters.getMetaKeywords(productsCatalog.value.category) || process.env.METAKEYWORDS) ?? '')
    : (process.env.METAKEYWORDS ?? ''),
);

const robotsContent = computed((): string =>
  productsCatalog.value?.category ? categoryGetters.getCategoryRobots(productsCatalog.value.category) : '',
);

watch(
  () => route.query,
  async () => {
    await handleQueryUpdate().then(() => setCategoriesPageMeta(productsCatalog.value, getFacetsFromURL()));
  },
);

watch(
  () => productsCatalog.value.category,
  (category) => {
    const newId = category?.type === 'content' ? category?.id : 0;
    if (route.meta.identifier !== newId) {
      route.meta.identifier = newId;
    }
  },
  { immediate: true },
);

useHead({
  title: headTitle,
  meta: [
    { name: 'description', content: descriptionContent },
    { name: 'keywords', content: keywordsContent },
    { name: 'robots', content: robotsContent },
  ],
});
</script>
