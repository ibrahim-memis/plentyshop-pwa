<template>
  <NarrowContainer class="mt-5 pt-3 pb-1">
    <nav class="text-sm text-neutral-500 mb-4">
      <NuxtLink :to="localePath(paths.home)" class="hover:text-[#384d37] transition-colors">{{ t('sidebar.home') }}</NuxtLink>
      <span class="mx-2 text-neutral-300">&rarr;</span>
      <span class="text-neutral-800 font-medium">{{ t('legal.privacyPolicy') }}</span>
    </nav>
  </NarrowContainer>
  <NarrowContainer class="pb-12 mb-[15px]">
    <div class="rounded-xl border border-neutral-200/60 bg-white p-6 md:p-10 overflow-x-auto no-preflight" v-html="getHTMLTexts()" />
  </NarrowContainer>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
const { t } = useI18n();
const localePath = useLocalePath();
const { data, getLegalTexts } = useLegalInformation();
const { getRobots, setRobotForStaticPage } = useRobots();
const { setPageMeta } = usePageMeta();

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  pageType: 'static',
});

const icon = 'page';
setPageMeta(t('CookieBar.keys.PrivacyPolicy'), icon);

await getLegalTexts({
  type: 'PrivacyPolicy',
});

const getHTMLTexts = () => {
  return data.value.htmlText ?? '';
};

await getRobots();
setRobotForStaticPage('PrivacyPolicy');
</script>
