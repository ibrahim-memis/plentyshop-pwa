<template>
  <div
    class="group/card bg-white rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md"
    data-testid="product-card"
    :class="{ 'border border-neutral-100': configuration?.cardBorders }"
  >
    <!-- Gorsel alani -->
    <div class="relative overflow-hidden bg-white">
      <UiBadges
        :use-tags="useTagsOnCategoryPage"
        :class="['absolute z-[1]', isFromWishlist ? 'mx-2' : 'm-2']"
        :product="product"
        :use-availability="isFromWishlist"
      />

      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="[{ 'size-48': isFromSlider }, 'relative group/image flex items-center justify-center']"
        as="image"
        data-testid="product-card-link"
      >
        <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          :title="imageTitle ? imageTitle : null"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          :class="[
            'object-contain aspect-square w-full transition-all duration-300 group-hover/card:scale-105',
            effectiveHoverImageUrl ? 'group-hover/image:opacity-0' : '',
          ]"
          data-testid="image-slot"
        />
        <NuxtImg
          v-if="effectiveHoverImageUrl"
          :src="effectiveHoverImageUrl"
          :alt="imageAlt"
          :title="imageTitle ? imageTitle : null"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          fetchpriority="auto"
          :preload="false"
          :width="getWidth()"
          :height="getHeight()"
          class="absolute inset-0 opacity-0 transition-all duration-300 group-hover/image:opacity-100 group-hover/card:scale-105 object-contain w-full h-full"
          data-testid="hover-image-slot"
        />
      </SfLink>

      <template v-if="configuration?.showWishlistButton">
        <slot name="wishlistButton">
          <WishlistButton
            square
            class="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm ring-1 ring-inset ring-neutral-200 !rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
            :product="product"
          />
        </slot>
      </template>
    </div>

    <!-- Bilgi alani -->
    <div
      class="p-3 md:p-4 flex flex-col flex-auto"
      :class="{
        'items-center text-center': configuration?.contentAlignment === 'center',
        'items-end text-right': configuration?.contentAlignment === 'right',
        'items-start': configuration?.contentAlignment === 'left',
      }"
    >
      <template v-for="key in configuration?.fieldsOrder" :key="key">
        <!-- Uretici -->
        <template v-if="key === 'manufacturer' && configuration?.fields?.manufacturer">
          <span
            v-if="manufacturer"
            class="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1"
            data-testid="productcard-manufacturer"
          >
            {{ manufacturer.externalName }}
          </span>
        </template>

        <!-- Baslik -->
        <template v-if="key === 'title' && configuration?.fields?.title">
          <SfLink
            :tag="NuxtLink"
            :to="productPath"
            class="no-underline text-sm font-medium text-neutral-800 hover:text-neutral-900 leading-snug line-clamp-2 mb-1.5 transition-colors"
            variant="secondary"
            data-testid="productcard-name"
          >
            {{ name }}
          </SfLink>
        </template>

        <!-- Yildiz rating -->
        <template v-if="key === 'rating' && configuration?.fields?.rating">
          <div class="flex items-center gap-1 mb-2">
            <SfRating size="xs" :half-increment="true" :value="rating ?? 0" :max="5" />
            <span class="text-xs text-neutral-400">({{ ratingCount }})</span>
          </div>
        </template>

        <!-- On izleme metni -->
        <template v-if="key === 'previewText' && configuration?.fields?.previewText">
          <div
            v-if="shortDescription"
            class="text-xs text-neutral-500 leading-relaxed mb-2"
          >
            <div class="line-clamp-2" v-html="shortDescription" />
          </div>
        </template>

        <!-- Fiyat -->
        <template v-if="key === 'price' && configuration?.fields?.price">
          <template v-if="isAuthorized">
            <LowestPrice :product="product" />
            <div v-if="showBasePrice" class="mb-1">
              <BasePriceInLine :base-price="basePrice" :unit-content="unitContent" :unit-name="unitName" />
            </div>
            <div class="flex items-center gap-2 mt-auto pt-1">
              <span class="text-base font-bold text-neutral-900" data-testid="product-card-vertical-price">
                <span v-if="showFromText" class="text-xs font-normal text-neutral-500 mr-1">{{ t('account.ordersAndReturns.orderDetails.priceFrom') }}</span>
                {{ format(price) }}
                <span class="text-[10px] font-normal text-neutral-400">{{ t('common.labels.asterisk') }}</span>
              </span>
              <span
                v-if="crossedPrice && differentPrices(price, crossedPrice)"
                class="text-sm text-neutral-400 line-through"
              >
                {{ format(crossedPrice) }}
              </span>
            </div>
          </template>
          <div v-else class="mt-auto pt-1">
            <NuxtLink
              :to="localePath(paths.authLogin)"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-[#384d37] hover:text-[#2c3e2b] transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              {{ t('product.loginToSeePrice') }}
            </NuxtLink>
          </div>
        </template>

        <!-- Urunu Incele -->
        <template v-if="key === 'addToCart' && configuration?.fields?.addToCart">
          <div class="mt-3 w-full">
            <NuxtLink
              :to="productPath"
              class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              <span>{{ t('product.viewProduct') }}</span>
            </NuxtLink>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfLink, SfIconShoppingCart, SfLoaderCircular, SfRating } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';
import type { ItemGridContent } from '~/components/blocks/ItemGrid/types';
import type { BasketItemOrderParamsProperty, Product, DoAddItemParams } from '@plentymarkets/shop-api';

