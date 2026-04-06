<template>
  <MegaMenu
    :categories="categoryTree"
    @toggle-language="toggleLanguageSelect()"
    @navigate-login="navigateToLogin"
  >
    <!-- Desktop: Arama + Aksiyon ikonları (etiketli) -->
    <template v-if="viewport.isGreaterOrEquals('md')">
      <UiSearch class="hidden md:block flex-1 mx-6 lg:mx-8" />

      <nav class="hidden md:flex md:flex-row md:flex-nowrap items-center gap-1 shrink-0">
        <!-- Bonusprogramm / Kampagnen -->
        <NuxtLink
          :to="localePath(paths.campaigns)"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-900"
        >
          <div class="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
          </div>
          <div class="hidden xl:block leading-tight">
            <p class="text-[11px] text-neutral-400 leading-tight">{{ t('header.bonusProgram') }}</p>
            <p class="text-[13px] font-semibold text-neutral-800">{{ t('header.campaigns') }}</p>
          </div>
        </NuxtLink>

        <!-- Kişi ikonu / Hesap -->
        <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
          <template #trigger>
            <button
              class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-900 cursor-pointer"
              data-testid="account-dropdown-button"
              @click="accountDropdownToggle()"
            >
              <div class="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
                <SfIconPerson class="!w-[18px] !h-[18px]" />
              </div>
              <div class="hidden xl:block leading-tight text-left">
                <p class="text-[11px] text-neutral-400 leading-tight">{{ t('header.welcome') }}</p>
                <p class="text-[13px] font-semibold text-neutral-800">{{ t('account.heading') }}</p>
              </div>
            </button>
          </template>
          <ul class="rounded-lg bg-white shadow-lg border border-neutral-100 text-neutral-900 min-w-[200px] py-2 mt-2">
            <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
              <template v-if="label === t('account.logout')">
                <UiDivider class="my-2" />
                <SfListItem tag="button" class="text-left hover:bg-neutral-50 transition-colors" data-testid="account-dropdown-logout-item" @click="logOut()">
                  {{ label }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-neutral-50 font-medium': route.path === link }"
                class="hover:bg-neutral-50 transition-colors"
                data-testid="account-dropdown-list-item"
              >
                {{ label }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>
        <button
          v-else
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-900 cursor-pointer"
          :aria-label="t('authentication.login.openLoginForm')"
          @click="navigateToLogin"
        >
          <div class="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
            <SfIconPerson class="!w-[18px] !h-[18px]" />
          </div>
          <div class="hidden xl:block leading-tight text-left">
            <p class="text-[11px] text-neutral-400 leading-tight">{{ t('header.loginHint') }}</p>
            <p class="text-[13px] font-semibold text-neutral-800">{{ t('header.loginRegister') }}</p>
          </div>
        </button>

        <!-- Wishlist -->
        <NuxtLink
          :to="localePath(paths.wishlist)"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-900"
          :aria-label="t('cart.numberInWishlist', { count: wishlistCount })"
        >
          <div class="relative w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
            <SfIconFavorite class="!w-[18px] !h-[18px]" />
            <SfBadge
              v-if="wishlistCount > 0"
              :content="wishlistCount"
              class="!absolute !-top-1 !-right-1 !bg-red-500 text-white flex justify-center items-center !text-[9px] !min-w-[16px] !min-h-[16px] !rounded-full !p-0"
              placement="top-right"
            />
          </div>
          <div class="hidden xl:block leading-tight">
            <p class="text-[11px] text-neutral-400 leading-tight">{{ t('header.merklist') }}</p>
            <p class="text-[13px] font-semibold text-neutral-800">{{ wishlistCount }} {{ t('header.articles') }}</p>
          </div>
        </NuxtLink>

        <!-- Sepet -->
        <button
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-900 cursor-pointer"
          :aria-label="t('cart.numberInCart', { count: cartItemsCount })"
          @click="openCartSidebar"
        >
          <div class="relative w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
            <SfIconShoppingCart class="!w-[18px] !h-[18px]" />
            <SfBadge
              v-if="cartItemsCount > 0"
              :content="cartItemsCount"
              class="!absolute !-top-1 !-right-1 !bg-[#384d37] text-white flex justify-center items-center !text-[9px] !min-w-[16px] !min-h-[16px] !rounded-full !p-0"
              data-testid="cart-badge"
              placement="top-right"
              :max="99"
            />
          </div>
          <div class="hidden xl:block leading-tight text-left">
            <p class="text-[11px] text-neutral-400 leading-tight">{{ t('header.cart') }}</p>
            <p class="text-[13px] font-semibold text-neutral-800">{{ cartItemsCount }} {{ t('header.articles') }}</p>
          </div>
        </button>
      </nav>
    </template>

    <!-- Mobil: İkonlar -->
    <div v-if="viewport.isLessThan('lg')" class="flex items-center gap-0.5 ml-auto">
      <button
        class="p-2.5 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors md:hidden cursor-pointer"
        :aria-label="t('common.navigation.openSearchModal')"
        @click="searchModalOpen"
      >
        <SfIconSearch class="!w-5 !h-5" />
      </button>
      <button
        class="p-2.5 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
        @click="navigateToLogin"
      >
        <SfIconPerson class="!w-5 !h-5" />
      </button>
      <button
        class="p-2.5 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors relative cursor-pointer"
        :aria-label="t('cart.numberInCart', { count: cartItemsCount })"
        @click="openCartSidebar"
      >
        <SfIconShoppingCart class="!w-5 !h-5" />
        <SfBadge
          v-if="cartItemsCount > 0"
          :content="cartItemsCount"
          class="!absolute !top-0.5 !right-0.5 !bg-[#384d37] text-white flex justify-center items-center !text-[9px] !min-w-[14px] !min-h-[14px] !rounded-full !p-0"
          data-testid="cart-badge"
          placement="top-right"
          :max="99"
        />
      </button>
    </div>
  </MegaMenu>

  <UiModal
    v-if="viewport.isGreaterOrEquals('md') && isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="h-full md:w-[620px] md:h-fit md:max-h-[90vh] m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="t('common.navigation.closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent
      v-if="isLogin"
      :is-modal="true"
      @change-view="isLogin = false"
      @logged-in="navigateAfterAuth(true)"
    />
    <Register v-else :is-modal="true" @change-view="isLogin = true" @registered="onRegistered" />
  </UiModal>

  <!-- Post-Registration Welcome Popup -->
  <UiModal
    v-if="isWelcomePopupOpen"
    v-model="isWelcomePopupOpen"
    tag="section"
    class="h-full md:w-[520px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <div class="relative">
      <button
        type="button"
        :aria-label="t('common.navigation.closeDialog')"
        class="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
        @click="closeWelcomePopup"
      >
        <SfIconClose class="!w-4 !h-4 text-neutral-500" />
      </button>

      <div class="bg-gradient-to-br from-[#384d37] to-[#2c3e2b] px-6 pt-8 pb-6 text-center">
        <div class="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
        </div>
        <h3 class="text-xl font-bold text-white">{{ t('welcomePopup.title') }}</h3>
        <p class="text-sm text-white/70 mt-1.5">{{ t('welcomePopup.subtitle') }}</p>
      </div>

      <div class="px-6 py-5">
        <div class="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-amber-900">{{ t('welcomePopup.currentPlan') }}</p>
              <p class="text-xs text-amber-700 mt-1 leading-relaxed">{{ t('welcomePopup.currentPlanDesc') }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-xl border border-[#384d37]/15 bg-[#384d37]/5 p-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#384d37] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-neutral-900">{{ t('welcomePopup.b2bTitle') }}</p>
              <p class="text-xs text-neutral-500 mt-1 leading-relaxed">{{ t('welcomePopup.b2bDesc') }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-3">
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3.5 h-3.5 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              {{ t('welcomePopup.benefit1') }}
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3.5 h-3.5 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              {{ t('welcomePopup.benefit2') }}
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3.5 h-3.5 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              {{ t('welcomePopup.benefit3') }}
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3.5 h-3.5 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              {{ t('welcomePopup.benefit4') }}
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-xl border border-neutral-200 overflow-hidden">
          <div class="px-4 py-3 bg-neutral-50 border-b border-neutral-100">
            <p class="text-xs font-bold text-neutral-700 uppercase tracking-wider">{{ t('welcomePopup.contactTitle') }}</p>
          </div>
          <div class="p-4 flex items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
              <a href="tel:+4971594591920" class="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#384d37] transition-colors">
                <svg class="w-4 h-4 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                +49 7159 4591920
              </a>
              <a href="mailto:sales@hafenx.com" class="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#384d37] transition-colors">
                <svg class="w-4 h-4 text-[#384d37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                sales@hafenx.com
              </a>
            </div>
            <NuxtLink
              :to="localePath(paths.contact)"
              class="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#384d37] text-white text-sm font-semibold hover:bg-[#2c3e2b] transition-colors"
              @click="closeWelcomePopup"
            >
              {{ t('welcomePopup.contactBtn') }}
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </NuxtLink>
          </div>
        </div>

        <button
          type="button"
          class="mt-4 w-full py-3 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          @click="closeWelcomePopup"
        >
          {{ t('welcomePopup.continueBtn') }}
        </button>
      </div>
    </div>
  </UiModal>

  <NuxtLazyHydrate v-if="viewport.isLessThan('lg')" when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton
          :aria-label="t('common.navigation.closeDialog')"
          square
          variant="tertiary"
          class="absolute right-4 top-2"
          @click="searchModalClose"
        >
          <SfIconClose class="text-neutral-500" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('common.actions.search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfDropdown,
  SfIconClose,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfListItem,
  SfModal,
  SfIconFavorite,
  useDisclosure,
} from '@storefront-ui/vue';
import { paths } from '~/utils/paths';
import { handleLogout } from '~/utils/logout';

const isLogin = ref(true);
const isWelcomePopupOpen = ref(false);
const { data: cart } = useCart();
const { wishlistItemIds } = useWishlist();
const cartItemsCount = ref(0);
const wishlistCount = computed(() => wishlistItemIds.value?.length ?? 0);

const NuxtLink = resolveComponent('NuxtLink');
const { locale: currentLocale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
const { isLoginModalOpen, closeLoginModal } = useLoginModal();
const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree, getCategoryTree } = useCategoryTree();
const { user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();

onNuxtReady(async () => {
  const { fetchSession } = useFetchSession();
  await fetchSession();
  if (categoryTree.value.length === 0) await getCategoryTree();
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

const navigateAfterAuth = (reload: boolean) => {
  closeAuthentication();
  closeLoginModal();
  if (reload) {
    nextTick(() => {
      window.location.href = window.location.href;
    });
  }
};

const onRegistered = () => {
  closeAuthentication();
  closeLoginModal();
  isWelcomePopupOpen.value = true;
};

const closeWelcomePopup = () => {
  isWelcomePopupOpen.value = false;
  nextTick(() => window.location.reload());
};

watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
  },
);

watch(
  () => isAuthenticationOpen.value,
  (val) => {
    isLogin.value = true;
    if (!val) closeLoginModal();
  },
);

watch(isLoginModalOpen, (val) => {
  if (val) openAuthentication();
});

const logOut = () => handleLogout({ logout, toggle: accountDropdownToggle });

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};

const { openQuickCheckout } = useQuickCheckout();
const openCartSidebar = () => {
  openQuickCheckout({} as any, 0);
};
</script>
