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
        maxSlides: 2,
        autoplay: true,
        autoplayInterval: 6000,
        excludeNames: [],
        onlyStatic: true,
        staticSlides: [
          {
            imageUrl: '/_nuxt-plenty/images/slider-tableware.png',
            name: 'Tischkultur',
            subtitle: 'B2B Großhandelspreise',
            description: 'Porzellan, Gläser & Besteck für Gastronomie-Profis.',
            link: '/geschirr-tischaccessoires/',
            badge: 'B2B Sortiment',
          },
          {
            imageUrl: '/_nuxt-plenty/images/slider-bedding.png',
            name: 'Hotelbedarf',
            subtitle: 'Staffelpreise ab 10 Stück',
            description: 'Bettwäsche & Textilien in Hotelqualität.',
            link: '/heimtextilien/',
            badge: 'Für Hotels & Pensionen',
          },
        ],
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
