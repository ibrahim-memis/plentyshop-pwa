<template>
  <div data-testid="hero-slider-block" class="relative w-full overflow-hidden bg-[#384d37] max-w-[1536px] mx-auto -mt-[15px] md:mt-[15px] rounded-none md:rounded-[15px]" style="min-height: 520px">
    <div v-if="!slides.length" class="flex items-center justify-center h-[520px] md:h-[600px] lg:h-[680px]">
      <div class="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>

    <div
      v-else
      class="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
    >
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        class="relative w-full shrink-0 h-[520px] md:h-[600px] lg:h-[680px]"
      >
        <div class="absolute inset-0">
          <img
            v-if="slide.imageUrl"
            :src="slide.imageUrl"
            :alt="slide.name"
            class="w-full h-full object-cover"
            :loading="idx === 0 ? 'eager' : 'lazy'"
          >
          <div v-else class="w-full h-full" :style="{ background: gradients[idx % gradients.length] }" />
        </div>

        <div class="absolute inset-0 z-[1] bg-gradient-to-r from-[#384d37]/90 via-[#384d37]/50 to-transparent md:via-[#384d37]/25" />

        <div class="absolute inset-0 z-[2] flex items-end md:items-center pb-16 md:pb-0">
          <div class="w-full max-w-[1536px] mx-auto px-6 lg:px-8 pl-16 md:pl-20 lg:pl-24">
            <div class="max-w-md">
              <span class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-4 rounded-lg border border-white/30">
                {{ slide.badge || badges[idx % badges.length] || t('heroSlider.new') }}
              </span>

              <p v-if="slide.description" class="text-sm md:text-base text-white/90 leading-relaxed mb-3 max-w-md">
                {{ slide.description }}
              </p>

              <h2 v-if="slide.name" class="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-none tracking-tight mb-2">
                {{ slide.name }}
              </h2>

              <p v-if="slide.subtitle" class="text-lg md:text-xl text-white font-semibold mb-4">
                {{ slide.subtitle }}
              </p>

              <div class="flex flex-wrap items-center gap-4">
                <span v-if="slide.priceText" class="text-white">
                  <span class="text-sm font-normal">{{ t('heroSlider.fromPrice') }}</span>
                  <span class="text-xl font-bold ml-1">{{ slide.priceText }}</span>
                </span>
                <NuxtLink
                  v-if="slide.link"
                  :to="localePath(slide.link)"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#384d37] text-sm font-bold rounded-lg hover:bg-white/95 hover:shadow-lg transition-all duration-200 shadow-md"
                >
                  {{ t('heroSlider.discoverProducts') }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="slides.length > 1"
      type="button"
      class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-sm bg-white/90 text-neutral-800 flex items-center justify-center hover:bg-white transition-all duration-200 cursor-pointer z-10 shadow-md"
      aria-label="Previous slide"
      @click="prevSlide"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button
      v-if="slides.length > 1"
      type="button"
      class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-sm bg-white/90 text-neutral-800 flex items-center justify-center hover:bg-white transition-all duration-200 cursor-pointer z-10 shadow-md"
      aria-label="Next slide"
      @click="nextSlide"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <div v-if="slides.length > 1" class="absolute bottom-0 left-0 right-0 z-10">
      <div class="max-w-[1536px] mx-auto px-6 lg:px-8">
        <div class="flex gap-1 pb-4">
          <button
            v-for="(slide, idx) in slides"
            :key="'bar-' + slide.id"
            type="button"
            class="relative h-[3px] flex-1 rounded-full overflow-hidden cursor-pointer transition-all duration-300"
            :class="idx === activeIndex ? 'bg-white/30' : 'bg-white/15 hover:bg-white/25'"
            :aria-label="`Slide ${idx + 1}`"
            @click="goToSlide(idx)"
          >
            <div
              v-if="idx === activeIndex && isAutoplay"
              :key="'progress-' + activeIndex"
              class="absolute inset-y-0 left-0 bg-white rounded-full"
              :style="{ animation: `hero-bar-fill ${autoplayInterval}ms linear forwards` }"
            />
            <div
              v-else-if="idx < activeIndex"
              class="absolute inset-0 bg-white/60 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

interface StaticSlide {
  imageUrl: string;
  name?: string;
  subtitle?: string;
  description?: string;
  link?: string;
  priceText?: string;
  badge?: string;
}

interface HeroSliderProps {
  content?: {
    maxSlides?: number;
    autoplay?: boolean;
    autoplayInterval?: number;
    excludeNames?: string[];
    staticSlides?: StaticSlide[];
  };
  meta?: { uuid: string };
}

interface SlideItem {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  link: string;
  imageUrl: string;
  priceText?: string;
  badge?: string;
}

const props = defineProps<HeroSliderProps>();
const localePath = useLocalePath();
const { t } = useI18n();

const maxSlides = computed(() => props.content?.maxSlides ?? 5);
const isAutoplay = computed(() => props.content?.autoplay !== false);
const autoplayInterval = computed(() => props.content?.autoplayInterval ?? 6000);
const excludeNames = computed(() => (props.content?.excludeNames || []).map((n) => n.toLowerCase()));

const { data: categoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();
const activeIndex = ref(0);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

const gradients = [
  'linear-gradient(135deg, #384d37 0%, #2c3e2b 50%, #243824 100%)',
  'linear-gradient(135deg, #4a6349 0%, #384d37 100%)',
  'linear-gradient(135deg, #2c3e2b 0%, #1e2d1d 100%)',
  'linear-gradient(135deg, #3d5c3a 0%, #2a4028 100%)',
  'linear-gradient(135deg, #243824 0%, #1a2e1a 100%)',
];

const badges = computed(() => [
  t('heroSlider.newCollection'),
  t('heroSlider.topSeller'),
  t('heroSlider.exclusive'),
  t('heroSlider.discover'),
  t('heroSlider.newCollection'),
]);

const subtitles = computed(() => [
  t('heroSlider.discover'),
  t('heroSlider.topSeller'),
  t('heroSlider.exclusive'),
  t('heroSlider.newCollection'),
  t('heroSlider.discover'),
]);

const flattenCategoryItems = (items: CategoryTreeItem[]): CategoryTreeItem[] => {
  const result: CategoryTreeItem[] = [];
  const walk = (list: CategoryTreeItem[]) => {
    for (const item of list) {
      if (item.type === 'item') result.push(item);
      if (item.children?.length) walk(item.children);
    }
  };
  walk(items);
  return result;
};

const { buildDocumentUrl } = useBuildImageUrl();

const staticSlides = computed((): SlideItem[] => {
  return (props.content?.staticSlides || []).map((s, idx) => ({
    id: -(idx + 1),
    name: s.name || '',
    subtitle: s.subtitle || '',
    description: s.description || '',
    link: s.link || '',
    imageUrl: s.imageUrl,
    priceText: s.priceText,
    badge: s.badge,
  }));
});

const categorySlides = computed((): SlideItem[] => {
  if (!categoryTree.value?.length) return [];

  const flatItems = flattenCategoryItems(categoryTree.value);

  let filtered = flatItems.filter((cat: CategoryTreeItem) => {
    const name = (cat.details?.[0]?.name || '').toLowerCase();
    return !excludeNames.value.some((ex) => name.includes(ex));
  });

  if (!filtered.length) {
    filtered = flatItems.length ? flatItems : categoryTree.value.filter((c: CategoryTreeItem) => c.details?.[0]?.name) as CategoryTreeItem[];
  }

  const remaining = Math.max(0, maxSlides.value - staticSlides.value.length);

  return filtered
    .slice(0, remaining)
    .map((cat: CategoryTreeItem, idx: number) => {
      const detail = cat.details?.[0];
      const imgPath = detail?.imagePath || detail?.image2Path || '';
      const rawDesc = (detail as any)?.description ? stripHtml((detail as any).description) : '';
      return {
        id: cat.id,
        name: String(detail?.name || `Category ${cat.id}`),
        subtitle: subtitles.value[idx % subtitles.value.length] ?? '',
        description: rawDesc.length > 80 ? rawDesc.substring(0, 80) + '...' : rawDesc,
        link: buildCategoryMenuLink(cat, categoryTree.value) || '/',
        imageUrl: buildDocumentUrl(imgPath),
      };
    });
});

const onlyStatic = computed(() => !!(props.content as any)?.onlyStatic);
const slides = computed((): SlideItem[] => onlyStatic.value ? staticSlides.value : [...staticSlides.value, ...categorySlides.value]);

const stripHtml = (html: string) => {
  if (!import.meta.server) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  return html.replace(/<[^>]*>/g, '');
};

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length;
  resetAutoplay();
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length;
  resetAutoplay();
};

const goToSlide = (idx: number) => {
  activeIndex.value = idx;
  resetAutoplay();
};

const startAutoplay = () => {
  if (!isAutoplay.value || slides.value.length <= 1) return;
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.value.length;
  }, autoplayInterval.value);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

onMounted(() => {
  startAutoplay();

  watch(slides, (val) => {
    if (val.length > 0) {
      resetAutoplay();
    }
  });
});

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<style scoped>
@keyframes hero-bar-fill {
  from { width: 0; }
  to { width: 100%; }
}
</style>
