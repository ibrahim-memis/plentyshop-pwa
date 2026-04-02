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
      name: 'BrandsShowcase',
      type: 'content',
      meta: {
        uuid: 'brandsshowcase-de-001',
        isGlobalTemplate: false,
      },
      content: {
        maxBrands: 8,
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
      name: 'NewProducts',
      type: 'content',
      meta: {
        uuid: 'newproducts-de-001',
        isGlobalTemplate: false,
      },
      content: {
        maxItems: 8,
      },
    },
    {
      name: 'AboutHorecax',
      type: 'content',
      meta: {
        uuid: 'about-horecax-001',
        isGlobalTemplate: false,
      },
      content: {
        enabled: true,
      },
    },
    createFooter(),
  ];
}
