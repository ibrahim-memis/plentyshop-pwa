export const validateApiUrl = (url: string | undefined): string | undefined => {
  return url?.replace(/[/\\]+$/, '');
};

export const isPageOfType = (type: string): boolean => {
  return useNuxtApp().$router.currentRoute.value.meta.type === type;
};

const LOCALE_PREFIXES = new Set(['en', 'de', 'tr', 'fr', 'it', 'es', 'bg', 'nl', 'pl', 'pt', 'nn', 'ro', 'da', 'se', 'cz', 'ru', 'sk', 'cn', 'vn']);

/**
 * Strips any known locale prefix from a URL path.
 * e.g. "/en/some-product" -> "/some-product"
 *      "en/some-product"  -> "/some-product"
 */
export const stripLocalePrefix = (path: string): string => {
  if (!path) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const parts = normalized.split('/');
  if (parts.length >= 2 && parts[1] && LOCALE_PREFIXES.has(parts[1])) {
    const stripped = '/' + parts.slice(2).join('/');
    return stripped || '/';
  }
  return normalized;
};
