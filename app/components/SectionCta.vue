<script setup lang="ts">
const { t } = useI18n()

const ctaRef = ref<HTMLElement | null>(null)
const markX = ref(0)
const markY = ref(0)
const isHovering = ref(false)

function onMouseMove(e: MouseEvent) {
  if (!ctaRef.value) return
  const rect = ctaRef.value.getBoundingClientRect()
  markX.value = e.clientX - rect.left - 150
  markY.value = e.clientY - rect.top - 150
  isHovering.value = true
}

function onMouseLeave() {
  isHovering.value = false
}
</script>

<template>
  <section id="contact" class="section-padding bg-white">
    <div class="max-w-7xl mx-auto">
      <div
        ref="ctaRef"
        class="fade-up bg-dark-900 rounded-4xl p-12 md:p-20 text-center relative overflow-hidden cursor-default"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <div class="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-gold-500/[0.06] rounded-full blur-[100px]" />
        <div class="absolute bottom-[-20%] left-[-5%] w-[300px] h-[300px] bg-gold-400/[0.04] rounded-full blur-[80px]" />
        <!-- Brand mark - follows cursor -->
        <img
          src="/brand-mark.svg"
          alt=""
          class="absolute w-[300px] h-[300px] pointer-events-none select-none brightness-0 invert transition-opacity duration-500"
          :class="isHovering ? 'opacity-40' : 'opacity-0'"
          :style="{ top: `${markY}px`, left: `${markX}px`, transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease' }"
        />

        <div class="relative">
          <span class="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-400 mb-6">
            {{ t('cta.tag') }}
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {{ t('cta.title') }}
          </h2>
          <p class="text-dark-300 text-lg mb-10 max-w-lg mx-auto font-light leading-relaxed">
            {{ t('cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              :href="`mailto:${t('cta.email')}`"
              class="group inline-flex items-center gap-2.5 bg-white text-dark-900 font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-gold-50 transition-all hover:shadow-xl active:scale-[0.97]"
            >
              {{ t('cta.button') }}
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <span class="text-dark-400 text-[14px]">
              {{ t('cta.email') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