const props = withDefaults(defineProps<ProductCardProps>(), {
  configuration: () => ({
    cardBorders: true,
    contentAlignment: 'left',
    fields: {
      title: true,
      rating: true,
      previewText: false,
      price: true,
      addToCart: true,
      manufacturer: false,
    },
    fieldsOrder: ['manufacturer', 'title', 'rating', 'previewText', 'price', 'addToCart'],
    showWishlistButton: false,
    showSecondImageOnHover: false,
    addToCartStyle: 'primary',
    itemsPerRowDesktop: 4,
    itemsPerRowTablet: 3,
    itemsPerRowMobile: 1,
    showItemCount: true,
    itemCountPosition: 'center',
    fieldsDisabled: [],
    paginationPosition: 'bottom',
    layout: {
      fullWidth: false,
    },
  }),
});

const product = computed(() => props.product);
const configuration = computed(() => props.configuration || ({} as ItemGridContent));

const { addModernImageExtension } = useModernImage();
const localePath = useLocalePath();
const { isAuthorized } = useCustomer();
const { format } = usePriceFormatter();
const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product.value);
const { send } = useNotification();
const loading = ref(false);
const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;
const name = computed(
  () => productGetters.getName(product.value) + productGetters.getGroupedAttributesString(product.value),
);
const manufacturer = computed(() => productGetters.getManufacturer(product.value));
const ratingCount = computed(() => productGetters.getTotalReviews(product.value));
const rating = computed(() => productGetters.getAverageRating(product.value, 'half'));
const shortDescription = computed(() => productGetters.getShortDescription(product.value) || '');
const autoOrderParams = computed(() => {
  return productGetters.hasOrderPropertiesRequiredAndPreselected(product.value)
    ? buildAutoBasketItemOrderParams(product.value)
    : undefined;
});
const canAddFromCategory = computed(
  () =>
    productGetters.canBeAddedToCartFromCategoryPage(product.value) ||
    productGetters.hasOrderPropertiesRequiredAndPreselected(product.value),
);
const showFromText = computed(() => productGetters.showFromText(product.value));

const cover = computed(() => productGetters.getCoverImage(product.value));
const secondCover = computed(() => productGetters.getSecondCoverImage(product.value));
const firstImage = computed(() => productImageGetters.getFirstImage(product.value));

const imageUrl = computed(() => addModernImageExtension(cover.value));
const effectiveHoverImageUrl = computed(() => {
  if (!configuration.value?.showSecondImageOnHover) return '';
  const src = addModernImageExtension(secondCover.value);
  return src || '';
});

const imageAlt = computed(() => productImageGetters.getImageAlternate(firstImage.value) || name.value || '');
const imageTitle = computed(() => productImageGetters.getImageName(firstImage.value) || '');

const imageWidth = computed(() => productGetters.getImageWidth(product.value) || 600);
const imageHeight = computed(() => productGetters.getImageHeight(product.value) || 600);

const basePrice = computed(() => productGetters.getDefaultBasePrice(product.value));
const unitContent = computed(() => productGetters.getUnitContent(product.value));
const unitName = computed(() => productGetters.getUnitName(product.value));
const showBasePrice = computed(() => productGetters.showPricePerUnit(product.value));

const variationId = computed(() => productGetters.getVariationId(product.value));
const { isGlobalProductCategoryTemplate } = useProducts();
const productPath = computed(() => {
  if (isGlobalProductCategoryTemplate?.value) {
    return paths.globalItemDetails;
  }
  const rawUrlPath = productGetters.getUrlPath(product.value);
  const basePath = `/${rawUrlPath}_${productGetters.getItemId(product.value)}`;
  const shouldAppendVariation = productGetters.shouldAppendVariationToLink(product.value);
  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const priority = ref((props.index || 0) < 5);
const lazy = ref(props.lazy || false);
const isFromWishlist = ref(props.isFromWishlist || false);
const isFromSlider = ref(props.isFromSlider || false);

const getWidth = () => {
  if (imageWidth.value && imageWidth.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth.value;
  }
  return '';
};

const getHeight = () => {
  if (imageHeight.value && imageHeight.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight.value;
  }
  return '';
};

const buildAutoBasketItemOrderParams = (product: Product): BasketItemOrderParamsProperty[] | undefined =>
  product.properties
    ?.filter((p) => p?.property?.isOderProperty && p.property.isRequired)
    .map((p) => {
      const pr = p.property;

      return {
        property: {
          id: p.propertyId ?? pr.id,
          names: { name: pr.names?.name ?? '' },
          valueType: pr.valueType,
          value: '1',
        },
      };
    }) || undefined;

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;
  try {
    const isRequiredAndPreselected = productGetters.hasOrderPropertiesRequiredAndPreselected(product.value);
    const params = isRequiredAndPreselected ? autoOrderParams.value : undefined;

    if (isRequiredAndPreselected && !params) {
      await navigateTo(productPath.value);
      return;
    }

    const addToCartObject: DoAddItemParams = {
      productId,
      quantity: 1,
      ...(params ? { basketItemOrderParams: params } : {}),
    };

    await addToCart(addToCartObject);

    if (quickCheckout) openQuickCheckout(product.value, 1);
    else send({ message: t('cart.itemAdded'), type: 'positive' });
  } finally {
    loading.value = false;
  }
};
const differentPrices = (price: number, crossedPrice: number) => {
  return crossedPrice ? Math.round(price * 100) / 100 !== Math.round(crossedPrice * 100) / 100 : false;
};

const NuxtLink = resolveComponent('NuxtLink');
</script>
