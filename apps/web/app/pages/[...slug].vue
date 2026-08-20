<template>
  <NuxtLayout
    name="default"
    :breadcrumbs="breadcrumbs"
    class="relative"
    :class="{ 'pointer-events-none opacity-50': loading }"
  >
    <SfLoaderCircular v-if="loading" class="fixed top-[50%] right-0 left-0 m-auto z-[99999]" size="2xl" />

    <EditableBlocks
      :identifier="identifier"
      :type="'category'"
      data-testid="category-page-content"
      :prevent-blocks-request="productsCatalog.category?.type === 'item'"
    >
      <template #beforeFooter>
        <section
          v-if="categoryDescription"
          class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10"
          data-testid="category-description"
        >
          <div class="category-seo-text text-sm md:text-base text-neutral-600 leading-relaxed" v-html="categoryDescription" />
        </section>
      </template>
    </EditableBlocks>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { categoryGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
import type { Locale } from '#i18n';
import { SfLoaderCircular } from '@storefront-ui/vue';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

const { locale } = useI18n();
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

// Category description (Beschreibung 1) shown as SEO text below a category listing.
// Skipped on product-detail URLs (…_itemId or …_itemId_variationId).
const categoryDescription = computed(() => {
  const category = productsCatalog.value.category;
  if (!category) return '';
  const lastSegment = route.path.split('/').filter(Boolean).pop() ?? '';
  if (/_\d+(_\d+)?$/.test(lastSegment)) return '';
  return category.details?.[0]?.description || '';
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
    const breadcrumb = categoryTreeGetters.generateBreadcrumbFromCategory(
      categoryTree.value,
      categoryGetters.getId(productsCatalog.value.category),
    );
    breadcrumb.unshift({ name: t('common.labels.home'), link: '/' });

    return breadcrumb;
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
    router.push({
      path: buildCategoryLanguagePath(`${productsCatalog.value.languageUrls[changedLocale]}`),
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

watchEffect(() => {
  route.meta.identifier = productsCatalog.value.category?.type === 'content' ? productsCatalog.value.category?.id : 0;
});

useHead({
  title: headTitle,
  meta: [
    { name: 'description', content: descriptionContent },
    { name: 'keywords', content: keywordsContent },
    { name: 'robots', content: robotsContent },
  ],
});
</script>

<style scoped>
.category-seo-text :deep(h1),
.category-seo-text :deep(h2),
.category-seo-text :deep(h3) {
  font-weight: 700;
  color: #262626;
  margin: 1.25rem 0 0.5rem;
}
.category-seo-text :deep(h2) {
  font-size: 1.25rem;
}
.category-seo-text :deep(h3) {
  font-size: 1.05rem;
}
.category-seo-text :deep(p) {
  margin-bottom: 0.75rem;
}
.category-seo-text :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin-bottom: 0.75rem;
}
.category-seo-text :deep(a) {
  color: #384d37;
  text-decoration: underline;
}
</style>
