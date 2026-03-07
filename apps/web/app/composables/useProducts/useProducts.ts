import type { FacetSearchCriteria, Product, Facet, Block } from '@plentymarkets/shop-api';
import { defaults, type SetCurrentProduct } from '~/composables';
import type { UseProductsState, FetchProducts, UseProductsReturn } from '~/composables/useProducts/types';
import categoryTemplateData from '~/composables/useCategoryTemplate/categoryTemplateData.json';
import { fakeFacetCallEN } from '~/utils/facets/fakeFacetCallEN';
import { fakeFacetCallDE } from '~/utils/facets/fakeFacetCallDE';

const useCategoryTemplateData = () => categoryTemplateData as Block[];

/**
 * @description Composable for managing products.
 * @returns UseProductsReturn
 * @example
 * ``` ts
 * const { data, loading, productsPerPage, selectedVariation, fetchProducts, selectVariation } = useProducts();
 * ```
 */
export const useProducts: UseProductsReturn = (category = '') => {
  const state = useState<UseProductsState>(`useProducts${category}`, () => ({
    data: {} as Facet,
    loading: false,
    productsPerPage: defaults.DEFAULT_ITEMS_PER_PAGE,
    currentProduct: {} as Product,
  }));

  const isGlobalProductCategoryTemplate = computed(() => {
    const route = useRoute();
    const slugParam = route.params.slug;

    if (slugParam === undefined) {
      return false;
    }

    const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
    return `/${slug}` === paths.globalItemCategory;
  });

  const fetchProducts: FetchProducts = async (params: FacetSearchCriteria) => {
    const route = useRoute();
    const { $i18n } = useNuxtApp();
    const { isInEditor } = useEditorState();
    const {
      data: blockData,
      setupBlocks,
      getBlocksServer,
    } = useCategoryTemplate(route?.meta?.identifier as string, route.meta.type as string, $i18n.locale.value);

    state.value.loading = true;

    if (params.categoryUrlPath?.endsWith('.js')) return state.value.data;

    if (isGlobalProductCategoryTemplate.value && isInEditor.value) {
      const fakeFacet = $i18n.locale.value === 'en' ? fakeFacetCallEN : fakeFacetCallDE;

      await getBlocksServer(route.meta.identifier as string, route.meta.type as string);
      const fakeBlocks = blockData.value?.length ? blockData.value : useCategoryTemplateData();

      state.value.data = {
        category: fakeFacet['data'].category,
        products: [],
        facets: [],
        blocks: fakeBlocks,
        languageUrls: {
          'x-default': '',
        },
        pagination: {
          totals: 8,
          perPageOptions: defaults.PER_PAGE_STEPS,
        },
      } as Facet;

      setupBlocks(fakeBlocks);

      handlePreviewProducts(state, $i18n.locale.value);

      state.value.loading = false;
      return state.value.data;
    }

    const identifier = category || params.categoryUrlPath || params.categoryId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let facetData: any = null;

    if (import.meta.server) {
      const { data } = await useAsyncData(`useProducts-${identifier}-${JSON.stringify(params)}`, () =>
        useSdk().plentysystems.getFacet(params),
      );
      facetData = data.value?.data ?? null;
    } else {
      try {
        const result = await useSdk().plentysystems.getFacet(params);
        facetData = result?.data ?? null;
      } catch {
        facetData = null;
      }
    }

    state.value.productsPerPage = params.itemsPerPage || defaults.DEFAULT_ITEMS_PER_PAGE;

    if (facetData) {
      facetData.pagination.perPageOptions = defaults.PER_PAGE_STEPS;
      state.value.data = facetData;
      handlePreviewProducts(state, $i18n.locale.value);

      const defaultData = state.value.data.category.type === 'item' ? useCategoryTemplateData() : [];

      await setupBlocks((state.value.data?.blocks?.length ? state.value.data.blocks : defaultData) as Block[]);
    }

    state.value.loading = false;
    return state.value.data;
  };

  const setCurrentProduct: SetCurrentProduct = async (product: Product) => {
    if (state.value.currentProduct === product) return;
    state.value.currentProduct = product;
  };

  return {
    fetchProducts,
    setCurrentProduct,
    isGlobalProductCategoryTemplate,
    ...toRefs(state.value),
  };
};
