<template>
  <div class="font-medium" :class="{ 'flex flex-col items-center text-center': !isModal, 'ml-8': isModal }">
    <div class="text-lg font-bold text-neutral-900">{{ t('authentication.signup.heading') }}</div>
    <div class="text-sm text-neutral-500 mt-1">{{ t('authentication.signup.subheading') }}</div>

    <!-- B2B Benefits -->
    <div class="mt-4 font-normal grid grid-cols-2 gap-2">
      <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#384d37]/5 border border-[#384d37]/10">
        <div class="w-8 h-8 rounded-md bg-[#384d37] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        </div>
        <span class="text-xs font-medium text-neutral-700">{{ t('register.b2b.seePrices') }}</span>
      </div>
      <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#384d37]/5 border border-[#384d37]/10">
        <div class="w-8 h-8 rounded-md bg-[#384d37] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        </div>
        <span class="text-xs font-medium text-neutral-700">{{ t('register.b2b.placeOrders') }}</span>
      </div>
      <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#384d37]/5 border border-[#384d37]/10">
        <div class="w-8 h-8 rounded-md bg-[#384d37] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
        </div>
        <span class="text-xs font-medium text-neutral-700">{{ t('register.b2b.volumeDiscounts') }}</span>
      </div>
      <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#384d37]/5 border border-[#384d37]/10">
        <div class="w-8 h-8 rounded-md bg-[#384d37] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
        </div>
        <span class="text-xs font-medium text-neutral-700">{{ t('register.b2b.fastShipping') }}</span>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center my-1">
    <form class="flex flex-col gap-4 p-2 md:p-6 rounded-md w-full md:w-[540px]" @submit.prevent="onSubmit">
      <label>
        <UiFormLabel>{{ t('form.emailLabel') }} {{ t('form.required') }}</UiFormLabel>
        <SfInput
          v-model="email"
          v-bind="emailAttributes"
          :invalid="!!errors['register.email']"
          name="customerEmail"
          type="email"
          autocomplete="email"
        />
        <ErrorMessage as="span" name="register.email" class="flex text-negative-700 text-sm mt-2" />
      </label>

      <label>
        <UiFormLabel>{{ t('form.passwordLabel') }} {{ t('form.required') }}</UiFormLabel>
        <UiFormPasswordInput
          v-model="password"
          :title="t('authentication.signup.passwordValidation.invalidPassword')"
          name="password"
          autocomplete="current-password"
          v-bind="passwordAttributes"
          :invalid="!!errors['register.password']"
          @input="stripSpaces('password')"
        />
        <ErrorMessage as="span" name="register.password" class="flex text-negative-700 text-sm mt-2" />
      </label>

      <label>
        <UiFormLabel>{{ t('form.repeatPasswordLabel') }} {{ t('form.required') }}</UiFormLabel>
        <UiFormPasswordInput
          v-model="repeatPassword"
          :title="t('authentication.signup.passwordValidation.invalidPassword')"
          name="password"
          autocomplete="current-password"
          v-bind="repeatPasswordAttributes"
          :invalid="!!errors['register.repeatPassword']"
          @input="stripSpaces('repeatPassword')"
        />
        <ErrorMessage as="span" name="register.repeatPassword" class="flex text-negative-700 text-sm mt-2" />
      </label>

      <div class="text-xs">
        <div class="flex items-center" :class="{ 'text-green-600': passwordValidationLength }">
          <SfIconCheck v-if="passwordValidationLength" size="sm" />
          <SfIconClose v-else size="sm" />
          <span class="ml-1">
            {{
              t('authentication.signup.passwordValidation.characters', {
                min: passwordMinLength,
                max: passwordMaxLength,
              })
            }}
          </span>
        </div>
        <div class="flex items-center" :class="{ 'text-green-600': passwordValidationOneDigit }">
          <SfIconCheck v-if="passwordValidationOneDigit" size="sm" />
          <SfIconClose v-else size="sm" />
          <span class="ml-1">{{ t('authentication.signup.passwordValidation.numbers') }}</span>
        </div>
        <div class="flex items-center" :class="{ 'text-green-600': passwordValidationOneLetter }">
          <SfIconCheck v-if="passwordValidationOneLetter" size="sm" />
          <SfIconClose v-else size="sm" />
          <span class="ml-1">{{ t('authentication.signup.passwordValidation.letters') }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <SfCheckbox
          id="privacyPolicy"
          v-model="privacyPolicy"
          v-bind="privacyPolicyAttributes"
          value="value"
          class="peer"
        />
        <label
          class="ml-3 text-base text-neutral-900 cursor-pointer peer-disabled:text-disabled-900 select-none"
          for="privacyPolicy"
        >
          <i18n-t keypath="form.privacyPolicyLabel" scope="global">
            <template #privacyPolicy>
              <SfLink
                :href="localePath(paths.privacyPolicy)"
                target="_blank"
                class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
              >
                {{ t('legal.privacyPolicy') }}
              </SfLink>
            </template>
          </i18n-t>
          {{ t('form.required') }}
        </label>
      </div>
      <ErrorMessage as="div" name="register.privacyPolicy" class="text-negative-700 text-left text-sm" />

      <NuxtTurnstile
        v-if="turnstileSiteKey.length > 0 && turnstileLoad"
        v-bind="turnstileAttributes"
        ref="turnstileElement"
        v-model="turnstile"
        :site-key="turnstileSiteKey"
        :options="{ theme: 'light' }"
        class="mt-4 flex justify-center"
      />
      <ErrorMessage as="div" name="register.turnstile" class="text-negative-700 text-center text-sm" />

      <UiButton type="submit" class="mt-2" :disabled="loading || migrateLoading">
        <SfLoaderCircular v-if="loading || migrateLoading" class="flex justify-center items-center" size="base" />
        <span v-else>
          {{ t('authentication.signup.submitLabel') }}
        </span>
      </UiButton>

      <!-- B2B Info Card -->
      <div class="rounded-xl border border-neutral-200 overflow-hidden mt-2">
        <div class="p-4 bg-gradient-to-r from-[#384d37]/5 to-transparent">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-[#384d37] flex items-center justify-center shrink-0 mt-0.5">
              <svg class="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-neutral-900">{{ t('register.b2b.infoTitle') }}</p>
              <p class="text-xs text-neutral-500 mt-1 leading-relaxed">{{ t('register.b2b.infoDesc') }}</p>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div class="flex items-center gap-4 text-xs text-neutral-500">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              +49 7159 4591920
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              sales@hafenx.com
            </span>
          </div>
          <NuxtLink
            :to="localePath(paths.contact)"
            class="text-xs font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors whitespace-nowrap"
          >
            {{ t('register.b2b.contactLink') }} &rarr;
          </NuxtLink>
        </div>
      </div>

      <div v-if="changeableView" class="text-center">
        <div class="my-5 font-bold">{{ t('authentication.signup.alreadyHaveAccount') }}</div>
        <SfLink variant="primary" class="cursor-pointer" @click="$emit('change-view')">
          {{ t('authentication.signup.logInLinkLabel') }}
        </SfLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  SfLink,
  SfInput,
  SfLoaderCircular,
  SfCheckbox,
  SfIconPerson,
  SfIconLocalShipping,
  SfIconFavorite,
  SfIconSchedule,
  SfIconCheck,
  SfIconClose,
} from '@storefront-ui/vue';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, boolean } from 'yup';
import type { RegisterFormParams } from '~/components/Register/types';
import { useMigrateGuestOrder } from '~/composables/useMigrateGuestOrder';
import { userGetters } from '@plentymarkets/shop-api';

