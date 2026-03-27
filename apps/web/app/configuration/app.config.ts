export const metaDefaults = {
  title: process.env.NUXT_PUBLIC_META_TITLE || process.env.METATITLE || 'Nordic Schiller - B2B Shop',
  description: process.env.NUXT_PUBLIC_META_DESCRIPTION || process.env.METADESC || 'Nordic Schiller B2B Shop - HafenX',
  keywords: process.env.NUXT_PUBLIC_META_KEYWORDS || process.env.METAKEYWORDS || 'Nordic Schiller, HafenX, B2B, Shop',
  robots: process.env.NUXT_PUBLIC_ROBOTS || 'all',
  themeColor: process.env.NUXT_PUBLIC_PRIMARY_COLOR || '#384d37',
};

export const openGraph = {
  title: process.env.NUXT_PUBLIC_OG_TITLE || process.env.OG_TITLE || 'Nordic Schiller',
  image:
    process.env.NUXT_PUBLIC_OG_IMG ||
    process.env.OG_IMG ||
    'https://abdullahy2.sg-host.com/wp-content/uploads/2024/08/logo-1-dark1-1536x411-1.png',
  type: process.env.NUXT_PUBLIC_OG_TYPE || process.env.OG_TYPE || 'website',
};

export const favicon = {
  appleTouchIcon: process.env.NUXT_PUBLIC_FAVICON || process.env.FAVICON || '/_nuxt-plenty/favicon.ico',
};

export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'de',
    },
    meta: [
      { property: 'og:type', content: openGraph.type },
      { property: 'og:image', content: openGraph.image },
      { property: 'og:title', content: openGraph.title },
      { property: 'og:url', content: process.env.API_ENDPOINT },
    ],
  },
};
