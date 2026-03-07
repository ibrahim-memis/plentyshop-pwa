<template>
  <div data-testid="b2b-contact-form-block" class="relative overflow-hidden">
    <div class="absolute inset-0 bg-[#384d37]" />
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />

    <div class="relative max-w-[1536px] mx-auto px-6 lg:px-8 py-16 md:py-24">
      <div class="text-center mb-12 md:mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-widest rounded-full border border-white/10 mb-5">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          {{ t('b2bContact.badge') }}
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {{ t('b2bContact.title') }}
        </h2>
        <p class="mt-4 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          {{ t('b2bContact.description') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">{{ t('b2bContact.emailLabel') }}</h3>
                <p class="text-sm text-white/60">sales@hafenx.com</p>
              </div>
            </div>
            <div class="flex items-center gap-4 mb-4 pt-4 border-t border-white/10">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">{{ t('b2bContact.phoneLabel') }}</h3>
                <p class="text-sm text-white/60">+49 7159 4591920</p>
              </div>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-white/10">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">{{ t('b2bContact.hoursLabel') }}</h3>
                <p class="text-sm text-white/60">{{ t('b2bContact.hoursValue') }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">24h</div>
              <div class="text-xs text-white/50 uppercase tracking-wider">{{ t('b2bContact.responseTime') }}</div>
            </div>
            <div class="bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
              <div class="text-xs text-white/50 uppercase tracking-wider">{{ t('b2bContact.happyClients') }}</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <Transition name="form-success" mode="out-in">
            <div v-if="submitted" class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center justify-center min-h-[480px] text-center">
              <div class="w-16 h-16 rounded-full bg-[#384d37]/10 flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-neutral-900 mb-2">{{ t('b2bContact.successTitle') }}</h3>
              <p class="text-sm text-neutral-500 max-w-sm">{{ t('b2bContact.successDescription') }}</p>
            </div>

            <form v-else class="bg-white rounded-2xl shadow-2xl p-6 md:p-8" @submit.prevent="handleSubmit">
              <h3 class="text-lg font-bold text-neutral-900 mb-6">{{ t('b2bContact.formTitle') }}</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="b2b-firstname" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.firstName') }}
                    </label>
                    <input
                      id="b2b-firstname"
                      v-model="form.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all"
                      :placeholder="t('b2bContact.firstNamePlaceholder')"
                    >
                  </div>
                  <div>
                    <label for="b2b-lastname" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.lastName') }}
                    </label>
                    <input
                      id="b2b-lastname"
                      v-model="form.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all"
                      :placeholder="t('b2bContact.lastNamePlaceholder')"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="b2b-company" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.company') }}
                    </label>
                    <input
                      id="b2b-company"
                      v-model="form.company"
                      type="text"
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all"
                      :placeholder="t('b2bContact.companyPlaceholder')"
                    >
                  </div>
                  <div>
                    <label for="b2b-email" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.email') }}
                    </label>
                    <input
                      id="b2b-email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all"
                      :placeholder="t('b2bContact.emailPlaceholder')"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="b2b-phone" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.phone') }}
                    </label>
                    <input
                      id="b2b-phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all"
                      :placeholder="t('b2bContact.phonePlaceholder')"
                    >
                  </div>
                  <div>
                    <label for="b2b-subject" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                      {{ t('b2bContact.subject') }}
                    </label>
                    <select
                      id="b2b-subject"
                      v-model="form.subject"
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all appearance-none"
                    >
                      <option value="" disabled>{{ t('b2bContact.subjectPlaceholder') }}</option>
                      <option value="quote">{{ t('b2bContact.subjectQuote') }}</option>
                      <option value="partnership">{{ t('b2bContact.subjectPartnership') }}</option>
                      <option value="bulk-order">{{ t('b2bContact.subjectBulkOrder') }}</option>
                      <option value="support">{{ t('b2bContact.subjectSupport') }}</option>
                      <option value="other">{{ t('b2bContact.subjectOther') }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="b2b-message" class="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {{ t('b2bContact.message') }}
                  </label>
                  <textarea
                    id="b2b-message"
                    v-model="form.message"
                    rows="4"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#384d37]/20 focus:border-[#384d37] transition-all resize-none"
                    :placeholder="t('b2bContact.messagePlaceholder')"
                  />
                </div>

                <div class="flex items-start gap-3 pt-1">
                  <input
                    id="b2b-privacy"
                    v-model="form.privacy"
                    type="checkbox"
                    required
                    class="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#384d37] focus:ring-[#384d37]/20"
                  >
                  <label for="b2b-privacy" class="text-xs text-neutral-500 leading-relaxed">
                    {{ t('b2bContact.privacyText') }}
                  </label>
                </div>

                <button
                  type="submit"
                  class="w-full py-3.5 px-6 bg-[#384d37] text-white text-sm font-semibold rounded-xl hover:bg-[#2c3e2b] focus:outline-none focus:ring-2 focus:ring-[#384d37]/50 focus:ring-offset-2 transition-all cursor-pointer group"
                >
                  <span class="inline-flex items-center gap-2">
                    {{ t('b2bContact.submit') }}
                    <svg class="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface B2BContactFormProps {
  content?: {
    enabled?: boolean;
  };
  meta?: { uuid: string };
}

defineProps<B2BContactFormProps>();
const { t } = useI18n();

const form = reactive({
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false,
});

const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    submitted.value = false;
    Object.assign(form, {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false,
    });
  }, 5000);
};
</script>

<style scoped>
.form-success-enter-active,
.form-success-leave-active {
  transition: all 0.4s ease;
}
.form-success-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.form-success-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