const localePath = useLocalePath();
const router = useRouter();
const { register, loading, isAuthorized } = useCustomer();
const { send } = useNotification();
const { migrateGuestOrder, loading: migrateLoading } = useMigrateGuestOrder();
const viewport = useViewport();
const { getSetting } = useSiteSettings('cloudflareTurnstileApiSiteKey');
const runtimeConfig = useRuntimeConfig();

const emits = defineEmits(['registered', 'change-view']);
const { emailAddress, order, isModal = false, changeableView = true } = defineProps<RegisterFormParams>();

const turnstileSiteKey = getSetting() ?? '';
const passwordMinLength = runtimeConfig.public.passwordMinLength;
const passwordMaxLength = runtimeConfig.public.passwordMaxLength;

const turnstileElement = ref();
const turnstileLoad = ref(false);

const validationSchema = toTypedSchema(
  object({
    register: object({
      email: string()
        .trim()
        .required(t('error.email.required'))
        .test('is-valid-email', t('error.email.valid'), (mail: string) => userGetters.isValidEmailAddress(mail))
        .default(''),
      password: string()
        .required(t('error.password.required'))
        .transform((value) => (value ? value.replace(/\s/g, '') : value))
        .min(passwordMinLength, t('error.password.minLength', { min: passwordMinLength }))
        .max(passwordMaxLength, t('error.password.maxLength', { max: passwordMaxLength }))
        .matches(/^(?=.*[A-Za-z])(?=.*\d)/, t('error.password.valid'))
        .default(''),
      repeatPassword: string()
        .required(t('error.password.required'))
        .transform((value) => (value ? value.replace(/\s/g, '') : value))
        .test('passwords-match', t('error.password.match'), function (value) {
          const passwordValue = this.parent.password?.replace(/\s/g, '');
          return value === passwordValue;
        })
        .default(''),
      privacyPolicy: boolean().isTrue(t('legal.privacyPolicyRequired')).required(t('legal.privacyPolicyRequired')),
      turnstile:
        turnstileSiteKey.length > 0
          ? string().required(t('error.turnstileRequired')).default('')
          : string().optional().default(''),
    }),
  }),
);

