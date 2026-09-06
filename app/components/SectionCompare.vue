<script setup lang="ts">
const { t } = useI18n()

const rows = ['handoff', 'scope', 'surface', 'ai', 'lockin'] as const
</script>

<template>
  <section class="bg-white">
    <div class="shell py-24 sm:py-32">
      <div class="max-w-2xl">
        <p class="eyebrow reveal">{{ t('compare.eyebrow') }}</p>
        <h2 class="reveal mt-4 text-display-lg font-semibold text-balance text-ink">{{ t('compare.title') }}</h2>
        <p class="reveal mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
          {{ t('compare.subtitle') }}
        </p>
      </div>

      <div class="mt-14">
        <!-- Column heads: only meaningful from two columns up -->
        <div class="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 pb-4 sm:grid">
          <p class="font-mono text-label uppercase text-slate-400">{{ t('compare.headLeft') }}</p>
          <span class="w-5" />
          <p class="font-mono text-label uppercase text-brass-600">{{ t('compare.headRight') }}</p>
        </div>

        <dl class="border-t border-chrome-200">
          <div
            v-for="(r, i) in rows"
            :key="r"
            class="reveal grid items-center gap-3 border-b border-chrome-200 py-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
            :style="{ transitionDelay: `${i * 50}ms` }"
          >
            <dt class="text-[1.0625rem] leading-snug text-pretty text-slate-400 line-through decoration-chrome-400 decoration-1">
              {{ t(`compare.rows.${r}.problem`) }}
            </dt>

            <span class="hidden w-5 shrink-0 text-brass-500 sm:block" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>

            <dd class="text-[1.0625rem] font-medium leading-snug text-pretty text-ink">
              {{ t(`compare.rows.${r}.answer`) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
