<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useScrollReveal()

useHead({ title: t('thankYouPage.title') })
useSeoMeta({
  robots: 'noindex, follow',
})
</script>

<template>
  <div>
    <section class="relative min-h-[80vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 bg-surface-50" />
      <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold-200/20 rounded-full blur-[120px]" />
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gold-300/10 rounded-full blur-[100px]" />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <!-- Animated checkmark -->
        <div class="fade-up mx-auto mb-8 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-6" style="transition-delay: 0.05s">
          <span class="w-8 h-px bg-gold-600" />
          {{ t('thankYouPage.tag') }}
          <span class="w-8 h-px bg-gold-600" />
        </span>

        <h1 class="fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-900 tracking-tight leading-[1.1] mb-6" style="transition-delay: 0.1s">
          {{ t('thankYouPage.title') }}
        </h1>

        <p class="fade-up text-lg text-dark-400 leading-relaxed font-light max-w-lg mx-auto mb-4" style="transition-delay: 0.15s">
          {{ t('thankYouPage.message') }}
        </p>

        <p class="fade-up text-[15px] text-dark-300 font-light max-w-md mx-auto mb-10" style="transition-delay: 0.2s">
          {{ t('thankYouPage.responseInfo') }}
        </p>

        <div class="fade-up flex flex-col sm:flex-row items-center justify-center gap-4" style="transition-delay: 0.25s">
          <NuxtLink
            :to="localePath('/')"
            class="group inline-flex items-center gap-2.5 bg-dark-900 text-white font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-dark-800 transition-all hover:shadow-xl hover:shadow-dark-900/15 active:scale-[0.97]"
          >
            {{ t('thankYouPage.backHome') }}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="localePath('/kontakt')"
            class="text-[14px] font-semibold text-dark-400 hover:text-dark-900 transition-colors"
          >
            {{ t('thankYouPage.sendAnother') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
