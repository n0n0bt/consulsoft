<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section data-dock-stop="true" class="shell pb-16 pt-8 sm:pb-20">
    <div class="grid gap-4 lg:grid-cols-2">
      <!-- Brass card: the lower-commitment door -->
      <div class="reveal flex flex-col justify-between rounded-panel bg-brass-600 p-8 text-white sm:p-10">
        <div>
          <h2 class="text-display-md font-semibold text-balance">{{ t('cta.explore.title') }}</h2>
          <p class="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-white/85">
            {{ t('cta.explore.body') }}
          </p>
        </div>
        <NuxtLink
          :to="{ path: localePath('/anfrage'), query: { intent: 'explore' } }"
          class="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.9375rem] font-medium text-brass-700 transition duration-200 hover:bg-brass-50 active:scale-[0.98]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 2v3M16 2v3M3.5 9h17M4 6h16a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ t('cta.explore.button') }}
        </NuxtLink>
      </div>

      <!-- White card: the ready-to-go door -->
      <div class="reveal flex flex-col justify-between rounded-panel border border-chrome-200 bg-white p-8 sm:p-10">
        <div>
          <h2 class="text-display-md font-semibold text-balance text-ink">{{ t('cta.ready.title') }}</h2>
          <p class="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
            {{ t('cta.ready.body') }}
          </p>
        </div>
        <NuxtLink :to="{ path: localePath('/anfrage'), query: { intent: 'ready' } }" class="btn-ink mt-10 w-fit">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 015.5 4h2.2a1 1 0 01.96.72l.9 3a1 1 0 01-.3 1.05L7.9 10a12 12 0 006.1 6.1l1.23-1.36a1 1 0 011.05-.3l3 .9a1 1 0 01.72.96v2.2a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 014 5.5z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ t('cta.ready.button') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
