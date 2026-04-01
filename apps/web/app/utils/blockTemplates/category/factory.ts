import type { Block } from '@plentymarkets/shop-api';
import { createFooter } from '../footer/factory';

export function createCategory(): Block[] {
  const categoryName = t('defaultTemplate.category.categoryData.name');

  return [
    {
      name: 'CategoryData',
      type: 'content',
      meta: {
        uuid: 'catdata-de-001',
        isGlobalTemplate: false,
      },
      content: {
        name: categoryName,
        fields: {
          name: true,
          description1: false,
          description2: false,
          shortDescription: false,
        },
        fieldsOrder: ['name', 'description1', 'description2', 'shortDescription'],
        fieldsDisabled: [],
        displayCategoryImage: 'off',
        image: {
          fillMode: 'fill',
          alt: '',
          brightness: 0.75,
        },
        text: {
          color: '#000',
          bgColor: '#fff',
          bgOpacity: 1,
          textAlignment: 'left',
          justify: 'top',
          align: 'left',
          background: true,
        },
        layout: {
          paddingTop: 6,
          paddingBottom: 2,
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    {
      name: 'SubcategoryBar',
      type: 'content',
      meta: {
        uuid: 'subcategory-bar-001',
        isGlobalTemplate: false,
      },
      content: {
        enabled: true,
      },
    },
    {
      name: 'SortFilter',
      type: 'content',
      meta: {
        uuid: 'sortfilter-de-001',
        isGlobalTemplate: false,
      },
      content: {
        fields: {
          category: true,
          sortBy: true,
          perPage: true,
          itemRating: true,
          manufacturer: true,
          price: true,
          availability: true,
          customizedFilters: true,
        },
        filtersOrder: [
          'category',
          'sortBy',
          'perPage',
          'itemRating',
          'manufacturer',
          'price',
          'availability',
          'customizedFilters',
        ],
        filtersDisabled: [],
        showAllFiltersImmediately: true,
        numberOfFiltersToShowInitially: 0,
      },
    },
    {
      name: 'ItemGrid',
      type: 'content',
      meta: {
        uuid: 'itemgrid-de-001',
        isGlobalTemplate: false,
      },
      content: {
        itemsPerRowDesktop: 4,
        itemsPerRowTablet: 3,
        itemsPerRowMobile: 2,
        showItemCount: true,
        itemCountPosition: 'left',
        fields: {
          title: true,
          rating: true,
          previewText: false,
          price: true,
          addToCart: true,
          manufacturer: true,
        },
        fieldsOrder: ['manufacturer', 'title', 'rating', 'previewText', 'price', 'addToCart'],
        fieldsDisabled: ['title'],
        contentAlignment: 'left',
        cardBorders: true,
        showSecondImageOnHover: false,
        showWishlistButton: true,
        addToCartStyle: 'primary',
        paginationPosition: 'bottom',
      },
    },
    createFooter(),
  ] as Block[];
}
