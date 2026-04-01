import type { Block } from '@plentymarkets/shop-api';
import { v4 as uuid } from 'uuid';
import { createFooter } from '../footer/factory';

export const createProduct = (): Block[] => {
  const itemTextTitle = t('defaultTemplate.product.itemText.title');
  const technicalDataTitle = t('defaultTemplate.product.technicalData.title');
  const customerReviewTitle = t('defaultTemplate.product.customerReview.title');

  return [
    {
      name: 'MultiGrid',
      type: 'structure',
      meta: {
        uuid: uuid(),
        isGlobalTemplate: false,
      },
      configuration: {
        columnWidths: [6, 6],
        sticky: [],
        layout: {
          marginTop: '0',
          marginBottom: '0',
        },
      },
      layout: {
        gap: 'XL',
        narrowContainer: true,
      },
      content: [
        {
          name: 'ImageGallery',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 0,
          content: {
            thumbnails: {
              showThumbnails: true,
              thumbnailType: 'left-vertical',
              enableHoverZoom: true,
            },
          },
        },
        {
          name: 'PriceCard',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 1,
          content: {
            fields: {
              itemName: true,
              price: true,
              tags: false,
              availability: true,
              starRating: true,
              orderProperties: true,
              variationProperties: true,
              previewText: true,
              attributes: true,
              itemBundle: false,
              graduatedPrices: true,
              addToWishlist: true,
              quantityAndAddToCart: true,
              requestQuote: true,
              itemText: false,
              technicalData: false,
            },
            fieldsOrder: [
              'itemName',
              'starRating',
              'previewText',
              'price',
              'availability',
              'variationProperties',
              'orderProperties',
              'attributes',
              'itemBundle',
              'graduatedPrices',
              'addToWishlist',
              'quantityAndAddToCart',
              'requestQuote',
              'itemText',
              'technicalData',
            ],
            fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
            wishlistSize: 'small',
            dropShadow: false,
            borders: true,
            borderColor: '#EFF4F1',
            layout: {
              paddingTop: 0,
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            },
          },
        },
      ],
    },
    {
      name: 'MultiGrid',
      type: 'structure',
      meta: {
        uuid: uuid(),
        isGlobalTemplate: false,
      },
      configuration: {
        columnWidths: [7, 5],
        sticky: [0],
        layout: {
          marginTop: '70',
          marginBottom: '60',
        },
      },
      layout: {
        gap: 'XXL',
        narrowContainer: true,
      },
      content: [
        {
          name: 'ItemText',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 0,
          content: {
            text: {
              title: itemTextTitle,
            },
            layout: {
              displayAsCollapsable: true,
              initiallyCollapsed: false,
              paddingTop: 0,
              paddingBottom: 8,
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
        {
          name: 'ItemData',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 0,
          content: {
            text: {
              title: t('defaultTemplate.product.itemData.title'),
            },
            fields: {
              itemId: true,
              condition: true,
              manufacturer: true,
              manufacturingCountry: true,
              content: true,
              grossWeight: true,
              netWeight: true,
              dimensions: true,
              model: true,
              externalVariationId: false,
              customTariffNumber: false,
              ageRating: false,
              properties: true,
            },
            fieldsOrder: [
              'manufacturer',
              'model',
              'dimensions',
              'grossWeight',
              'netWeight',
              'content',
              'condition',
              'manufacturingCountry',
              'itemId',
              'properties',
            ],
            layout: {
              displayAsCollapsable: true,
              initiallyCollapsed: true,
              paddingTop: 0,
              paddingBottom: 8,
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
        {
          name: 'TechnicalData',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 0,
          content: {
            text: {
              title: technicalDataTitle,
            },
            layout: {
              displayAsCollapsable: true,
              initiallyCollapsed: true,
              paddingTop: 0,
              paddingBottom: 8,
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
        {
          name: 'CustomerReview',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 0,
          content: {
            text: {
              title: customerReviewTitle,
            },
            layout: {
              collapsible: true,
              initiallyCollapsed: true,
              paddingTop: 0,
              paddingBottom: 8,
            },
          },
        },
        {
          name: 'ProductRecommendedProducts',
          type: 'content',
          meta: {
            uuid: uuid(),
            isGlobalTemplate: false,
          },
          parent_slot: 1,
          content: {
            text: {
              title: t('defaultTemplate.product.recommendedAccessory.title'),
            },
            source: {
              type: 'cross_selling',
              itemId: '',
              categoryId: '',
              crossSellingRelation: 'Accessory',
            },
            layout: {
              displayMode: 'grid',
              gridColumns: 2,
              maxItems: 4,
            },
          },
        },
      ],
    },
    {
      name: 'ProductRecommendedProducts',
      type: 'content',
      meta: {
        uuid: uuid(),
        isGlobalTemplate: false,
      },
      content: {
        text: {
          title: t('defaultTemplate.product.recommendedSimilar.title'),
        },
        source: {
          type: 'cross_selling',
          itemId: '',
          categoryId: '',
          crossSellingRelation: 'Similar',
        },
        layout: {
          displayMode: 'grid',
          gridColumns: 5,
          maxItems: 5,
          fullWidthContainer: true,
        },
      },
    },
    createFooter(),
  ] as Block[];
};
