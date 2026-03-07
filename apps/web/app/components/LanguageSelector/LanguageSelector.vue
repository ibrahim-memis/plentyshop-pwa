<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition name="overlay-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
        @click="toggle()"
      />
    </Transition>

    <!-- Sağ Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-[1000] shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-100 shrink-0">
          <h2 class="text-base font-semibold text-neutral-900">{{ t('languageSidebar.title') }}</h2>
          <button
            type="button"
            class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            :aria-label="t('common.navigation.closeDialog')"
            @click="toggle()"
          >
            <SfIconClose class="text-neutral-400 !w-5 !h-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-5 py-5">
          <!-- Dil Seçimi -->
          <div class="mb-8">
            <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              {{ t('languageSidebar.language') }}
            </h3>
            <div class="space-y-1">
              <button
                v-for="locale in filteredLocaleCodes"
                :key="locale"
                type="button"
                class="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                :class="locale === currentLocale
                  ? 'bg-primary-50 border border-primary-200 text-primary-800'
                  : 'hover:bg-neutral-50 border border-transparent text-neutral-700 hover:text-neutral-900'"
                :data-testid="`languageOption-${locale}`"
                @click="handleSwitchLocale(locale)"
              >
                <span
                  class="w-8 h-6 rounded overflow-hidden inline-flex items-center shadow-sm border border-neutral-200 shrink-0"
                  v-html="flagList[locale]"
                />
                <span class="text-sm font-medium">{{ t(`lang.${locale}`) }}</span>
                <svg
                  v-if="locale === currentLocale"
                  class="ml-auto w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Para Birimi Seçimi -->
          <div>
            <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              {{ t('languageSidebar.currency') }}
            </h3>
            <div class="space-y-1">
              <button
                v-for="currency in availableCurrencies"
                :key="currency.code"
                type="button"
                class="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                :class="currency.code === activeCurrency
                  ? 'bg-primary-50 border border-primary-200 text-primary-800'
                  : 'hover:bg-neutral-50 border border-transparent text-neutral-700 hover:text-neutral-900'"
                @click="handleSwitchCurrency(currency.code)"
              >
                <span class="w-8 h-6 rounded bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0 border border-neutral-200">
                  {{ currency.symbol }}
                </span>
                <span class="text-sm font-medium">{{ currency.label }}</span>
                <span class="text-xs text-neutral-400 ml-1">{{ currency.code }}</span>
                <svg
                  v-if="currency.code === activeCurrency"
                  class="ml-auto w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { SfIconClose } from '@storefront-ui/vue';
import { flagImports } from './flags';
import type { Locale } from '#i18n';

const { isOpen, toggle, switchLocale, getAvailableLocales } = useLocalization();
const { locale: currentLocale } = useI18n();
const { getCategoryTree } = useCategoryTree();

const flagList: { [key: string]: string } = {};
const filteredLocaleCodes = ref(getAvailableLocales());

filteredLocaleCodes.value.forEach((localeCode) => {
  if (flagImports[localeCode]) flagList[localeCode] = flagImports[localeCode];
});

// Para birimi
const activeCurrency = ref('EUR');

const availableCurrencies = computed(() => [
  { code: 'EUR', symbol: '€', label: 'Euro' },
]);

const handleSwitchLocale = async (locale: string) => {
  await switchLocale(locale as Locale, true);
};

const handleSwitchCurrency = (code: string) => {
  activeCurrency.value = code;
  // Para birimi değişikliği API entegrasyonu buraya eklenebilir
};

watch(
  () => currentLocale.value,
  async () => {
    await getCategoryTree();
  },
);
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
