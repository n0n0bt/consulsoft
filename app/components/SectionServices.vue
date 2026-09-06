<script setup lang="ts">
import type { Surface } from './SurfaceFrame.vue'

const { t } = useI18n()
const localePath = useLocalePath()

/**
 * Four services, four surfaces. The demo sits here rather than in the hero
 * because this is where it argues for something: the tabs and the cards below
 * are the same four things, so the picture and the copy explain each other.
 *
 * The tabs carry platform marks rather than words; the label still ships as the
 * accessible name, since an Apple silhouette alone tells a screen reader nothing.
 */
const surfaces: { id: Surface, label: string, fill: boolean, d: string[] }[] = [
  {
    id: 'web', label: 'Web', fill: false,
    d: [
      'M12 21a9 9 0 100-18 9 9 0 000 18z',
      'M3.6 9h16.8M3.6 15h16.8',
      'M12 3a13.5 13.5 0 013.6 9 13.5 13.5 0 01-3.6 9 13.5 13.5 0 01-3.6-9A13.5 13.5 0 0112 3z',
    ],
  },
  {
    id: 'macos', label: 'macOS', fill: true,
    d: [
      'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z',
      'M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701',
    ],
  },
  {
    id: 'windows', label: 'Windows', fill: true,
    d: ['M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801'],
  },
  {
    id: 'mobile', label: 'Mobil', fill: false,
    d: ['M7.5 2.5h9a2 2 0 012 2v15a2 2 0 01-2 2h-9a2 2 0 01-2-2v-15a2 2 0 012-2z', 'M10.5 18.5h3'],
  },
]

// The four cards, in the order the services are sold rather than demoed.
const services = [
  { key: 'web', slug: 'web-apps', tag: 'WEB', stack: ['vue', 'react', 'go', 'net-core', 'node'] },
  { key: 'desktop', slug: 'desktop-anwendungen', tag: 'DESKTOP', stack: ['swift', 'csharp', 'net-core', 'kotlin', 'electron'] },
  { key: 'mobile', slug: 'mobile-apps', tag: 'MOBIL', stack: ['swift', 'kotlin', 'react'] },
  { key: 'ai', slug: 'ki-automatisierung', tag: 'KI', stack: ['python', 'go', 'net-core'] },
] as const

const active = ref<Surface>('web')
const tabs = ref<HTMLButtonElement[]>([])

/**
 * The frame cycles on its own so the idea lands without a click, and stops the
 * moment someone takes over — an animation that keeps overriding the visitor's
 * choice is just noise.
 */
let timer: ReturnType<typeof setInterval> | undefined

function select(id: Surface, byUser = true) {
  active.value = id
  if (byUser) clearInterval(timer)
}

function onKey(e: KeyboardEvent, i: number) {
  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const next = (i + dir + surfaces.length) % surfaces.length
  select(surfaces[next]!.id)
  tabs.value[next]?.focus()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    const i = surfaces.findIndex(s => s.id === active.value)
    select(surfaces[(i + 1) % surfaces.length]!.id, false)
  }, 3800)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="leistungen" class="shell scroll-mt-24 py-24 sm:py-32">
    <div class="mx-auto max-w-2xl text-center">
      <p class="eyebrow reveal">{{ t('services.eyebrow') }}</p>
      <h2 class="reveal mt-4 text-display-lg font-semibold text-balance text-ink">{{ t('services.title') }}</h2>
      <p class="reveal mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
        {{ t('services.subtitle') }}
      </p>
    </div>

    <!-- The four surfaces, shown -->
    <div class="mt-14">
      <SurfaceFrame :surface="active" />

      <div
        role="tablist"
        :aria-label="t('services.surfaceLabel')"
        class="mx-auto mt-7 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border border-chrome-300/70 bg-white p-1 shadow-card"
      >
        <button
          v-for="(s, i) in surfaces"
          :key="s.id"
          ref="tabs"
          role="tab"
          type="button"
          :aria-selected="active === s.id"
          :aria-label="s.label"
          :title="s.label"
          :tabindex="active === s.id ? 0 : -1"
          class="grid size-11 shrink-0 place-items-center rounded-full transition duration-200 sm:size-12"
          :class="active === s.id ? 'bg-brass-500 text-white' : 'text-slate-400 hover:bg-paper hover:text-ink'"
          @click="select(s.id)"
          @keydown="onKey($event, i)"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
            <path
              v-for="(d, n) in s.d"
              :key="n"
              :d="d"
              :fill="s.fill ? 'currentColor' : 'none'"
              :stroke="s.fill ? 'none' : 'currentColor'"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- The four surfaces, explained -->
    <div class="mt-16 grid gap-px overflow-hidden rounded-panel border border-chrome-200 bg-chrome-200 sm:grid-cols-2">
      <NuxtLink
        v-for="(s, i) in services"
        :key="s.key"
        :to="localePath(`/leistungen/${s.slug}`)"
        class="reveal group block bg-white p-7 transition-colors duration-300 hover:bg-paper sm:p-9"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <p class="font-mono text-label uppercase text-brass-600">{{ s.tag }}</p>
        <h3 class="mt-5 text-display-sm font-semibold text-ink">{{ t(`services.items.${s.key}.title`) }}</h3>
        <p class="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-pretty text-slate-500">
          {{ t(`services.items.${s.key}.description`) }}
        </p>
        <div class="mt-6 flex items-end justify-between gap-4 border-t border-chrome-200 pt-5">
          <ul class="flex flex-wrap items-center gap-2.5">
            <li v-for="tech in s.stack" :key="tech">
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
          <span class="flex shrink-0 items-center gap-1.5 text-[0.875rem] font-medium text-ink">
            {{ t('services.more') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
