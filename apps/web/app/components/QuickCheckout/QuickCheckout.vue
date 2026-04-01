<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition name="overlay">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] cursor-pointer"
        data-testid="cart-sidebar-overlay"
        @click="close"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <aside
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[999] flex flex-col"
        data-testid="cart-sidebar"
        @mousemove="endTimer()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-200 shrink-0">
          <h2 class="font-bold text-lg text-neutral-900">
            {{ t('quickCheckout.cartPreview') }}
          </h2>
          <button
            class="p-2 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            :aria-label="t('quickCheckout.close')"
            data-testid="cart-sidebar-close"
            @click="close"
          >
            <SfIconClose class="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <!-- Bos sepet -->
        <div v-if="!cartItems || cartItems.length === 0" class="flex-1 flex flex-col items-center justify-center px-6">
          <div class="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
            <SfIconShoppingCart class="w-8 h-8 text-neutral-300" />
          </div>
          <p class="text-neutral-500 font-medium mb-6">{{ t('quickCheckout.emptyCart') }}</p>
          <UiButton
            variant="secondary"
            class="!rounded-lg"
            @click="close"
          >
            {{ t('quickCheckout.continueShopping') }}
          </UiButton>
        </div>

        <!-- Sepet icerigi -->
        <template v-else>
          <!-- Urun listesi (scrollable) -->
          <div class="flex-1 overflow-y-auto">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex gap-3 px-5 py-4 border-b border-neutral-100 last:border-b-0"
            >
              <!-- Urun resmi -->
              <NuxtLink
                :to="localePath('/' + cartGetters.getProductPath(item))"
                class="shrink-0"
                @click="close"
              >
                <NuxtImg
                  v-if="item.variation?.images?.all?.length"
                  :src="addModernImageExtension(getImageForViewport(item.variation, 'CartProductCard'))"
                  :alt="getItemImageAlt(item)"
                  width="80"
                  height="80"
                  loading="lazy"
                  class="w-[70px] h-[70px] object-cover rounded-md border border-neutral-200"
                />
                <div v-else class="w-[70px] h-[70px] rounded-md border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                  <SfIconShoppingCart class="w-5 h-5 text-neutral-300" />
                </div>
              </NuxtLink>

              <!-- Urun detay -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <NuxtLink
                      :to="localePath('/' + cartGetters.getProductPath(item))"
                      class="text-sm font-semibold text-neutral-900 hover:text-primary-700 transition-colors line-clamp-2 no-underline"
                      @click="close"
                    >
                      {{ cartGetters.getItemName(item) }}
                    </NuxtLink>
                    <p v-if="item.variation" class="text-xs text-neutral-400 mt-0.5">
                      SKU: {{ item.variationId }}
                    </p>
                    <div v-if="cartGetters.getItemAttributes(item).length" class="mt-1">
                      <span
                        v-for="attr in cartGetters.getItemAttributes(item)"
                        :key="attr.name"
                        class="text-xs text-neutral-500"
                      >
                        {{ attr.label }}: {{ attr.value }}
                      </span>
                    </div>
                  </div>
                  <!-- Sil -->
                  <button
                    class="p-1 rounded hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                    :aria-label="t('common.actions.removeItemFromBasket')"
                    @click="deleteItem(item)"
                  >
                    <SfIconDelete class="w-4 h-4 text-neutral-400 hover:text-red-500" />
                  </button>
                </div>

                <!-- Miktar + Fiyat -->
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center border border-neutral-200 rounded-md overflow-hidden">
                    <button
                      class="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                      :disabled="item.quantity <= 1"
                      @click="updateQuantity(item, item.quantity - 1)"
                    >
                      <span class="text-sm font-medium">−</span>
                    </button>
                    <span class="w-8 h-7 flex items-center justify-center text-sm font-medium text-neutral-900 border-x border-neutral-200">
                      {{ item.quantity }}
                    </span>
                    <button
                      class="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                      @click="updateQuantity(item, item.quantity + 1)"
                    >
                      <span class="text-sm font-medium">+</span>
                    </button>
                  </div>
                  <span class="text-sm font-bold text-neutral-900">
                    {{ format(cartGetters.getCartItemPrice(item) * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Alt kisim: Kupon + Ozet + Butonlar -->
          <div class="shrink-0 border-t border-neutral-200">
            <!-- Kupon girisi -->
            <div class="px-5 pt-4 pb-3">
              <div class="flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  :placeholder="t('quickCheckout.couponPlaceholder')"
                  class="flex-1 h-10 px-3 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                />
                <UiButton
                  size="sm"
                  class="!h-10 !rounded-lg !px-4 !bg-primary-800 hover:!bg-primary-700 !text-white !font-semibold !text-sm"
                  :disabled="!couponCode || couponLoading"
                  @click="handleAddCoupon"
                >
                  <SfLoaderCircular v-if="couponLoading" size="xs" />
                  <template v-else>{{ t('quickCheckout.redeemCoupon') }}</template>
                </UiButton>
              </div>
            </div>

            <!-- Ozet -->
            <div class="px-5 pb-3 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-neutral-600">{{ t('quickCheckout.cartValue') }}</span>
                <span class="font-medium text-neutral-900">{{ format(totals.subTotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-neutral-600">{{ t('quickCheckout.shippingCosts') }}</span>
                <span class="font-medium text-neutral-900">{{ getShippingDisplay }}</span>
              </div>
              <div class="flex justify-between text-base font-bold pt-2 border-t border-neutral-200">
                <span class="text-neutral-900">{{ t('quickCheckout.totalAmount') }}</span>
                <span class="text-neutral-900">{{ format(totals.total) }}</span>
              </div>
            </div>

            <!-- Aksiyon butonlari -->
            <div class="px-5 pb-4 space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <UiButton
                  variant="secondary"
                  size="lg"
                  class="!rounded-lg !font-semibold !text-sm !h-12"
                  data-testid="cart-sidebar-go-to-cart"
                  @click="goToPage(paths.cart)"
                >
                  <template #prefix>
                    <div class="flex items-center gap-1.5">
                      <SfIconShoppingCart size="sm" />
                      {{ t('quickCheckout.checkYourCart') }}
                    </div>
                  </template>
                </UiButton>
                <UiButton
                  size="lg"
                  class="!rounded-lg !bg-primary-800 hover:!bg-primary-700 !text-white !font-semibold !text-sm !h-12"
                  data-testid="cart-sidebar-go-to-checkout"
                  @click="goToCheckout()"
                >
                  <template #prefix>
                    <div class="flex items-center gap-1.5">
                      {{ t('common.actions.goToCheckout') }}
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </template>
                </UiButton>
              </div>

              <!-- PayPal -->
              <template v-if="isPaypalAvailable('quickCheckout').value">
                <PayPalExpressButton
                  class="w-full text-center"
                  location="quickCheckout"
                  type="CartPreview"
                  @on-approved="close"
                />
              </template>
            </div>
          </div>
        </template>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { SfIconClose, SfIconShoppingCart, SfIconDelete, SfLoaderCircular } from '@storefront-ui/vue';
import { cartGetters, productImageGetters } from '@plentymarkets/shop-api';
import type { CartItem } from '@plentymarkets/shop-api';
import { paths } from '~/utils/paths';

const { format } = usePriceFormatter();
const { showNetPrices } = useCart();
const localePath = useLocalePath();
const { data: cart, setCartItemQuantity, deleteCartItem } = useCart();
const { isAvailable: isPaypalAvailable, loadConfig } = usePayPal();
const { addModernImageExtension, getImageForViewport } = useModernImage();
const { isOpen, timer, startTimer, endTimer, closeQuickCheckout, hasTimer } = useQuickCheckout();
const { isAuthorized } = useCustomer();
const { addCoupon, loading: couponLoading } = useCoupon();

const couponCode = ref('');

onMounted(() => {
  startTimer();
  loadConfig();
});
onUnmounted(() => endTimer());

const cartItems = computed(() => cart.value?.items ?? []);

const totals = computed(() => {
  const totalsData = cartGetters.getTotals(cart.value);
  return {
    total: totalsData.total,
    subTotal: totalsData.subtotal,
  };
});

const shippingCost = computed(() => {
  const totalsData = cartGetters.getTotals(cart.value);
  return Number(totalsData.shippingAmount) || 0;
});

const getShippingDisplay = computed(() => {
  return shippingCost.value === 0 ? t('quickCheckout.freeShipping') : format(Number(shippingCost.value));
});

const getItemImageAlt = (item: CartItem) => {
  const image = item?.variation?.images?.all?.[0];
  return image ? productImageGetters.getImageAlternate(image) : '';
};

const updateQuantity = async (item: CartItem, quantity: number) => {
  if (quantity < 1) return;
  await setCartItemQuantity({
    quantity,
    cartItemId: item.id,
    productId: item.variationId,
  });
};

const deleteItem = async (item: CartItem) => {
  await deleteCartItem(item);
};

const handleAddCoupon = async () => {
  if (!couponCode.value) return;
  await addCoupon({ couponCode: couponCode.value });
};

const goToCheckout = () => (isAuthorized.value ? goToPage(paths.checkout) : goToPage(paths.guestLogin));

const goToPage = (path: string) => {
  closeQuickCheckout();
  navigateTo(localePath(path));
};

const close = () => {
  closeQuickCheckout();
};
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
