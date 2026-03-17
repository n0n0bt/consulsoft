<script setup lang="ts">
const { t } = useI18n()

const services = [
  { key: 'web', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
  { key: 'mobile', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { key: 'cloud', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { key: 'consulting', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { key: 'api', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { key: 'ai', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]
</script>

<template>
  <section id="services" class="section-padding bg-surface-50">
    <div class="max-w-7xl mx-auto">
      <div class="max-w-2xl mb-16">
        <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-5">
          <span class="w-8 h-px bg-gold-400" />
          {{ t('services.tag') }}
        </span>
        <h2 class="fade-up text-4xl md:text-5xl font-extrabold text-dark-900 tracking-tight mb-4">
          {{ t('services.title') }}
        </h2>
        <p class="fade-up text-lg text-dark-400 font-light leading-relaxed">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.key"
          class="fade-up service-card group relative overflow-hidden rounded-3xl p-8 cursor-default"
          :style="{ transitionDelay: `${i * 0.06}s` }"
        >
          <!-- Background that morphs on hover -->
          <div class="absolute inset-0 bg-white transition-all duration-700 ease-out group-hover:bg-dark-900 group-hover:scale-[1.01]" />

          <!-- Subtle radial glow on hover -->
          <div class="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold-400/0 group-hover:bg-gold-400/10 transition-all duration-700 blur-3xl" />

          <div class="relative z-10">
            <div
              class="inline-flex items-center justify-center mb-6 rounded-2xl bg-surface-100 group-hover:bg-white/10 transition-all duration-500"
              style="width: 48px; height: 48px;"
            >
              <svg class="text-dark-400 group-hover:text-gold-400 transition-colors duration-500" style="width: 22px; height: 22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.icon" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-dark-900 group-hover:text-white mb-2 tracking-tight transition-colors duration-500">
              {{ t(`services.items.${service.key}.title`) }}
            </h3>
            <p class="text-[15px] text-dark-400 group-hover:text-dark-300 leading-relaxed font-light transition-colors duration-500">
              {{ t(`services.items.${service.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
