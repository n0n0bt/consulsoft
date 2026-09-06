<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: () => t('thankYouPage.title') })
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <section class="px-2 pt-2 sm:px-3 sm:pt-3">
    <div class="field-light relative grid min-h-[78vh] place-items-center overflow-hidden rounded-stage">
      <div class="field-grid absolute inset-0" aria-hidden="true" />

      <div class="shell relative py-24 text-center">
        <span class="mx-auto grid size-14 place-items-center rounded-full bg-brass-500 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12.5l5.5 5.5L20 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>

        <p class="eyebrow mt-8">{{ t('thankYouPage.tag') }}</p>
        <h1 class="mx-auto mt-4 max-w-2xl text-display-lg font-semibold text-balance text-ink">
          {{ t('thankYouPage.title') }}
        </h1>
        <p class="mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
          {{ t('thankYouPage.message') }}
        </p>
        <p class="mx-auto mt-3 max-w-prose text-[0.9375rem] text-slate-400">
          {{ t('thankYouPage.responseInfo') }}
        </p>

        <div class="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <NuxtLink :to="localePath('/')" class="btn-ink">{{ t('thankYouPage.backHome') }}</NuxtLink>
          <NuxtLink :to="localePath('/kontakt')" class="btn-quiet">{{ t('thankYouPage.sendAnother') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
