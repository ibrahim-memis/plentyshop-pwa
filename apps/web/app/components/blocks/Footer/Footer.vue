<template>
  <footer v-if="resolvedContent" data-testid="footer">
    <!-- ===================== ÜST BÖLÜM: Logo + Açıklama + Adres Kutuları ===================== -->
    <div class="footer-main">
      <div class="footer-container">
        <!-- Üst kısım: Sol logo/açıklama + Sağ adres kutuları -->
        <div class="flex flex-col lg:flex-row items-start justify-between gap-8 pb-10 border-b border-white/10">
          <!-- Sol: Logo & Açıklama -->
          <div class="flex-1 max-w-xl">
            <div class="mb-4">
              <NuxtImg
                v-if="logoUrl"
                :src="logoUrl"
                :alt="storeName"
                class="h-10 md:h-12 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
              <span v-else class="text-2xl md:text-3xl font-light text-white italic tracking-wide">
                {{ storeName }}
              </span>
            </div>
            <p class="text-sm leading-relaxed text-white/60">
              {{ t('customFooter.description') }}
            </p>
          </div>

          <!-- Sağ: Adres Kutuları -->
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Lager -->
            <div class="flex items-start gap-3 px-5 py-4 rounded-lg border border-white/15 bg-white/5 min-w-[220px]">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21V8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21M3.75 21h1.5m0 0h1.5m-1.5 0v-3.675c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <div>
                <span class="text-xs font-bold text-white uppercase tracking-wider">Lager</span>
                <p class="text-xs text-white/60 mt-1 leading-relaxed">
                  {{ t('customFooter.lagerAddress') }}
                </p>
              </div>
            </div>

            <!-- Büro -->
            <div class="flex items-start gap-3 px-5 py-4 rounded-lg border border-white/15 bg-white/5 min-w-[220px]">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <div>
                <span class="text-xs font-bold text-white uppercase tracking-wider">Büro</span>
                <p class="text-xs text-white/60 mt-1 leading-relaxed">
                  {{ t('customFooter.bueroAddress') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ===================== ORTA BÖLÜM: Kategoriler + Brands + Legal ===================== -->
        <div class="footer-mid-grid gap-x-6 gap-y-8 py-10 border-b border-white/10">
          <!-- Kategori kolonları (dinamik, her kolon max 7 link) -->
          <div v-for="(chunk, ci) in categoryChunks" :key="ci">
            <h4 class="footer-col-title">
              <template v-if="ci === 0">{{ t('customFooter.categoriesTitle') }}</template>
              <template v-else>&nbsp;</template>
            </h4>
            <ul class="footer-col-links">
              <li v-for="cat in chunk" :key="cat.id">
                <SfLink
                  :tag="NuxtLink"
                  variant="secondary"
                  class="footer-link"
                  :to="localePath(generateCategoryLink(cat))"
                >
                  {{ categoryTreeGetters.getName(cat) }}
                </SfLink>
              </li>
            </ul>
          </div>

          <!-- Brands -->
          <div>
            <h4 class="footer-col-title">{{ t('customFooter.brandsTitle') }}</h4>
            <ul class="footer-col-links">
              <li v-for="brand in brands" :key="brand">
                <span class="text-[13px] text-white/55 hover:text-white transition-colors cursor-pointer">{{ brand }}</span>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="footer-col-title">Legal</h4>
            <ul class="footer-col-links">
              <li v-for="link in legalLinks" :key="link.key">
                <SfLink
                  :tag="NuxtLink"
                  variant="secondary"
                  class="footer-link"
                  :to="localePath(link.path)"
                >
                  {{ t(link.key) }}
                </SfLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- ===================== ALT BÖLÜM: Sosyal Medya ===================== -->
        <div class="flex items-center justify-between pt-10 pb-8">
          <div>
            <h4 class="footer-col-title">{{ t('customFooter.followUs') }}</h4>
            <p class="text-[13px] text-white/55 mb-4">{{ t('customFooter.followUsSubtitle') }}</p>
            <div class="flex items-center gap-2.5">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                :aria-label="social.name"
              >
                <component :is="social.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== COPYRIGHT BAR ===================== -->
    <div class="footer-copyright">
      <div class="footer-container">
        <div class="flex flex-col md:flex-row items-center justify-between gap-3 py-4">
          <p class="text-xs text-white/40">
            {{ resolvedContent.footnote }}
          </p>
          <div class="flex items-center gap-4">
            <span v-for="payment in paymentMethods" :key="payment" class="text-xs text-white/40">
              {{ payment }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfLink } from '@storefront-ui/vue';
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import type { FooterProps, FooterSettings, FooterSettingsColumn } from './types';

const props = defineProps<FooterProps>();
const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
const { getFooterSettings, footerCache } = useFooter();
const resolvedContent = ref<FooterSettings | null>(null);
const newsletterEmail = ref('');
const runtimeConfig = useRuntimeConfig();
const storeName = runtimeConfig.public.storename || 'Nordic Schiller';
const { getSetting: getHeaderLogo } = useSiteSettings('headerLogo');
const logoUrl = computed(() => getHeaderLogo() || '');
const { data: categoryTree, getCategoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();

onMounted(async () => {
  if (categoryTree.value.length === 0) await getCategoryTree();
});

const allCategories = computed(() => {
  const tree = categoryTreeGetters.getTree(categoryTree.value);
  const items: CategoryTreeItem[] = [];
  const collect = (nodes: CategoryTreeItem[]) => {
    for (const node of nodes) {
      if (node.type === 'item') {
        items.push(node);
        if (node.children?.length) collect(node.children);
      }
    }
  };
  collect(tree);
  return items;
});

const categoryChunks = computed(() => {
  const cats = allCategories.value;
  const chunks: CategoryTreeItem[][] = [];
  const maxColumns = 5;
  for (let i = 0; i < cats.length && chunks.length < maxColumns; i += 7) {
    chunks.push(cats.slice(i, i + 7));
  }
  return chunks;
});

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTreeGetters.getTree(categoryTree.value));
};

let stopWatch: (() => void) | null = null;

onMounted(() => {
  stopWatch = watch(
    [() => props.content, footerCache],
    () => {
      const content = props.content ?? getFooterSettings();
      resolvedContent.value = mapFooterData(content);
    },
    { immediate: true, deep: true },
  );
});

onBeforeUnmount(() => {
  stopWatch?.();
});

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    newsletterEmail.value = '';
  }
};

