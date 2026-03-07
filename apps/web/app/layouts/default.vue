<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs?.length" class="mt-5 pt-3 pb-1">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>
    <main>
      <slot />
    </main>
    <UiNavbarBottom v-if="viewport.isLessThan('lg')" />
    <Cookiebar />
    <PreviewMode />
    <ClientOnly>
      <FooterBlock v-if="!route.meta.isBlockified" />
    </ClientOnly>
    <QuickCheckout />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';
import FooterBlock from '~/components/blocks/Footer/Footer.vue';

defineProps<DefaultLayoutProps>();

const { setLogoMeta } = useStructuredData();
const { isOpen } = useQuickCheckout();
const viewport = useViewport();
const route = useRoute();

setLogoMeta();
</script>
