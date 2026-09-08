<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const projects = [
  {
    key: 'immoreels',
    image: '/project-immoreels/Xnapper-2026-03-31-13.21.16.webp',
    surfaces: ['Web', 'Mobil'],
    stack: ['go', 'postgresql', 'vue', 'typescript'],
    own: false,
  },
  {
    key: 'fitbody',
    image: '/project-365fitbody/landing-hero.webp',
    surfaces: ['Web', 'Mobil'],
    stack: ['go', 'postgresql', 'vue', 'typescript'],
    own: false,
  },
  // Built and operated by us: labelled as such so the grid stays honest.
  {
    key: 'infobalkan',
    image: '/project-infobalkan/home-map.webp',
    surfaces: ['Web'],
    stack: ['go', 'postgresql', 'vue', 'typescript'],
    own: true,
  },
]
</script>

<template>
  <section id="arbeiten" class="shell scroll-mt-24 py-24 sm:py-32">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div class="max-w-2xl">
        <p class="eyebrow reveal">{{ t('work.eyebrow') }}</p>
        <h2 class="reveal mt-4 text-display-lg font-semibold text-balance text-ink">{{ t('work.title') }}</h2>
      </div>
      <p class="reveal max-w-sm text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
        {{ t('work.subtitle') }}
      </p>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <NuxtLink
        v-for="p in projects"
        :key="p.key"
        :to="localePath(`/projects/${p.key}`)"
        class="reveal group block overflow-hidden rounded-panel border border-chrome-200 bg-white transition duration-300 hover:border-chrome-400 hover:shadow-card"
      >
        <div class="aspect-[16/10] overflow-hidden bg-paper">
          <img
            :src="p.image"
            :alt="t(`work.items.${p.key}.title`)"
            loading="lazy"
            decoding="async"
            class="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div class="p-7">
          <div class="flex flex-wrap items-center gap-2">
            <span
              v-for="s in p.surfaces"
              :key="s"
              class="rounded-full bg-brass-50 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-brass-600"
            >{{ s }}</span>
            <span
              v-if="p.own"
              class="rounded-full border border-chrome-300 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate-500"
            >{{ t('work.ownProduct') }}</span>
          </div>

          <h3 class="mt-4 text-display-sm font-semibold text-ink">{{ t(`work.items.${p.key}.title`) }}</h3>
          <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
            {{ t(`work.items.${p.key}.summary`) }}
          </p>

          <div class="mt-6 flex items-center justify-between border-t border-chrome-200 pt-5">
            <ul class="flex flex-wrap items-center gap-2.5">
              <li v-for="tech in p.stack" :key="tech">
                <img
                  :src="techSrc(tech)"
                  :alt="TECH[tech]"
                  :title="TECH[tech]"
                  width="192"
                  height="192"
                  loading="lazy"
                  decoding="async"
                  class="size-7 object-contain"
                />
              </li>
            </ul>
            <span class="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
              {{ t('work.view') }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </div>
        </div>
      </NuxtLink>

      <!-- Honest placeholder rather than invented case studies -->
      <div class="reveal grid place-items-center self-start rounded-panel border border-dashed border-chrome-300 p-10 py-20 text-center">
        <div class="max-w-xs">
          <p class="font-mono text-label uppercase text-slate-400">{{ t('work.next.eyebrow') }}</p>
          <p class="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-slate-500">{{ t('work.next.body') }}</p>
          <NuxtLink :to="localePath('/anfrage')" class="btn-quiet mt-6">{{ t('work.next.cta') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
