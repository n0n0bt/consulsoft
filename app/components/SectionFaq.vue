<script setup lang="ts">
const { t } = useI18n()

/**
 * Native <details>, not a JS accordion: it is keyboard operable, findable by
 * in-page search, and works before hydration. The only scripting is the marker
 * rotation, which CSS handles on its own.
 */
const items = ['cost', 'time', 'code', 'existing', 'data', 'remote'] as const
</script>

<template>
  <section class="bg-white">
    <div class="shell py-24 sm:py-32">
      <div class="mx-auto max-w-3xl">
        <h2 class="reveal text-center text-display-lg font-semibold text-balance text-ink">{{ t('faq.title') }}</h2>

        <div class="mt-12 border-t border-chrome-200">
          <details
            v-for="(q, i) in items"
            :key="q"
            class="faq reveal group border-b border-chrome-200"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            <summary
              class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium text-pretty text-ink transition hover:text-brass-600"
            >
              {{ t(`faq.items.${q}.q`) }}
              <span class="marker grid size-6 shrink-0 place-items-center text-slate-400 transition-transform duration-300" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </summary>
            <p class="max-w-prose pb-6 pr-10 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
              {{ t(`faq.items.${q}.a`) }}
            </p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq summary::-webkit-details-marker {
  display: none;
}

.faq[open] .marker {
  transform: rotate(180deg);
}
</style>