const getColumnSwitches = (column: FooterSettingsColumn) => {
  return FOOTER_SWITCH_DEFINITIONS.filter((switchConfig) => column[switchConfig.key] === true).map((switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: t(switchConfig.shopTranslationKey),
    link: switchConfig.link,
    state: true,
  }));
};

// Sabit marka listesi (gorseldeki gibi)
const brands = [
  'Schäfer Home',
  'Cralex',
  'Latt Home',
  'Pasabahce',
  'Wilmax England',
  'LAV Glaswaren',
  'Michelino',
];

// Legal linkleri
const legalLinks = [
  { key: 'legal.termsAndConditions', path: paths.termsAndConditions },
  { key: 'legal.cancellationRights', path: paths.cancellationRights },
  { key: 'legal.cancellationForm', path: paths.cancellationForm },
  { key: 'legal.legalDisclosure', path: paths.legalDisclosure },
  { key: 'legal.privacyPolicy', path: paths.privacyPolicy },
  { key: 'legal.declarationOfAccessibility', path: paths.declarationOfAccessibility },
];


// Sosyal medya ikonlari (inline SVG componentleri)
const FacebookIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z' }),
  ]),
});

const InstagramIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z' }),
  ]),
});

const PinterestIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41.86 0 1.26.63 1.26 1.44 0 .86-.57 2.16-.86 3.38-.24 1.05.52 1.9 1.53 1.9 1.82 0 3.28-1.9 3.28-4.7 0-2.44-1.77-4.15-4.29-4.15-2.92 0-4.63 2.16-4.63 4.43 0 .86.34 1.82.77 2.34.09.09.09.19.05.34l-.29 1.15c-.05.19-.14.24-.34.14-1.29-.57-2.06-2.44-2.06-3.94 0-3.19 2.34-6.14 6.72-6.14 3.52 0 6.28 2.5 6.28 5.89 0 3.52-2.21 6.34-5.27 6.34-1.01 0-2.01-.52-2.35-1.15l-.63 2.44c-.24.86-.86 1.96-1.26 2.63Z' }),
  ]),
});

const YoutubeIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z' }),
  ]),
});

const socialLinks = [
  { name: 'Facebook', url: '#', icon: FacebookIcon },
  { name: 'Instagram', url: '#', icon: InstagramIcon },
  { name: 'Pinterest', url: '#', icon: PinterestIcon },
  { name: 'YouTube', url: '#', icon: YoutubeIcon },
];

const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'Sofort'];
</script>

<style scoped>
.footer-mid-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .footer-mid-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .footer-mid-grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}

.footer-main {
  background-color: #384d37;
  color: #ffffff;
  margin-top: -3rem;
}

.footer-copyright {
  background-color: #2c3e2b;
}

.footer-container {
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .footer-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .footer-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.footer-main .footer-container {
  padding-top: 3rem;
}

.footer-col-title {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.footer-col-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.55) !important;
  text-decoration: none !important;
  transition: color 0.15s ease;
}

.footer-link:hover {
  color: rgba(255, 255, 255, 0.9) !important;
}

:deep(.footer-custom-html a) {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
}

:deep(.footer-custom-html a:hover) {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.footer-custom-html li) {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
</style>
