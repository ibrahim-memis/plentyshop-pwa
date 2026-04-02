<template>
  <form
    class="md:rounded-lg"
    :class="{ 'md:border md:border-neutral-100': configuration?.borders }"
    :style="inlineStyle"
    data-testid="purchase-card"
    @submit.prevent="handleAddToCart()"
  >
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="px-4 pt-0 pb-3" :style="{ marginTop: configuration?.borders ? '0px' : '-30px' }">
          <div v-if="configuration?.fields.itemName && (manufacturerLogo || manufacturerName || storeName)" class="mb-[20px] mt-[20px] md:mt-[15px]">
            <NuxtImg
              v-if="manufacturerLogo"
              :src="manufacturerLogo"
              :alt="manufacturerName || storeName"
              class="h-6 md:h-8 w-auto object-contain"
              loading="lazy"
            />
            <span v-else class="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {{ manufacturerName || storeName }}
            </span>
          </div>

          <template v-for="key in configuration?.fieldsOrder" :key="key">
            <template v-if="key === 'itemName' && configuration?.fields.itemName">
              <h1 class="font-bold text-2xl md:text-[2rem] leading-tight text-neutral-900 break-word mb-1" data-testid="product-name">
                {{ productGetters.getName(product) }}
              </h1>
              <p v-if="variationNumber" class="text-xs text-neutral-400 mb-2">
                SKU: {{ variationNumber }}
              </p>

              <div v-if="configuration?.fields.starRating" class="inline-flex items-center mb-4">
                <SfRating
                  size="xs"
                  :half-increment="true"
                  :value="reviewGetters.getAverageRating(reviewAverage, 'half')"
                  :max="5"
                />
                <SfCounter class="ml-1" size="xs">{{ reviewGetters.getTotalReviews(reviewAverage) }}</SfCounter>
                <UiButton
                  variant="tertiary"
                  class="ml-2 text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors"
                  data-testid="show-reviews"
                  @click="scrollToReviews"
                >
                  {{ t('product.showAllReviews') }}
                </UiButton>
              </div>

              <div v-if="graduatedList.length > 0" class="mb-5">
                <div class="rounded-lg border border-neutral-100 overflow-hidden">
                  <div class="flex items-center justify-between px-4 py-2.5 bg-neutral-50/80">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                      </svg>
                      <span class="text-xs font-semibold text-neutral-800">{{ t('volumeDiscount.title') }}</span>
                    </div>
                    <span class="text-[10px] text-neutral-400">{{ t('volumeDiscount.subtitle') }}</span>
                  </div>
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-t border-neutral-100 bg-neutral-50/40">
                        <th class="px-4 py-2 text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">{{ t('volumeDiscount.quantity') }}</th>
                        <th class="px-4 py-2 text-right text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">{{ t('product.graduatedPrices.price') }}</th>
                        <th class="px-4 py-2 text-right text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">{{ t('volumeDiscount.discount') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(tier, index) in graduatedList"
                        :key="index"
                        class="border-t border-neutral-100 transition-colors hover:bg-neutral-50/50"
                        :class="{ 'bg-primary-50/30': tier.price === selectedGraduatedPrice?.price?.value }"
                      >
                        <td class="px-4 py-2 text-neutral-600">
                          <span class="font-semibold text-neutral-800">{{ tier.quantity }}+</span>
                          <span class="ml-1">{{ t('volumeDiscount.pieces') }}</span>
                        </td>
                        <td class="px-4 py-2 text-right font-medium text-neutral-800">
                          {{ format(tier.price) }}
                        </td>
                        <td class="px-4 py-2 text-right">
                          <span
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold"
                            :class="tier.price === selectedGraduatedPrice?.price?.value ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-700'"
                          >
                            -{{ tier.discount }}%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>

            <template v-if="key === 'previewText' && configuration?.fields.previewText">
              <div
                v-if="productGetters.getShortDescription(product).length > 0"
                class="mb-5 text-sm text-neutral-600 leading-relaxed whitespace-pre-line break-words product-bullet-list"
                data-testid="product-description"
                v-html="productGetters.getShortDescription(product)"
              />
            </template>

            <template v-if="key === 'price' && configuration?.fields.price">
              <template v-if="isAuthorized">
                <div class="mb-1" style="margin-top: -5px">
                  <Price :price="priceWithProperties" :crossed-price="crossedPrice" :show-net-badge="showNetPrices" />
                  <div
                    v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0 && showBundleComponents"
                    class="mt-1"
                  >
                    <UiTag :size="'sm'" :variant="'secondary'">{{
                      t('product.bundleSavings', { percent: productBundleGetters.getBundleDiscount(product) })
                    }}</UiTag>
                  </div>
                </div>
                <div class="text-xs text-neutral-500 mt-[10px] mb-[15px]">
                  <span class="font-medium">{{ showNetPrices ? t('product.allPricesExclVAT') : t('product.priceInclVAT') }}</span>
                  <span class="mx-1">&middot;</span>
                  <i18n-t keypath="shipping.excludedLabel" scope="global">
                    <template #shipping>
                      <SfLink
                        :href="localePath(paths.shipping)"
                        target="_blank"
                        class="text-neutral-500 underline hover:text-neutral-700 transition-colors"
                      >
                        {{ t('common.labels.delivery') }}
                      </SfLink>
                    </template>
                  </i18n-t>
                </div>
                <LowestPrice :product="product" />
                <BasePrice
                  v-if="productGetters.showPricePerUnit(product)"
                  :base-price="basePriceSingleValue"
                  :unit-content="productGetters.getUnitContent(product)"
                  :unit-name="productGetters.getUnitName(product)"
                />
              </template>
              <div v-else class="mt-[30px] mb-4">
                <button
                  type="button"
                  class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] font-medium text-neutral-500 hover:bg-neutral-100 hover:text-[#384d37] transition-all duration-150 cursor-pointer"
                  @click="handleLogin"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  {{ t('product.loginToSeePrice') }}
                </button>
              </div>
            </template>

            <template v-if="key === 'tags' && configuration?.fields.tags">
              <UiBadges class="mb-2" :product="product" :use-availability="false" :use-tags="true" />
            </template>

            <template v-if="key === 'availability' && configuration?.fields.availability && isAuthorized">
              <div class="mb-4">
                <div class="overflow-hidden border border-neutral-200 rounded-xl">
                  <div class="flex items-center justify-between px-4 py-3 bg-neutral-50">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :class="availabilityId <= 2 ? 'bg-[#384d37]/10' : availabilityId <= 4 ? 'bg-amber-100' : 'bg-red-100'">
                        <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="stockIndicatorDotClass" />
                      </div>
                      <span class="text-[12px] font-semibold text-neutral-800 truncate">
                        {{ productGetters.getAvailabilityName(product) || t('product.notAvailable') }}
                      </span>
                    </div>
                    <div v-if="realStock !== null" class="flex items-baseline gap-1">
                      <span class="text-xl font-bold tabular-nums" :class="realStock > 0 ? 'text-[#384d37]' : 'text-red-500'">{{ realStock }}</span>
                      <span class="text-[10px] font-semibold uppercase tracking-wider" :class="realStock > 0 ? 'text-[#384d37]/60' : 'text-red-400'">{{ t('product.stockInfo.pieces') }}</span>
                    </div>
                    <div v-else-if="stockLoading" class="w-14 h-7 bg-neutral-100 rounded-lg animate-pulse" />
                    <div v-else class="flex items-center gap-1.5">
                      <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full" :class="availabilityId <= 2 ? 'bg-[#384d37]/10 text-[#384d37]' : availabilityId <= 4 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'">
                        {{ stockLevelLabel }}
                      </span>
                    </div>
                  </div>

                  <div class="h-1 w-full bg-neutral-100">
                    <div
                      class="h-full transition-all duration-700 ease-out"
                      :class="availabilityId <= 2 ? 'bg-[#384d37]' : stockIndicatorBarClass"
                      :style="{ width: stockIndicatorBarWidth }"
                    />
                  </div>

                  <div class="flex items-center px-4 py-3 whitespace-nowrap bg-white border-t border-neutral-100">
                    <div class="flex-1 flex items-center justify-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                      <span class="text-[12px] text-neutral-400">{{ t('product.stockInfo.delivery') }}</span>
                      <span class="text-[12px] font-semibold text-neutral-700">{{ deliveryDaysText }}</span>
                    </div>
                    <span class="w-px h-4 bg-neutral-200 shrink-0" />
                    <div class="flex-1 flex items-center justify-center gap-1.5">
                      <svg class="w-3.5 h-3.5 shrink-0" :class="productGetters.isSalable(product) ? 'text-neutral-300' : 'text-red-300'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      <span class="text-[12px] text-neutral-400">Status</span>
                      <span class="text-[12px] font-semibold" :class="productGetters.isSalable(product) ? 'text-[#384d37]' : 'text-red-500'">
                        {{ productGetters.isSalable(product) ? t('product.stockInfo.orderable') : t('product.stockInfo.notOrderable') }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="key === 'starRating' && configuration?.fields.starRating">
              <!-- Rendered inline under itemName -->
            </template>

            <template v-if="key === 'variationProperties' && configuration?.fields.variationProperties">
              <div class="mb-5 variation-properties">
                <VariationProperties :product="product" />
              </div>
            </template>

            <template v-if="key === 'attributes' && configuration?.fields.attributes">
              <div class="mb-5">
                <ProductAttributes :product="product" />
              </div>
            </template>

            <template v-if="key === 'itemBundle'">
              <BundleOrderItems v-if="product.bundleComponents && showBundleComponents" :product="product" />
            </template>

            <template v-if="key === 'orderProperties' && configuration?.fields.orderProperties">
              <OrderProperties :product="product" />
            </template>

            <template v-if="key === 'graduatedPrices' && configuration?.fields.graduatedPrices">
              <!-- Rendered inline under itemName -->
            </template>

            <template v-if="key === 'addToWishlist' && configuration?.fields.addToWishlist">
              <!-- Rendered inline with quantityAndAddToCart -->
            </template>

            <template v-if="key === 'quantityAndAddToCart' && configuration?.fields.quantityAndAddToCart">
              <UnitContentSelect
                v-if="product && productGetters.possibleUnitCombination(product).length > 1"
                :product="product"
              />

              <template v-if="isAuthorized">
                <div
                  v-if="minimumOrderQuantity > 1"
                  class="flex items-center gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 mb-3"
                >
                  <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <span class="text-sm font-medium text-amber-800">
                    {{ t('product.minimumQuantity', { count: minimumOrderQuantity }) }}
                  </span>
                </div>

                <div class="mb-4">
                  <!-- Quantity selector -->
                  <div class="flex items-center gap-3 mb-3">
                    <label class="text-xs font-semibold text-neutral-400 uppercase tracking-wider shrink-0">
                      {{ t('product.quantity') }}
                    </label>
                    <div class="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white">
                      <button
                        type="button"
                        class="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-[#384d37] hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        :disabled="quantitySelectorValue <= minimumOrderQuantity"
                        @click="decrementQuantity"
                      >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" /></svg>
                      </button>
                      <input
                        type="number"
                        :value="quantitySelectorValue"
                        :min="minimumOrderQuantity"
                        class="w-12 h-10 text-center text-sm font-semibold text-neutral-900 border-x border-neutral-200 bg-neutral-50/50 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        @change="handleQuantityInput"
                      >
                      <button
                        type="button"
                        class="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-[#384d37] hover:bg-neutral-50 transition-colors"
                        @click="incrementQuantity"
                      >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      </button>
                    </div>
                  </div>

                  <div class="flex items-stretch gap-2">
                    <WishlistButton
                      v-if="configuration?.fields.addToWishlist"
                      variant="secondary"
                      :product="product"
                      :quantity="quantitySelectorValue"
                      square
                      class="!m-0 !rounded-xl !border !border-neutral-200 hover:!border-[#384d37]/30 !bg-white !text-neutral-500 hover:!text-[#384d37] !w-11 !h-11 shrink-0 transition-all duration-200"
                    />
                    <div v-if="showNotifyMe && !productGetters.isSalable(product)" class="flex-1">
                      <NotifyMe :variation-id="Number(productGetters.getVariationId(product))" />
                    </div>
                    <SfTooltip
                      v-else
                      show-arrow
                      placement="top"
                      :label="isNotValidVariation || isSalableText"
                      class="flex-1"
                    >
                      <UiButton
                        type="submit"
                        data-testid="add-to-cart"
                        size="lg"
                        class="w-full !h-11 !rounded-xl !bg-[#384d37] hover:!bg-[#2c3e2b] active:!bg-[#243524] !text-white !font-semibold !text-sm transition-colors duration-200"
                        :disabled="loading || !productGetters.isSalable(product)"
                      >
                        <template #prefix>
                          <div v-if="!loading" class="flex items-center gap-2">
                            <SfIconShoppingCart size="sm" />
                            {{ t('common.actions.addToCart') }}
                          </div>
                          <div v-else>
                            <SfLoaderCircular size="sm" />
                          </div>
                        </template>
                      </UiButton>
                    </SfTooltip>
                  </div>

                  <template v-if="showPayPalButtons">
                    <PayPalExpressButton
                      type="SingleItem"
                      location="itemPage"
                      class="mt-3"
                      @validation-callback="paypalHandleAddToCart"
                    />
                    <PayPalPayLaterBanner
                      placement="product"
                      location="itemPage"
                      :amount="priceWithProperties * quantitySelectorValue"
                    />
                  </template>
                </div>
              </template>
              <div v-else class="mb-4">
                <div class="border border-neutral-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    class="w-full flex items-center justify-center gap-2.5 py-3 bg-[#384d37] text-white font-semibold text-sm hover:bg-[#2c3e2b] active:bg-[#243524] transition-colors duration-200 cursor-pointer"
                    @click="handleLogin"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                    {{ t('product.loginToPurchase') }}
                  </button>
                  <button
                    type="button"
                    class="w-full flex items-center justify-center gap-2 py-3 border-t border-neutral-100 bg-white text-neutral-600 font-medium text-[13px] hover:bg-neutral-50 hover:text-[#384d37] transition-all duration-200 cursor-pointer"
                    data-testid="request-quote"
                    @click="handleRequestQuote"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                    {{ t('product.requestQuote') }}
                  </button>
                </div>
                <p class="text-[10px] text-neutral-400 text-center mt-2">
                  {{ t('product.loginRequiredDesc') }}
                </p>
              </div>
            </template>

            <template v-if="key === 'requestQuote' && configuration?.fields.requestQuote && isAuthorized">
              <div class="mb-4">
                <button
                  type="button"
                  class="w-full flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-600 font-medium text-[13px] hover:bg-neutral-50 hover:text-[#384d37] hover:border-neutral-300 transition-all duration-200 cursor-pointer"
                  data-testid="request-quote"
                  @click="handleRequestQuote"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                  {{ t('product.requestQuote') }}
                </button>
                <p class="text-[11px] text-neutral-400 text-center mt-2">
                  {{ t('product.requestQuoteDesc') }}
                </p>
              </div>
            </template>

            <template v-if="key === 'itemText' && configuration?.fields.itemText">
              <div
                v-if="productGetters.getDescription(product)"
                class="mb-4 font-normal text-sm text-neutral-600 leading-relaxed whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getDescription(product)"
              />
            </template>

            <template v-if="key === 'technicalData' && configuration?.fields.technicalData">
              <div
                v-if="productGetters.getTechnicalData(product)"
                class="mb-4 font-normal text-sm text-neutral-600 leading-relaxed whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getTechnicalData(product)"
              />
            </template>
          </template>
        </section>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters, manufacturerGetters } from '@plentymarkets/shop-api';
import { SfCounter, SfRating, SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '#paypal/types';
import { paths } from '~/utils/paths';

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      tags: true,
      availability: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: true,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      requestQuote: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'itemName',
      'starRating',
      'previewText',
      'price',
      'availability',
      'variationProperties',
      'orderProperties',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'addToWishlist',
      'quantityAndAddToCart',
      'requestQuote',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: true,
    borders: true,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      fullWidth: false,
    },
  }),
});

