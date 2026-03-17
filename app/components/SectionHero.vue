<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden">
    <!-- Subtle background -->
    <div class="absolute inset-0 bg-surface-50" />
    <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold-200/20 rounded-full blur-[120px]" />
    <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-100/30 rounded-full blur-[100px]" />


    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <div class="grid lg:grid-cols-[1fr,auto] gap-20 items-center">
        <!-- Left content -->
        <div class="max-w-xl">
          <div class="fade-up">
            <span class="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-8 px-4 py-2 bg-gold-100/50 rounded-full border border-gold-200/40">
              <span class="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              {{ t('hero.tag') }}
            </span>
          </div>

          <h1 class="fade-up text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-dark-900 leading-[1.05] tracking-tight mb-6" style="transition-delay: 0.1s">
            {{ t('hero.title') }}
          </h1>

          <p class="fade-up text-lg text-dark-400 max-w-md mb-10 leading-relaxed font-light" style="transition-delay: 0.2s">
            {{ t('hero.subtitle') }}
          </p>

          <div class="fade-up flex flex-wrap items-center gap-4" style="transition-delay: 0.3s">
            <a
              href="#contact"
              class="group inline-flex items-center gap-2.5 bg-dark-900 text-white font-semibold text-[15px] px-7 py-4 rounded-full hover:bg-dark-800 transition-all hover:shadow-xl hover:shadow-dark-900/15 active:scale-[0.97]"
            >
              {{ t('hero.cta') }}
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#services"
              class="inline-flex items-center gap-2 text-dark-600 font-medium text-[15px] px-6 py-4 rounded-full border border-dark-200 hover:border-dark-300 hover:bg-dark-50 transition-all"
            >
              {{ t('hero.secondary') }}
            </a>
          </div>
        </div>

        <!-- Right - Bento grid -->
        <div class="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 w-[420px] h-[480px]">
          <!-- Stats card - tall left (from top) -->
          <div class="bento-card bento-from-top col-span-1 row-span-2 bg-white rounded-3xl p-6 border border-dark-100/60 flex flex-col justify-between" style="animation-delay: 0.3s">
            <div class="w-11 h-11 bg-gold-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-dark-900 leading-none">600+</div>
              <div class="text-xs text-dark-400 mt-1">{{ t('about.stats.projects') }}</div>
            </div>
          </div>

          <!-- Dark enterprise card - wide top (from right) -->
          <div class="bento-card bento-from-right col-span-2 row-span-1 bg-dark-900 rounded-3xl p-6 flex items-center gap-5" style="animation-delay: 0.5s">
            <div class="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div class="text-white font-bold text-sm">Enterprise Software</div>
              <div class="text-white/40 text-xs mt-0.5">Scalable & Secure</div>
            </div>
          </div>

          <!-- Team photo card (static, hover slides image) -->
          <div class="group col-span-1 row-span-2 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=600&fit=crop&crop=faces"
              alt="Team collaboration"
              class="w-full h-[130%] object-cover transition-transform duration-[3s] ease-out group-hover:-translate-y-[23%]"
            />
          </div>

          <!-- Gold experience card (from right, later) -->
          <div class="bento-card bento-from-right col-span-1 row-span-1 bg-gradient-to-br from-gold-200 to-gold-300/80 rounded-3xl p-6 flex flex-col justify-end" style="animation-delay: 0.8s">
            <div class="text-2xl font-extrabold text-dark-900 leading-none">15+</div>
            <div class="text-[11px] text-dark-700 mt-1">{{ t('about.stats.experience') }}</div>
          </div>

          <!-- Bottom wide bar - satisfaction (from left) -->
          <div class="bento-card bento-from-left col-span-2 row-span-1 bg-white rounded-3xl p-5 border border-dark-100/60 flex items-center gap-3 overflow-hidden" style="animation-delay: 1s">
            <div class="flex -space-x-2 shrink-0">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" alt="Client" class="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" alt="Client" class="w-8 h-8 rounded-full border-2 border-white object-cover" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-dark-900">98%</span>
                <div class="flex gap-0.5 shrink-0">
                  <svg v-for="n in 5" :key="n" class="w-3 h-3 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div class="text-[10px] text-dark-400 truncate">{{ t('about.stats.satisfaction') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-card {
  opacity: 0;
}

.bento-from-top {
  animation: slideFromTop 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.bento-from-right {
  animation: slideFromRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.bento-from-left {
  animation: slideFromLeft 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideFromTop {
  from { opacity: 0; transform: translateY(-60px) scale(0.92); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(60px) scale(0.92); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-60px) scale(0.92); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
</style>