const { errors, meta, defineField, handleSubmit } = useForm({ validationSchema: validationSchema });
const [email, emailAttributes] = defineField('register.email');
const [password, passwordAttributes] = defineField('register.password');
const [repeatPassword, repeatPasswordAttributes] = defineField('register.repeatPassword');
const [turnstile, turnstileAttributes] = defineField('register.turnstile');
const [privacyPolicy, privacyPolicyAttributes] = defineField('register.privacyPolicy');

if (emailAddress) email.value = emailAddress;

const stripSpaces = (fieldName: 'password' | 'repeatPassword') => {
  const fieldRef = fieldName === 'password' ? password : repeatPassword;
  const currentValue = fieldRef.value;

  if (currentValue && typeof currentValue === 'string') {
    fieldRef.value = currentValue.replace(/\s/g, '');
  }
};

const clearTurnstile = () => {
  turnstile.value = '';
  turnstileElement.value?.reset();
};

const registerUser = async () => {
  if (!meta.value.valid || (!turnstile.value && turnstileSiteKey.length > 0) || isAuthorized.value) {
    return;
  }

  const response = await register({
    'cf-turnstile-response': turnstile.value,
    contact: {
      password: password.value ?? '',
      typeId: 1,
      referrerId: 1,
      options: {
        typeId: {
          value: email.value ?? '',
          subTypeId: 4,
          priority: 0,
          typeId: 2,
        },
      },
    },
  });

  if (response?.data.code === 1) {
    send({ message: t('authentication.signup.emailAlreadyExists'), type: 'negative' });
    clearTurnstile();
    return;
  }

  if (response?.data.id) {
    send({ message: t('authentication.signup.success'), type: 'positive' });

    if (order) {
      await migrateGuestOrder({
        orderId: order?.order.id ?? -1,
        accessKey: order?.order.accessKey ?? '',
        postcode: order?.order.deliveryAddress.postalCode ?? undefined,
        name: order?.order.deliveryAddress.name3 ?? undefined,
      });
    }

    emits('registered');
    clearTurnstile();

    if (!order) viewport.isGreaterOrEquals('lg') ? router.push(router.currentRoute.value.path) : router.back();
  }
  clearTurnstile();
};

const onSubmit = handleSubmit(() => registerUser());

const passwordValidationLength = computed(() => {
  const val = password?.value || '';
  return val.length >= passwordMinLength && val.length <= passwordMaxLength;
});

const passwordValidationOneDigit = computed(() => /\d/.test(password?.value || ''));
const passwordValidationOneLetter = computed(() => /[A-Za-z]/.test(password?.value || ''));

if (turnstileSiteKey.length > 0) {
  const turnstileWatcher = watch([email, password, repeatPassword], (data) => {
    if (data.some((field) => field && field.length > 0)) {
      turnstileLoad.value = true;
      turnstileWatcher();
    }
  });
}
</script>
