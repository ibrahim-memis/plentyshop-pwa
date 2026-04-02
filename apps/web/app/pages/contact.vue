<template>
  <NuxtLayout name="default">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 pb-[15px]">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 py-4 text-sm text-neutral-400">
        <NuxtLink :to="localePath(paths.home)" class="hover:text-neutral-700 transition-colors">
          {{ t('contact.breadcrumbHome') }}
        </NuxtLink>
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span class="text-neutral-800 font-medium">{{ t('contact.contact') }}</span>
      </nav>

      <!-- Page header -->
      <div class="pb-8 border-b border-neutral-100">
        <h1 class="text-2xl md:text-3xl font-bold text-neutral-900">{{ t('contact.contact') }}</h1>
        <p class="mt-2 text-neutral-500 text-sm md:text-base max-w-2xl">{{ t('contact.contactShopMessage') }}</p>
      </div>

      <!-- Main content: 2-column layout -->
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12 py-8 md:py-12">

        <!-- Left column: Contact info -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Contact cards -->
          <div class="rounded-xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden">
            <div class="p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{{ t('contact.info.phone') }}</p>
                <a href="tel:+4971594591920" class="text-sm font-semibold text-neutral-900 hover:text-[#384d37] transition-colors mt-1 block">+49 7159 4591920</a>
              </div>
            </div>
            <div class="p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{{ t('contact.info.email') }}</p>
                <a href="mailto:sales@hafenx.com" class="text-sm font-semibold text-neutral-900 hover:text-[#384d37] transition-colors mt-1 block">sales@hafenx.com</a>
              </div>
            </div>
            <div class="p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{{ t('contact.info.hours') }}</p>
                <p class="text-sm font-semibold text-neutral-900 mt-1">{{ t('contact.info.hoursValue') }}</p>
              </div>
            </div>
            <div class="p-5 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{{ t('contact.info.address') }}</p>
                <p class="text-sm font-semibold text-neutral-900 mt-1">{{ t('contact.info.addressValue') }}</p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-xl border border-neutral-200 p-5 text-center">
              <div class="text-2xl font-bold text-[#384d37]">24h</div>
              <div class="text-xs text-neutral-400 mt-1 uppercase tracking-wider">{{ t('contact.info.responseTime') }}</div>
            </div>
            <div class="rounded-xl border border-neutral-200 p-5 text-center">
              <div class="text-2xl font-bold text-[#384d37]">500+</div>
              <div class="text-xs text-neutral-400 mt-1 uppercase tracking-wider">{{ t('contact.info.happyClients') }}</div>
            </div>
          </div>

          <!-- B2B hint -->
          <div class="rounded-xl bg-[#384d37]/5 border border-[#384d37]/10 p-5">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#384d37] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
              <div>
                <p class="text-sm font-bold text-neutral-900">{{ t('contact.info.b2bTitle') }}</p>
                <p class="text-xs text-neutral-500 mt-1 leading-relaxed">{{ t('contact.info.b2bDesc') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column: Form -->
        <div class="lg:col-span-2">
          <div class="rounded-xl border border-neutral-200 overflow-hidden">
            <div class="px-6 py-5 bg-neutral-50 border-b border-neutral-100">
              <h2 class="text-lg font-bold text-neutral-900">{{ t('contact.form.title') }}</h2>
              <p class="text-sm text-neutral-500 mt-1">{{ t('contact.form.subtitle') }}</p>
            </div>

            <form
              data-testid="contact-form"
              class="p-6 space-y-5"
              novalidate
              @submit.prevent="onSubmit"
            >
              <!-- Name + Email row -->
              <div class="grid md:grid-cols-2 gap-5">
                <label>
                  <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {{ t('contact.form.nameLabel') }}
                    <span class="normal-case tracking-normal text-neutral-400">({{ t('form.optional') }})</span>
                  </span>
                  <SfInput
                    v-bind="nameAttributes"
                    v-model="name"
                    name="name"
                    type="text"
                    :invalid="Boolean(errors['name'])"
                    class="!rounded-xl"
                  />
                  <ErrorMessage as="div" name="name" class="text-negative-700 text-xs mt-1" />
                </label>

                <label>
                  <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {{ t('contact.form.emailLabel') }} <span class="text-red-500">*</span>
                  </span>
                  <SfInput
                    v-bind="emailAttributes"
                    v-model="email"
                    name="email"
                    type="email"
                    :invalid="Boolean(errors['email'])"
                    autocomplete="email"
                    class="!rounded-xl"
                  />
                  <ErrorMessage as="div" name="email" class="text-negative-700 text-xs mt-1" />
                </label>
              </div>

              <!-- Company + Tax ID row -->
              <div class="grid md:grid-cols-2 gap-5">
                <label>
                  <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {{ t('contact.form.companyLabel') }}
                    <span class="normal-case tracking-normal text-neutral-400">({{ t('form.optional') }})</span>
                  </span>
                  <SfInput
                    v-bind="companyAttributes"
                    v-model="company"
                    name="company"
                    type="text"
                    :invalid="Boolean(errors['company'])"
                    class="!rounded-xl"
                  />
                  <ErrorMessage as="div" name="company" class="text-negative-700 text-xs mt-1" />
                </label>

                <label>
                  <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {{ t('contact.form.taxIdLabel') }}
                    <span class="normal-case tracking-normal text-neutral-400">({{ t('form.optional') }})</span>
                  </span>
                  <SfInput
                    v-bind="taxIdAttributes"
                    v-model="taxId"
                    name="taxId"
                    type="text"
                    :invalid="Boolean(errors['taxId'])"
                    :placeholder="t('contact.form.taxIdPlaceholder')"
                    class="!rounded-xl"
                  />
                  <ErrorMessage as="div" name="taxId" class="text-negative-700 text-xs mt-1" />
                </label>
              </div>

              <!-- Subject -->
              <label>
                <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mt-[20px] mb-1.5">
                  {{ t('contact.form.subjectLabel') }} <span class="text-red-500">*</span>
                </span>
                <SfInput
                  v-bind="subjectAttributes"
                  v-model="subject"
                  name="subject"
                  type="text"
                  :invalid="Boolean(errors['subject'])"
                  class="!rounded-xl"
                />
                <ErrorMessage as="div" name="subject" class="text-negative-700 text-xs mt-1" />
              </label>

              <!-- Message -->
              <label class="flex flex-col">
                <span class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                  {{ t('contact.form.message') }} <span class="text-red-500">*</span>
                </span>
                <SfTextarea
                  v-bind="messageAttributes"
                  v-model="message"
                  name="message"
                  type="text"
                  :invalid="Boolean(errors['message'])"
                  :placeholder="t('contact.form.message-placeholder')"
                  class="w-full !rounded-xl min-h-[120px]"
                />
                <ErrorMessage as="div" name="message" class="text-negative-700 text-xs mt-1" />
              </label>

              <!-- Privacy -->
              <div>
                <div class="flex items-center">
                  <SfCheckbox
                    id="terms"
                    v-bind="privacyPolicyAttributes"
                    v-model="privacyPolicy"
                    :invalid="Boolean(errors['privacyPolicy'])"
                    value="value"
                    class="peer"
                  />
                  <label
                    class="ml-3 text-sm text-neutral-600 cursor-pointer peer-disabled:text-disabled-900 select-none"
                    for="terms"
                  >
                    <i18n-t keypath="contact.privacyPolicy" scope="global">
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
                    <span class="text-red-500"> *</span>
                  </label>
                </div>
                <ErrorMessage as="div" name="privacyPolicy" class="text-negative-700 text-xs mt-1" />
              </div>

              <!-- Turnstile -->
              <div v-if="turnstileSiteKey.length > 0 && turnstileLoad">
                <NuxtTurnstile
                  v-bind="turnstileAttributes"
                  ref="turnstileElement"
                  v-model="turnstile"
                  :site-key="turnstileSiteKey"
                  :options="{ theme: 'light' }"
                />
                <ErrorMessage as="div" name="turnstile" class="text-negative-700 text-xs mt-1" />
              </div>

              <!-- Actions -->
              <div class="flex flex-col-reverse md:flex-row justify-end gap-3 pt-2">
                <button
                  type="button"
                  :disabled="isContactLoading"
                  class="px-6 py-3 rounded-xl text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50"
                  @click="clearInputs"
                >
                  {{ t('contact.clearAll') }}
                </button>
                <button
                  data-testid="save-address"
                  type="submit"
                  :disabled="isContactLoading"
                  class="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-[#384d37] hover:bg-[#2c3e2b] transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 min-w-[160px]"
                >
                  <SfLoaderCircular v-if="isContactLoading" class="flex justify-center items-center" size="sm" />
                  <template v-else>
                    {{ t('contact.contactSend') }}
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                  </template>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import type { CustomerContactEmailParams } from '@plentymarkets/shop-api';
import { SfInput, SfCheckbox, SfLink, SfTextarea, SfLoaderCircular, SfIconWarning } from '@storefront-ui/vue';
import { boolean, object, string } from 'yup';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { paths } from '~/utils/paths';
import { userGetters } from '@plentymarkets/shop-api';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  layout: false,
  pageType: 'static',
});

