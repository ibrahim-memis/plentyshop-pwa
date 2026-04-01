import type { Block } from '@plentymarkets/shop-api';
import { createFooter } from '../footer/factory';

export function createHomepage(): Block[] {
  return [
    {
      name: 'HeroSlider',
      type: 'content',
      meta: {
        uuid: 'heroslider-de-001',
        isGlobalTemplate: false,
      },
      content: {
        maxSlides: 5,
        autoplay: true,
        autoplayInterval: 6000,
        excludeNames: [],
        staticSlides: [],
      },
    },
    {
      name: 'CategoryBanners',
      type: 'content',
      meta: {
        uuid: 'catbanners-de-001',
        isGlobalTemplate: false,
      },
      content: {
        maxBanners: 6,
        includeNames: [],
      },
    },
    {
      name: 'CategoryShowcase',
      type: 'content',
      meta: {
        uuid: 'catshowcase-de-001',
        isGlobalTemplate: false,
      },
      content: {
        autoDetect: true,
        maxCategories: 2,
        maxItemsPerCategory: 4,
        excludeNames: [],
        layout: {
          paddingTop: 20,
          paddingBottom: 40,
        },
      },
    },
    createFooter(),
  ];
}
