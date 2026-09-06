<script setup lang="ts">
const { t } = useI18n()

/**
 * Numbered because this genuinely is a sequence — step three cannot happen
 * before step two. The mono numerals carry that ordering; without a real order
 * they would just be decoration.
 */
const steps = ['talk', 'scope', 'build', 'handover'] as const
</script>

<template>
  <section id="prozess" class="shell scroll-mt-24 py-24 sm:py-32">
    <div class="max-w-2xl">
      <p class="eyebrow reveal">{{ t('process.eyebrow') }}</p>
      <h2 class="reveal mt-4 text-display-lg font-semibold text-balance text-ink">{{ t('process.title') }}</h2>
      <p class="reveal mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
        {{ t('process.subtitle') }}
      </p>
    </div>

    <ol class="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(s, i) in steps"
        :key="s"
        class="reveal border-t-2 border-ink pt-5"
        :style="{ transitionDelay: `${i * 70}ms` }"
      >
        <span class="font-mono text-label uppercase text-brass-600">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="mt-4 text-[1.1875rem] font-semibold tracking-tight text-ink">{{ t(`process.steps.${s}.title`) }}</h3>
        <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">{{ t(`process.steps.${s}.description`) }}</p>
      </li>
    </ol>
  </section>
</template>