const { loading: isContactLoading, doCustomerContactMail } = useCustomerContact();
const localePath = useLocalePath();
const { getSetting } = useSiteSettings('cloudflareTurnstileApiSiteKey');
const turnstileSiteKey = getSetting() ?? '';
const turnstileElement = ref();
const turnstileLoad = ref(false);
const { send } = useNotification();
const { getRobots, setRobotForStaticPage } = useRobots();
const { setPageMeta } = usePageMeta();

const icon = 'page';
setPageMeta(t('contact.label'), icon);

const validationSchema = toTypedSchema(
  object({
    email: string()
      .trim()
      .required(t('error.email.required'))
      .test('is-valid-email', t('storefrontError.contactMail.emailInvalid'), (mail: string) =>
        userGetters.isValidEmailAddress(mail),
      )
      .default(''),
    message: string()
      .required(t('error.contact.messageRequired'))
      .test('min-clean-length', t('storefrontError.contactMail.messageInvalid'), (val: string | undefined) => {
        if (!val) return false;
        const cleaned = val.replace(/\n/g, '').trim();
        return cleaned.length >= 3;
      })
      .default(''),
    name: string()
      .trim()
      .notRequired()
      .default('')
      .test('min-if-not-empty', t('storefrontError.contactMail.nameInvalid'), (val) => {
        if (!val || val.length === 0) return true;
        return val.length >= 3;
      }),
    subject: string()
      .trim()
      .required(t('error.contact.subjectRequired'))
      .default('')
      .test('min-length', t('storefrontError.contactMail.subjectInvalid'), (val) => !!(val && val.length >= 3)),
    company: string().trim().notRequired().default(''),
    taxId: string().trim().notRequired().default(''),
    privacyPolicy: boolean().oneOf([true], t('error.contact.termsRequired')).default(false),
    turnstile:
      turnstileSiteKey.length > 0
        ? string().required(t('error.contact.turnstileRequired')).default('')
        : string().optional().default(''),
  }),
);