const { currentProduct } = useProducts();

const { data: productReviews } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));
const reviewAverage = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { isAuthorized } = useCustomer();
const { openLoginModal } = useLoginModal();
const viewport = useViewport();
const localePath = useLocalePath();
const router = useRouter();

const handleLogin = () => {
  if (viewport.isGreaterOrEquals('md')) {
    openLoginModal();
  } else {
    router.push(localePath(paths.authLogin));
  }
};

const { showNetPrices } = useCart();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const minimumOrderQuantity = computed(() => productGetters.getMinimumOrderQuantity(props?.product));
const quantitySelectorValue = ref(minimumOrderQuantity.value);
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(props?.product)));
const { getSetting: getNotifyMeSetting } = useSiteSettings('showNotifyMe');
const showNotifyMe = computed(() => getNotifyMeSetting().toString() === 'true');
const runtimeConfig = useRuntimeConfig();
const storeName = runtimeConfig.public.storename || '';
const manufacturer = computed(() => {
  if (!props?.product?.item) return null;
  return productGetters.getManufacturer(props.product);
});
const manufacturerName = computed(() => manufacturer.value?.externalName || '');
const manufacturerLogo = computed(() => {
  if (!manufacturer.value) return '';
  return manufacturerGetters.getManufacturerLogo(manufacturer.value) || '';
});
const variationNumber = computed(() => props.product?.variation?.number || '');

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('error.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('error.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('product.attributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(props?.product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('cart.itemAdded'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const handleRequestQuote = () => {
  navigateTo(localePath(paths.contact));
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const incrementQuantity = () => {
  quantitySelectorValue.value += 1;
};

const decrementQuantity = () => {
  if (quantitySelectorValue.value > minimumOrderQuantity.value) {
    quantitySelectorValue.value -= 1;
  }
};

const handleQuantityInput = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value);
  quantitySelectorValue.value = Math.max(minimumOrderQuantity.value, val || minimumOrderQuantity.value);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const availabilityId = computed(() => {
  if (!props?.product?.variation) return 5;
  return props.product.variation.availability?.id ?? 5;
});

const stockIndicatorDotClass = computed(() => {
  const id = availabilityId.value;
  if (id <= 2) return 'bg-green-500';
  if (id <= 4) return 'bg-yellow-500';
  return 'bg-red-500';
});

const stockIndicatorBarClass = computed(() => {
  const id = availabilityId.value;
  if (id <= 2) return 'bg-green-500';
  if (id <= 4) return 'bg-yellow-400';
  return 'bg-red-500';
});

const stockIndicatorBarWidth = computed(() => {
  const id = availabilityId.value;
  if (id <= 1) return '100%';
  if (id === 2) return '75%';
  if (id === 3) return '50%';
  if (id === 4) return '25%';
  return '8%';
});

const deliveryDaysText = computed(() => {
  if (!props?.product?.variation) return t('product.stockInfo.sameDay');
  const days = props.product.variation.availability?.averageDays;
  if (!days || days === 0) return t('product.stockInfo.sameDay');
  if (days === 1) return `1 ${t('product.stockInfo.day')}`;
  return `${days} ${t('product.stockInfo.days')}`;
});

const stockLevelLabel = computed(() => {
  const id = availabilityId.value;
  if (id <= 1) return t('product.stockInfo.high');
  if (id === 2) return t('product.stockInfo.medium');
  if (id === 3) return t('product.stockInfo.low');
  if (id === 4) return t('product.stockInfo.veryLow');
  return t('product.stockInfo.outOfStock');
});

const realStock = ref<number | null>(null);
const stockLoading = ref(false);

const fetchRealStock = async (varId: number) => {
  if (!varId) return;
  stockLoading.value = true;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const data = await $fetch<{ netStock: number | null; configured: boolean }>(`/api/stock/${varId}`, { signal: controller.signal });
    clearTimeout(timeout);
    realStock.value = data?.netStock ?? null;
  } catch {
    realStock.value = null;
  } finally {
    stockLoading.value = false;
  }
};

const currentVariationId = computed(() => props.product?.variation?.id);

if (import.meta.client) {
  watch(currentVariationId, (id) => { if (id) fetchRealStock(id); }, { immediate: true });
}

const { format } = usePriceFormatter();
const graduatedList = computed(() => {
  if (!props?.product?.item) return [];
  return productGetters.getGraduatedList(props.product);
});
const selectedGraduatedPrice = computed(() => {
  if (!props?.product?.item) return null;
  return productGetters.getGraduatedPriceByQuantity(props.product, quantitySelectorValue.value);
});

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('product.notAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('product.attributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.product-bullet-list :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0;
}

.product-bullet-list :deep(ul li) {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  color: #525252;
}

.product-bullet-list :deep(ul li::marker) {
  color: #525252;
  font-size: 0.75em;
}

.product-bullet-list :deep(p) {
  margin-bottom: 0.25rem;
}
</style>
