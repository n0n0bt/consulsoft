<script setup lang="ts">
const { t } = useI18n()

const points = ['quality', 'transparency', 'partner', 'iso']

const circles = [
  { key: 'agile', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { key: 'cloud', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { key: 'ai', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
]

const activeCircle = ref<string | null>(null)
</script>

<template>
  <section id="about" class="section-padding bg-dark-900 text-white relative overflow-hidden">
    <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold-500/[0.04] rounded-full blur-[120px]" />

    <div class="max-w-7xl mx-auto relative">
      <!-- Top: text + points row -->
      <div class="grid lg:grid-cols-2 gap-20 items-start mb-24">
        <!-- Left -->
        <div>
          <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-400 mb-5">
            <span class="w-8 h-px bg-gold-600" />
            {{ t('about.tag') }}
          </span>
          <h2 class="fade-up text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            {{ t('about.title') }}
          </h2>
          <p class="fade-up text-dark-300 text-lg leading-relaxed font-light">
            {{ t('about.description') }}
          </p>
        </div>

        <!-- Right - bullet points (aligned with heading top) -->
        <div class="lg:pt-10">
          <ul class="space-y-4">
            <li
              v-for="(point, i) in points"
              :key="point"
              class="fade-up flex items-center gap-3.5"
              :style="{ transitionDelay: `${i * 0.08}s` }"
            >
              <div class="w-7 h-7 bg-gold-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-[15px] text-dark-200 font-light">{{ t(`about.points.${point}`) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Photo strip -->
      <div class="fade-up grid grid-cols-2 gap-4 mb-20 max-w-3xl mx-auto">
        <div class="aspect-[3/4] rounded-2xl overflow-hidden">
          <img
            src="/team/team-naumche-joshevski.jpg"
            alt="Naumche Joshevski"
            class="w-full h-full object-cover object-top"
          />
        </div>
        <div class="aspect-[3/4] rounded-2xl overflow-hidden">
          <img
            src="/team/dimitar-manev.jpeg"
            alt="Dimitar Manev"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <!-- Interactive brand mark cards -->
      <div class="fade-up">
        <div
          class="grid grid-cols-2 lg:grid-cols-4 gap-6"
          @mouseleave="activeCircle = null"
        >
          <div
            v-for="(circle, i) in circles"
            :key="circle.key"
            class="relative"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <!-- Brand mark (default state) -->
            <div
              class="about-item aspect-square flex flex-col items-center justify-center cursor-default transition-all duration-500"
              :class="activeCircle === circle.key ? 'opacity-0 scale-90' : activeCircle ? 'opacity-40 scale-95' : 'opacity-100'"
              @mouseenter="activeCircle = circle.key"
            >
              <img src="/brand-mark.svg" alt="" class="w-16 md:w-20 brightness-0 invert opacity-30 mb-4" />
              <span class="text-sm md:text-base font-bold text-white text-center leading-tight whitespace-pre-line">
                {{ t(`about.circles.${circle.key}.label`) }}
              </span>
            </div>

            <!-- Expanded card (hover state) -->
            <div
              class="absolute inset-0 rounded-[2rem] bg-gold-400 p-6 md:p-8 flex flex-col justify-between transition-all duration-500"
              :class="activeCircle === circle.key ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'"
              @mouseenter="activeCircle = circle.key"
            >
              <p class="text-dark-900 text-[14px] md:text-[15px] leading-relaxed font-medium">
                {{ t(`about.circles.${circle.key}.description`) }}
              </p>
              <div class="flex items-end justify-between mt-4">
                <img src="/brand-mark.svg" alt="" class="w-10 opacity-15" />
                <span class="text-[11px] font-bold tracking-widest text-dark-900/50 whitespace-pre-line text-right">
                  {{ t(`about.circles.${circle.key}.label`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-item {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>
