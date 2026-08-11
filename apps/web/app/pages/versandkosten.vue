<template>
  <div class="bg-neutral-50/50">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <!-- Header -->
      <header class="mb-10">
        <p class="text-xs font-semibold uppercase tracking-widest text-[#384d37]">HafenX B2B</p>
        <h1 class="mt-2 text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Versandkosten</h1>
        <p class="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
          Schneller und zuverlässiger Versand für Ihren gastronomischen Bedarf. Alle nachfolgenden Preise
          verstehen sich <span class="font-semibold text-neutral-800">netto</span> zzgl. der gesetzlichen
          Mehrwertsteuer.
        </p>
      </header>

      <!-- Versandarten -->
      <section class="grid sm:grid-cols-2 gap-4 md:gap-5 mb-10">
        <div class="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-10 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L21.066 3.403A2.25 2.25 0 0 0 19.208 2.5H15M2.25 14.25V5.625c0-.621.504-1.125 1.125-1.125h7.5" /></svg>
            </span>
            <h2 class="text-base font-bold text-neutral-900">Paketversand (DHL)</h2>
          </div>
          <p class="text-sm text-neutral-600 leading-relaxed">
            Standardbestellungen versenden wir schnell und nachverfolgbar per Paketdienst DHL.
          </p>
        </div>
        <div class="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-10 h-10 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
            </span>
            <h2 class="text-base font-bold text-neutral-900">Speditionsversand</h2>
          </div>
          <p class="text-sm text-neutral-600 leading-relaxed">
            Große Mengen und palettierte Ware liefern wir per Spedition. Gerne erstellen wir Ihnen ein
            individuelles Versandangebot.
          </p>
        </div>
      </section>

      <!-- Versandkostenfrei -->
      <section class="mb-10">
        <div class="flex items-start gap-4 rounded-xl bg-[#384d37] p-5 md:p-6 text-white">
          <svg class="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <div>
            <h2 class="text-lg font-bold">Versandkostenfrei ab 600,00 € netto</h2>
            <p class="mt-1 text-sm text-white/80 leading-relaxed">
              Ab einem Netto-Warenwert von 600,00 € liefern wir innerhalb Deutschlands versandkostenfrei.
            </p>
          </div>
        </div>
      </section>

      <!-- Versandkosten-Tabelle -->
      <section class="mb-10">
        <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4">Versandkosten-Übersicht</h2>
        <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-neutral-50 border-b border-neutral-200 text-left">
                  <th class="px-4 py-3 font-semibold text-neutral-500 whitespace-nowrap">Region</th>
                  <th class="px-4 py-3 font-semibold text-neutral-500 text-right whitespace-nowrap">Versandkosten (netto)</th>
                  <th class="px-4 py-3 font-semibold text-neutral-500 text-right whitespace-nowrap">Zzgl. Lieferzeit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(zone, index) in zones" :key="index" class="border-b border-neutral-100 last:border-0">
                  <td class="px-4 py-3 align-top">
                    <span class="font-semibold text-neutral-800">{{ zone.title }}</span>
                    <span v-if="zone.countries" class="block text-xs text-neutral-500 mt-0.5">{{ zone.countries }}</span>
                    <span v-if="zone.note" class="block text-xs text-[#384d37] mt-0.5">{{ zone.note }}</span>
                  </td>
                  <td class="px-4 py-3 text-right font-semibold text-neutral-900 whitespace-nowrap align-top">{{ zone.cost }}</td>
                  <td class="px-4 py-3 text-right text-neutral-600 whitespace-nowrap align-top">{{ zone.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Lieferzeiten -->
      <section class="mb-10">
        <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4">Lieferzeiten</h2>
        <div class="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm text-sm text-neutral-600 leading-relaxed">
          <p>
            Bei Bestellungen mit mehreren Artikeln unterschiedlicher Lieferzeit erfolgt der Versand gesammelt in
            einer Sendung. Es gilt jeweils die längste angegebene Lieferzeit. Alle Angaben in Werktagen
            (Montag–Freitag, ausgenommen Feiertage).
          </p>
        </div>
      </section>

      <!-- Hinweise -->
      <section class="mb-10">
        <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4">Weitere Hinweise</h2>
        <ul class="space-y-3">
          <li v-for="(hint, index) in hints" :key="index" class="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed">
            <svg class="w-4 h-4 text-[#384d37] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            <span v-html="hint" />
          </li>
        </ul>
      </section>

      <!-- Kontakt -->
      <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-base font-bold text-neutral-900">Fragen zum Versand?</h2>
          <p class="mt-1 text-sm text-neutral-600">Unser Team berät Sie gerne zu Versand und Großbestellungen.</p>
        </div>
        <a
          href="tel:+4971594591920"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#384d37] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2c3e2b] transition-colors whitespace-nowrap"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
          +49 7159 4591920
        </a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

definePageMeta({
  pageType: 'static',
});

const { setPageMeta } = usePageMeta();
setPageMeta('Versandkosten', 'page');

const zones = [
  {
    title: 'Deutschland',
    countries: 'Festland',
    note: 'Inseln: 13,00 € netto',
    cost: '9,90 €',
    time: '1–3 Werktage',
  },
  {
    title: 'EU-Zone 1',
    countries: 'Österreich, Niederlande, Belgien, Luxemburg, Dänemark, Tschechien',
    cost: '14,90 €',
    time: '+1–2 Tage',
  },
  {
    title: 'EU-Zone 2',
    countries: 'Polen, Italien, Schweden, Slowakei, Slowenien, Ungarn, Frankreich',
    cost: '19,90 €',
    time: '+2–3 Tage',
  },
  {
    title: 'EU-Zone 3',
    countries: 'Finnland, Irland, Lettland, Litauen, Estland, Portugal, Spanien',
    cost: '29,50 €',
    time: '+3–4 Tage',
  },
  {
    title: 'EU-Zone 4',
    countries: 'Kroatien, Bulgarien, Rumänien',
    cost: '45,00 €',
    time: '+5–6 Tage',
  },
  {
    title: 'Griechenland',
    countries: 'Festland',
    cost: '65,00 €',
    time: '+6–9 Tage',
  },
];

const hints = [
  'Alle Preise verstehen sich <strong>netto</strong> zzgl. der gesetzlichen Mehrwertsteuer.',
  'Bei Bestellungen unter 60,00 € netto Warenwert erheben wir einen Mindermengenzuschlag von 7,50 € netto.',
  'Ersatzlieferungen für nicht verfügbare Artikel sind für Sie versandkostenfrei.',
  'Für palettierte Ware und Großmengen erstellen wir Ihnen gerne ein individuelles Speditionsangebot.',
];
</script>
