<template>
  <section class="grid-in-left-top md:h-full xl:max-h-[700px]">
    <Gallery
      v-if="galleryImages.length"
      :images="galleryImages"
      :configuration="content"
    />
  </section>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ImageGalleryProps } from '~/components/blocks/ImageGallery/types';

const { addModernImageExtensionForGallery } = useModernImage();

defineProps<ImageGalleryProps>();
const { currentProduct } = useProducts();

const galleryImages = computed(() => {
  if (!currentProduct.value?.item) return [];
  return addModernImageExtensionForGallery(productGetters.getGallery(currentProduct.value));
});
</script>
