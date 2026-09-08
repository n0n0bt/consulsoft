<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

useScrollReveal()

const slug = route.params.slug as string

const projectData: Record<string, {
  tech: string[]
  surfaces: string[]
  hero: string
  heroSize: [number, number]
  url: string
  own?: boolean
  screenshots: { src: string, width: number, height: number, alt: string }[]
}> = {
  immoreels: {
    tech: ['go', 'postgresql', 'vue', 'typescript'],
    surfaces: ['Web', 'Mobil'],
    hero: '/project-immoreels/Xnapper-2026-03-31-13.21.16.webp',
    heroSize: [1600, 938],
    url: 'https://immoreels24.de',
    screenshots: [
      { src: '/project-immoreels/Xnapper-2026-03-31-13.22.21.webp', width: 1600, height: 940, alt: 'Video-Reels Karussell – Dark Mode' },
      { src: '/project-immoreels/Xnapper-2026-03-31-13.23.13.webp', width: 1600, height: 940, alt: 'Immobilien-Reel Detailansicht' },
      { src: '/project-immoreels/Xnapper-2026-03-31-13.22.45.webp', width: 1600, height: 939, alt: 'Login – Dark Mode' },
      { src: '/project-immoreels/Xnapper-2026-03-31-13.23.40.webp', width: 1600, height: 938, alt: 'Startseite – Light Mode' },
      { src: '/project-immoreels/Xnapper-2026-03-31-13.24.08.webp', width: 1600, height: 937, alt: 'Video-Reels Karussell – Light Mode' },
      { src: '/project-immoreels/Xnapper-2026-03-31-13.24.20.webp', width: 1600, height: 936, alt: 'Login – Light Mode' },
    ],
  },
  fitbody: {
    tech: ['go', 'postgresql', 'vue', 'typescript'],
    surfaces: ['Web', 'Mobil'],
    hero: '/project-365fitbody/landing-hero.webp',
    heroSize: [1600, 1000],
    url: 'https://365fitbody.com',
    screenshots: [
      { src: '/project-365fitbody/workflow.webp', width: 1600, height: 944, alt: 'Drei Schritte: Bibliothek anlegen, Vorlagen gestalten, täglich trainieren' },
      { src: '/project-365fitbody/features.webp', width: 1600, height: 1000, alt: 'Funktionsübersicht der App' },
      { src: '/project-365fitbody/pricing.webp', width: 1600, height: 944, alt: 'Monatsabo mit Preis und Leistungen' },
      { src: '/project-365fitbody/mobile-hero.webp', width: 780, height: 1688, alt: 'Startseite auf dem Smartphone' },
      { src: '/project-365fitbody/mobile-workflow.webp', width: 780, height: 1688, alt: 'Trainingsablauf auf dem Smartphone' },
    ],
  },
  infobalkan: {
    tech: ['go', 'postgresql', 'vue', 'typescript'],
    surfaces: ['Web'],
    hero: '/project-infobalkan/home-map.webp',
    heroSize: [1600, 1000],
    url: 'https://infobalkan.de',
    own: true,
    screenshots: [
      { src: '/project-infobalkan/directory.webp', width: 1600, height: 1000, alt: 'Verzeichnis mit Kategorien, Städten und Verifizierungsfilter' },
      { src: '/project-infobalkan/business-detail.webp', width: 1600, height: 1000, alt: 'Detailseite eines Unternehmens mit Kontakt' },
      { src: '/project-infobalkan/news.webp', width: 1600, height: 1000, alt: 'Redaktionsbereich mit Nachrichten' },
      { src: '/project-infobalkan/mobile-home.webp', width: 780, height: 1688, alt: 'Startseite mit Kartensuche auf dem Smartphone' },
      { src: '/project-infobalkan/mobile-directory.webp', width: 780, height: 1688, alt: 'Verzeichnis auf dem Smartphone' },
    ],
  },
}

const project = projectData[slug]
if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' })

const otherProjects = Object.keys(projectData).filter(k => k !== slug)

useHead({ title: () => t(`projects.items.${slug}.title`) })
useSeoMeta({
  description: () => t(`projects.items.${slug}.short`),
  ogTitle: () => t(`projects.items.${slug}.title`),
  ogDescription: () => t(`projects.items.${slug}.short`),
  ogImage: `https://consulsoft.de${project.hero}`,
  twitterImage: `https://consulsoft.de${project.hero}`,
})

const facts = ['challenge', 'solution', 'results'] as const
</script>

