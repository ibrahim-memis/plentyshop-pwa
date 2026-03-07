import type { Cart, ApiError } from '@plentymarkets/shop-api';

import type { SetInitialData, UseInitialSetupReturn } from './types';

/** Function for getting current customer/cart data from session
 * @return SetInitialData
 * @example
 * ``` ts
 * setInitialData();
 * ```
 */
const setInitialData: SetInitialData = async () => {
  const { setUser } = useCustomer();
  const { setCart, loading: cartLoading } = useCart();

  cartLoading.value = true;

  try {
    const { data } = await useSdk().plentysystems.getSession();
    if (data) {
      setUser(data.user);
      setCart(data.basket as Cart);
    }
  } catch (error) {
    useHandleError(error as ApiError);
  } finally {
    cartLoading.value = false;
  }

  return true;
};

/** Fallback: fetch session and categories separately when getInit fails */
const setInitialDataFallback = async (): Promise<boolean> => {
  const { setUser } = useCustomer();
  const { setCategoryTree } = useCategoryTree();
  const { setCart } = useCart();
  const { setWishlistItemIds } = useWishlist();
  const sdk = useSdk();

  const [sessionResult, categoryResult] = await Promise.allSettled([
    useAsyncData('fallback-session', () => sdk.plentysystems.getSession()),
    useAsyncData('fallback-categories', () => sdk.plentysystems.getCategoryTree()),
  ]);

  if (sessionResult.status === 'fulfilled' && sessionResult.value.data.value?.data) {
    const session = sessionResult.value.data.value.data;
    setUser(session.user);
    setCart(session.basket as Cart);
    setWishlistItemIds(Object.values(session.basket?.itemWishListIds || []));
  }

  if (categoryResult.status === 'fulfilled' && categoryResult.value.data.value?.data) {
    setCategoryTree(categoryResult.value.data.value.data);
  }

  return true;
};

/** Function for getting category tree and current customer/cart data from session
 * @return SetInitialData
 * @example
 * ``` ts
 * setInitialDataSSR();
 * ```
 */
const setInitialDataSSR: SetInitialData = async () => {
  const { setUser } = useCustomer();
  const { setCategoryTree } = useCategoryTree();
  const { setCart, loading: cartLoading } = useCart();
  const { setWishlistItemIds } = useWishlist();
  const { setRobots } = useRobots();
  const { setInitialData } = useSiteSettings();
  const { setInitialData: setInitialAssetsData } = useCustomAssets();

  cartLoading.value = true;

  let initSuccess = false;

  try {
    const { data } = await useAsyncData(() => useSdk().plentysystems.getInit());
    if (data.value?.data) {
      setUser(data.value.data.session.user);
      setCart(data.value.data.session?.basket as Cart);
      setCategoryTree(data.value.data.categories);
      setInitialData(data.value.data.settings);
      setInitialAssetsData(data.value.data.customAssets || []);
      setWishlistItemIds(Object.values(data.value.data.session?.basket?.itemWishListIds || []));
      if (data.value.data.robots) {
        setRobots(data.value.data.robots);
      }
      initSuccess = true;
    }
  } catch (error) {
    useHandleError(error as ApiError);
  }

  if (!initSuccess) {
    try {
      await setInitialDataFallback();
    } catch {
      // fallback also failed — continue with empty state
    }
  }

  cartLoading.value = false;

  return true;
};

/**
 * @description Composable to get initial customer and cart data
 * @returns UseInitialSetupReturn
 * @example
 * ``` ts
 * const { setInitialData } = useInitialSetup();
 * ```
 */
export const useInitialSetup: UseInitialSetupReturn = () => {
  return {
    setInitialData,
    setInitialDataSSR,
  };
};
