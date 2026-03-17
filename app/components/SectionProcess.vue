<script setup lang="ts">
const { t } = useI18n()

const steps = [
  { key: 'discover', num: '1' },
  { key: 'design', num: '2' },
  { key: 'develop', num: '3' },
  { key: 'deliver', num: '4' },
]
</script>

<template>
  <section id="process" class="section-padding bg-white">
    <div class="max-w-5xl mx-auto">
      <div class="mb-20 max-w-2xl">
        <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-5">
          <span class="w-8 h-px bg-gold-400" />
          {{ t('process.tag') }}
        </span>
        <h2 class="fade-up text-4xl md:text-5xl font-extrabold text-dark-900 tracking-tight mb-4">
          {{ t('process.title') }}
        </h2>
        <p class="fade-up text-lg text-dark-400 font-light leading-relaxed">
          {{ t('process.subtitle') }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <div
          v-for="(step, i) in steps"
          :key="step.key"
          class="fade-up relative grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-8 md:gap-14"
          :class="i < steps.length - 1 ? 'pb-20 md:pb-28' : ''"
          :style="{ transitionDelay: `${i * 0.12}s` }"
        >
          <!-- Left: brand mark + connector -->
          <div class="relative flex flex-col items-center">
            <div class="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center shrink-0 relative z-10">
              <div class="process-mark-bg absolute inset-0" />
              <span class="relative text-5xl md:text-6xl font-extrabold text-dark-900/80">{{ step.num }}</span>
            </div>
            <!-- Vertical connector line -->
            <div
              v-if="i < steps.length - 1"
              class="w-px flex-1 bg-dark-200/50 mt-0"
            />
          </div>

          <!-- Right: content -->
          <div class="pt-6 md:pt-10">
            <h3 class="text-2xl md:text-3xl font-extrabold text-dark-900 tracking-tight mb-4">
              {{ t(`process.steps.${step.key}.title`) }}
            </h3>
            <p class="text-[15px] md:text-base text-dark-400 leading-relaxed font-light max-w-lg">
              {{ t(`process.steps.${step.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-mark-bg {
  background-color: #F5DD82;
  -webkit-mask-image: url('/brand-mark.svg');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-image: url('/brand-mark.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>