<template>
  <div>
    <!-- Masthead -->
    <section class="px-2 pt-2 sm:px-3 sm:pt-3">
      <div class="field-light relative overflow-hidden rounded-stage">
        <div class="field-grid absolute inset-0" aria-hidden="true" />
        <div class="shell relative pb-14 pt-28 sm:pb-16 sm:pt-32">
          <NuxtLink :to="`${localePath('/')}#arbeiten`" class="-mx-2 inline-flex items-center gap-2 rounded px-2 py-2.5 font-mono text-label uppercase text-slate-400 transition hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H6M13 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {{ t('projects.backToHome') }}
          </NuxtLink>

          <div class="mt-8 flex flex-wrap items-center gap-2">
            <span
              v-for="s in project.surfaces"
              :key="s"
              class="rounded-full bg-white/70 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-brass-600"
            >{{ s }}</span>
            <span
              v-if="project.own"
              class="rounded-full border border-chrome-300 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate-500"
            >{{ t('work.ownProduct') }}</span>
          </div>

          <h1 class="mt-4 max-w-3xl text-display-lg font-semibold text-balance text-ink">
            {{ t(`projects.items.${slug}.title`) }}
          </h1>
          <p class="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
            {{ t(`projects.items.${slug}.short`) }}
          </p>

          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="btn-ink mt-8">
            {{ project.url.replace('https://', '') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Hero shot -->
    <section class="shell pt-12 sm:pt-16">
      <div class="reveal overflow-hidden rounded-panel border border-chrome-200 bg-white">
        <img :src="project.hero" alt="" :width="project.heroSize[0]" :height="project.heroSize[1]" class="w-full" fetchpriority="high" decoding="async" />
      </div>
    </section>

    <!-- Narrative + stack -->
    <section class="shell py-20 sm:py-24">
      <div class="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div class="reveal max-w-prose space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
          <h2 class="text-display-sm font-semibold text-ink">{{ t(`projects.items.${slug}.overviewTitle`) }}</h2>
          <p>{{ t(`projects.items.${slug}.description1`) }}</p>
          <p>{{ t(`projects.items.${slug}.description2`) }}</p>
        </div>

        <aside class="reveal lg:border-l lg:border-chrome-200 lg:pl-12">
          <p class="eyebrow">Stack</p>
          <ul class="mt-5 space-y-3.5">
            <li v-for="tech in project.tech" :key="tech" class="flex items-center gap-3">
              <img :src="techSrc(tech)" :alt="TECH[tech]" width="192" height="192" loading="lazy" decoding="async" class="size-7 object-contain" />
              <span class="text-[0.9375rem] text-ink">{{ TECH[tech] }}</span>
            </li>
          </ul>
        </aside>
      </div>

      <!-- Challenge / solution / results, as a typed sequence -->
      <dl class="mt-16 grid gap-px overflow-hidden rounded-panel border border-chrome-200 bg-chrome-200 sm:grid-cols-3">
        <div v-for="f in facts" :key="f" class="reveal bg-white p-7">
          <dt class="font-mono text-label uppercase text-brass-600">{{ t(`projects.${f}`) }}</dt>
          <dd class="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
            {{ t(`projects.items.${slug}.${f}`) }}
          </dd>
        </div>
      </dl>
    </section>

    <!-- Screens -->
    <section class="shell pb-20 sm:pb-24">
      <h2 class="reveal text-display-sm font-semibold text-ink">{{ t('projects.screenshots') }}</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <figure
          v-for="(shot, i) in project.screenshots"
          :key="shot.src"
          class="reveal overflow-hidden rounded-card border border-chrome-200 bg-white"
          :class="i === 0 && 'sm:col-span-2'"
          :style="{ transitionDelay: `${i * 50}ms` }"
        >
          <img :src="shot.src" :alt="shot.alt" :width="shot.width" :height="shot.height" loading="lazy" decoding="async" class="w-full" />
        </figure>
      </div>
    </section>

    <!-- Other work -->
    <section v-if="otherProjects.length" class="shell pb-20 sm:pb-24">
      <h2 class="reveal text-display-sm font-semibold text-ink">{{ t('projects.otherProjects') }}</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="key in otherProjects"
          :key="key"
          :to="localePath(`/projects/${key}`)"
          class="reveal group overflow-hidden rounded-panel border border-chrome-200 bg-white transition hover:border-chrome-400 hover:shadow-card"
        >
          <div class="aspect-[16/10] overflow-hidden bg-paper">
            <img :src="projectData[key]!.hero" alt="" loading="lazy" decoding="async" class="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div class="p-6">
            <h3 class="text-[1.1875rem] font-semibold tracking-tight text-ink">{{ t(`projects.items.${key}.title`) }}</h3>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">{{ t(`projects.items.${key}.short`) }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <SectionCta />
  </div>
</template>
