<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="py-28 bg-surface-50 relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-200/15 rounded-full blur-[120px]" />

    <div class="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
      <div class="fade-up">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-10">
          <img src="/brand-mark.svg" alt="Consulsoft" class="w-14 h-14 opacity-20" />
        </div>
        <blockquote class="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-dark-900 leading-snug mb-10 tracking-tight">
          {{ t('testimonial.quote') }}
        </blockquote>
        <div class="flex items-center justify-center gap-4">
          <div class="flex -space-x-3">
            <img
              src="/team/team-naumche-joshevski.jpg"
              alt="Naumche Joshevski"
              class="w-11 h-11 rounded-full object-cover border-2 border-white"
            />
            <img
              src="/team/dimitar.jpg"
              alt="Dimitar Manev"
              class="w-11 h-11 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div class="text-left">
            <div class="text-[14px] text-dark-900 font-semibold">{{ t('testimonial.author') }}</div>
            <div class="text-[13px] text-dark-400">{{ t('testimonial.role') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
