<template>
  <div data-testid="brands-showcase-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('brandsShowcase.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-600">
            {{ t('brandsShowcase.subtitle') }}
          </p>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[2/1] rounded-xl bg-neutral-50 border border-neutral-200 animate-pulse" />
      </div>

      <div v-else-if="brands.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="brand in brands"
          :key="brand.id"
          :to="localePath(brand.link)"
          class="group flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border border-neutral-200 bg-white shadow-sm hover:border-[#384d37]/30 hover:shadow-lg hover:shadow-[#384d37]/5 transition-all duration-300 aspect-[2/1]"
        >
          <div class="relative w-full h-full flex items-center justify-center">
            <img
              v-if="brand.logoUrl"
              :src="brand.logoUrl"
              :alt="brand.name"
              class="max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            >
            <span
              v-else
              class="text-lg md:text-xl font-bold text-neutral-500 group-hover:text-[#384d37] uppercase tracking-wider transition-colors"
            >
              {{ brand.name }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-12 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50">
        <p class="text-neutral-600">{{ t('brandsShowcase.noBrands') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, manufacturerGetters } from '@plentymarkets/shop-api';
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

interface BrandsShowcaseProps {
  content?: {
    maxBrands?: number;
  };
  meta?: { uuid: string };
}

interface BrandItem {
  id: number;
  name: string;
  logoUrl: string;
  link: string;
}

const props = defineProps<BrandsShowcaseProps>();
const localePath = useLocalePath();
const { t } = useI18n();
const { buildDocumentUrl } = useBuildImageUrl();

const maxBrands = computed(() => props.content?.maxBrands ?? 100);
const { data: categoryTree } = useCategoryTree();

const loading = ref(true);
const brands = ref<BrandItem[]>([]);

const getAllCategoryIds = (): string[] => {
  const ids: string[] = [];
  const walk = (items: CategoryTreeItem[]) => {
    for (const item of items) {
      if (item.type === 'item') ids.push(String(item.id));
      if (item.children?.length) walk(item.children);
    }
  };
  walk(categoryTree.value || []);
  return ids;
};

const extractBrandsFromProducts = (
  products: Product[],
  seen: Set<number>,
  list: BrandItem[],
) => {
  for (const product of products) {
    const manu = productGetters.getManufacturer(product);
    const manufacturerId = product.item?.manufacturerId ?? 0;
    if (!manu || manufacturerId === 0 || seen.has(manufacturerId)) continue;

    seen.add(manufacturerId);
    const name =
      manufacturerGetters.getManufacturerName(manu) ||
      manufacturerGetters.getManufacturerExternalName(manu) ||
      '';
    const logoPath = manufacturerGetters.getManufacturerLogo(manu);
    const logoUrl = buildDocumentUrl(logoPath);

    list.push({
      id: manufacturerId,
      name: name || `Brand ${manufacturerId}`,
      logoUrl,
      link: `/search?term=${encodeURIComponent(name || String(manufacturerId))}`,
    });
  }
};

const fetchBrands = async () => {
  const categoryIds = getAllCategoryIds();
  if (!categoryIds.length) {
    loading.value = false;
    return;
  }

  try {
    const seen = new Set<number>();
    const list: BrandItem[] = [];

    const sdk = useSdk();
    const results = await Promise.all(
      categoryIds.map((catId) =>
        sdk.plentysystems.getFacet({
          categoryId: catId,
          itemsPerPage: 100,
          sort: 'sorting.item.position_asc',
          type: 'category',
        }),
      ),
    );

    for (const result of results) {
      const products = (result?.data?.products as Product[]) || [];
      extractBrandsFromProducts(products, seen, list);
    }

    list.sort((a, b) => a.name.localeCompare(b.name));
    brands.value = list.slice(0, maxBrands.value);
  } catch {
    brands.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBrands);

watch(
  () => categoryTree.value,
  () => fetchBrands(),
  { deep: true },
);
</script>