const { errors, meta, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: validationSchema,
});

const [rawName, nameAttributes] = defineField('name');
const name = rawName as Ref<string>;
const [email, emailAttributes] = defineField('email');
const [rawSubject, subjectAttributes] = defineField('subject');
const subject = rawSubject as Ref<string>;
const [rawCompany, companyAttributes] = defineField('company');
const company = rawCompany as Ref<string>;
const [rawTaxId, taxIdAttributes] = defineField('taxId');
const taxId = rawTaxId as Ref<string>;
const [message, messageAttributes] = defineField('message');
const [privacyPolicy, privacyPolicyAttributes] = defineField('privacyPolicy');
const [turnstile, turnstileAttributes] = defineField('turnstile');

const clearInputs = () => {
  name.value = '';
  email.value = '';
  message.value = '';
  company.value = '';
  taxId.value = '';
  subject.value = '';
  privacyPolicy.value = false;
};

const submitForm = async () => {
  if (!meta.value.valid) return;
  if (turnstileSiteKey.length > 0 && !turnstile.value) return;

  const params: CustomerContactEmailParams = {
    subject: subject.value || '',
    email: email.value || '',
    message: message.value || '',
    ...(turnstile.value ? { 'cf-turnstile-response': turnstile.value } : {}),
  };

  if (name.value) params.name = name.value;

  if (await doCustomerContactMail(params)) {
    send({ type: 'positive', message: t('contact.success') });
    resetForm();
  }

  turnstile.value = '';
  turnstileElement.value?.reset();
};

const onSubmit = handleSubmit(() => submitForm());

await getRobots();
setRobotForStaticPage('ContactPage');

if (turnstileSiteKey.length > 0) {
  const turnstileWatcher = watch([name, email, subject, company, taxId, message], (data) => {
    if (data.some((field) => field && field.length > 0)) {
      turnstileLoad.value = true;
      turnstileWatcher();
    }
  });
}
</script>
