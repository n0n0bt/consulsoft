<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

/**
 * Placed immediately after the comparison table, which claims you speak to the
 * people writing the code. Showing them here pays that claim off rather than
 * leaving it as an assertion.
 */
const founders = [
  { key: 'naumche', image: '/team/team-naumche-joshevski.webp' },
  { key: 'dimitar', image: '/team/dimitar-manev.webp' },
]
</script>

<template>
  <section id="team" class="shell scroll-mt-24 py-24 sm:py-32">
    <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <div class="lg:pt-4">
        <p class="eyebrow reveal">{{ t('founders.eyebrow') }}</p>
        <h2 class="reveal mt-4 text-display-lg font-semibold text-balance text-ink">{{ t('founders.title') }}</h2>
        <p class="reveal mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
          {{ t('founders.subtitle') }}
        </p>
        <NuxtLink :to="localePath('/team')" class="reveal btn-quiet mt-7">
          {{ t('founders.cta') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </NuxtLink>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <article
          v-for="(f, i) in founders"
          :key="f.key"
          class="reveal"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <div class="aspect-[4/5] overflow-hidden rounded-panel bg-paper-sunk">
            <img
              :src="f.image"
              :alt="t(`teamPage.members.${f.key}.name`)"
              width="900"
              height="1125"
              loading="lazy"
              decoding="async"
              class="size-full object-cover object-top"
            />
          </div>
          <h3 class="mt-5 text-[1.1875rem] font-semibold tracking-tight text-ink">
            {{ t(`teamPage.members.${f.key}.name`) }}
          </h3>
          <p class="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brass-600">
            {{ t('founders.role') }}
          </p>
          <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
            {{ t(`founders.members.${f.key}.focus`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
