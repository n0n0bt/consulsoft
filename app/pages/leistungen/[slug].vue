<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

useScrollReveal()

/**
 * One template, four services. Each page targets a distinct search intent
 * ("Web-App entwickeln lassen", "Desktop-Software für Windows", …) and carries
 * its own copy, FAQ and structured data — thin duplicated pages rank for
 * nothing, so every section here is written per service.
 */
const SERVICES: Record<string, { key: string, stack: { name: string, src: string }[] }> = {
  'web-apps': {
    key: 'web',
    stack: [
      { name: 'Vue.js', src: '/languages/vue.webp' },
      { name: 'React', src: '/languages/react.webp' },
      { name: 'Go', src: '/languages/go.webp' },
      { name: '.NET', src: '/languages/net-core.webp' },
      { name: 'Node.js', src: '/languages/node.webp' },
    ],
  },
  'desktop-anwendungen': {
    key: 'desktop',
    stack: [
      { name: 'Swift', src: '/languages/swift.webp' },
      { name: 'C#', src: '/languages/csharp.webp' },
      { name: '.NET', src: '/languages/net-core.webp' },
      { name: 'Kotlin', src: '/languages/kotlin.webp' },
      { name: 'Electron', src: '/languages/electron.webp' },
      { name: 'Tauri', src: '/languages/tauri.webp' },
    ],
  },
  'mobile-apps': {
    key: 'mobile',
    stack: [
      { name: 'Swift', src: '/languages/swift.webp' },
      { name: 'Kotlin', src: '/languages/kotlin.webp' },
      { name: 'React Native', src: '/languages/react.webp' },
    ],
  },
  'ki-automatisierung': {
    key: 'ai',
    stack: [
      { name: 'Python', src: '/languages/python.webp' },
      { name: 'Go', src: '/languages/go.webp' },
      { name: '.NET', src: '/languages/net-core.webp' },
    ],
  },
}

const slug = computed(() => route.params.slug as string)
const service = computed(() => SERVICES[slug.value])
if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Service not found' })

const k = computed(() => service.value!.key)
const p = (field: string) => t(`servicePages.${k.value}.${field}`)

const UC = ['uc1', 'uc2', 'uc3', 'uc4']
const AP = ['ap1', 'ap2', 'ap3']
const FQ = ['q1', 'q2', 'q3', 'q4']
const PT = ['p1', 'p2', 'p3']

const faqPairs = computed(() => FQ.map(id => ({ q: p(`faq.${id}.q`), a: p(`faq.${id}.a`) })))

const others = computed(() => Object.entries(SERVICES).filter(([s]) => s !== slug.value))

const url = computed(() => `https://consulsoft.de${localePath(`/leistungen/${slug.value}`)}`)

useSeoMeta({
  title: () => p('seoTitle'),
  description: () => p('seoDescription'),
  ogTitle: () => p('seoTitle'),
  ogDescription: () => p('seoDescription'),
  ogType: 'website',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: url.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            'name': p('h1'),
            'description': p('seoDescription'),
            'serviceType': p('h1'),
            'url': url.value,
            'areaServed': { '@type': 'Country', 'name': 'Deutschland' },
            'availableLanguage': ['de', 'en'],
            'provider': {
              '@type': 'Organization',
              'name': 'Consulsoft UG (haftungsbeschränkt)',
              'url': 'https://consulsoft.de',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Nailaer Str. 39',
                'postalCode': '95119',
                'addressLocality': 'Naila',
                'addressCountry': 'DE',
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': t('nav.services'), 'item': `https://consulsoft.de${localePath('/')}#leistungen` },
              { '@type': 'ListItem', 'position': 2, 'name': p('h1'), 'item': url.value },
            ],
          },
          {
            '@type': 'FAQPage',
            'mainEntity': faqPairs.value.map(f => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
            })),
          },
        ],
      }),
    },
  ],
  htmlAttrs: { lang: locale.value },
}))
</script>

<template>
  <div>
    <!-- Masthead -->
    <section class="px-2 pt-2 sm:px-3 sm:pt-3">
      <div class="field-light relative overflow-hidden rounded-stage">
        <div class="field-grid absolute inset-0" aria-hidden="true" />
        <div class="shell relative pb-16 pt-28 sm:pb-20 sm:pt-32">
          <nav class="flex items-center gap-2 font-mono text-label uppercase text-slate-400" aria-label="Breadcrumb">
            <NuxtLink :to="`${localePath('/')}#leistungen`" class="transition hover:text-ink">{{ t('nav.services') }}</NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="text-brass-600">{{ p('tag') }}</span>
          </nav>

          <h1 class="mt-6 max-w-4xl text-display-lg font-semibold text-balance text-ink">{{ p('h1') }}</h1>
          <p class="mt-5 max-w-prose text-[1.125rem] leading-relaxed text-pretty text-slate-500">{{ p('lede') }}</p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink :to="{ path: localePath('/anfrage'), query: { intent: 'ready', service: k } }" class="btn-ink">
              {{ t('servicePages.cta') }}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </NuxtLink>
            <NuxtLink :to="localePath('/kontakt')" class="btn-quiet">{{ t('nav.contact') }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- What it is -->
    <section class="shell py-20 sm:py-24">
      <div class="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div class="reveal max-w-prose space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
          <h2 class="text-display-sm font-semibold text-ink">{{ p('intro.title') }}</h2>
          <p>{{ p('intro.body1') }}</p>
          <p>{{ p('intro.body2') }}</p>
        </div>

        <aside class="reveal lg:border-l lg:border-chrome-200 lg:pl-12">
          <p class="eyebrow">{{ t('servicePages.stackTitle') }}</p>
          <ul class="mt-5 space-y-3.5">
            <li v-for="s in service!.stack" :key="s.name" class="flex items-center gap-3">
              <img :src="s.src" :alt="s.name" width="192" height="192" loading="lazy" decoding="async" class="size-7 object-contain" />
              <span class="text-[0.9375rem] text-ink">{{ s.name }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- Where it fits -->
    <section class="bg-white">
      <div class="shell py-20 sm:py-24">
        <h2 class="reveal max-w-2xl text-display-md font-semibold text-balance text-ink">{{ p('useCasesTitle') }}</h2>
        <div class="mt-12 grid gap-px overflow-hidden rounded-panel border border-chrome-200 bg-chrome-200 sm:grid-cols-2">
          <article
            v-for="(id, i) in UC"
            :key="id"
            class="reveal bg-white p-7 sm:p-8"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <h3 class="text-[1.1875rem] font-semibold tracking-tight text-ink">{{ p(`useCases.${id}.title`) }}</h3>
            <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">{{ p(`useCases.${id}.body`) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- The honest case for professional build vs. doing it yourself. On ink,
         because it is the argument that most often decides the enquiry. -->
    <section class="mx-2 rounded-stage bg-ink-950 text-white sm:mx-3">
      <div class="shell py-20 sm:py-24">
        <div class="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p class="eyebrow reveal !text-brass-300">{{ t('servicePages.productionEyebrow') }}</p>
            <h2 class="reveal mt-4 text-display-md font-semibold text-balance">{{ p('production.title') }}</h2>
          </div>
          <div class="reveal max-w-prose space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-white/70">
            <p>{{ p('production.body1') }}</p>
            <p>{{ p('production.body2') }}</p>
          </div>
        </div>

        <dl class="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          <div v-for="(id, i) in PT" :key="id" class="reveal border-t border-white/15 pt-5" :style="{ transitionDelay: `${i * 70}ms` }">
            <dt class="text-[1.0625rem] font-semibold tracking-tight">{{ p(`production.points.${id}.title`) }}</dt>
            <dd class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-white/55">{{ p(`production.points.${id}.body`) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- How we build it -->
    <section class="shell py-20 sm:py-24">
      <h2 class="reveal max-w-2xl text-display-md font-semibold text-balance text-ink">{{ p('approachTitle') }}</h2>
      <ol class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
        <li v-for="(id, i) in AP" :key="id" class="reveal border-t-2 border-ink pt-5" :style="{ transitionDelay: `${i * 70}ms` }">
          <span class="font-mono text-label uppercase text-brass-600">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-4 text-[1.1875rem] font-semibold tracking-tight text-ink">{{ p(`approach.${id}.title`) }}</h3>
          <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">{{ p(`approach.${id}.body`) }}</p>
        </li>
      </ol>
    </section>

    <!-- Questions -->
    <section class="bg-white">
      <div class="shell py-20 sm:py-24">
        <div class="mx-auto max-w-3xl">
          <h2 class="reveal text-display-md font-semibold text-balance text-ink">{{ t('servicePages.faqTitle') }}</h2>
          <div class="mt-10 border-t border-chrome-200">
            <details v-for="id in FQ" :key="id" class="faq reveal group border-b border-chrome-200">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium text-pretty text-ink transition hover:text-brass-600">
                {{ p(`faq.${id}.q`) }}
                <span class="marker grid size-6 shrink-0 place-items-center text-slate-400 transition-transform duration-300" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
              </summary>
              <p class="max-w-prose pb-6 pr-10 text-[0.9375rem] leading-relaxed text-pretty text-slate-500">{{ p(`faq.${id}.a`) }}</p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- Sibling services: internal links search engines and readers both use -->
    <section class="shell py-20 sm:py-24">
      <h2 class="reveal text-display-sm font-semibold text-ink">{{ t('servicePages.otherTitle') }}</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <NuxtLink
          v-for="[s, cfg] in others"
          :key="s"
          :to="localePath(`/leistungen/${s}`)"
          class="reveal group rounded-panel border border-chrome-200 bg-white p-6 transition hover:border-chrome-400 hover:shadow-card"
        >
          <p class="font-mono text-label uppercase text-brass-600">{{ t(`servicePages.${cfg.key}.tag`) }}</p>
          <h3 class="mt-4 text-[1.0625rem] font-semibold tracking-tight text-ink">{{ t(`servicePages.${cfg.key}.h1`) }}</h3>
          <span class="mt-4 flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
            {{ t('work.view') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </NuxtLink>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
.faq summary::-webkit-details-marker { display: none; }
.faq[open] .marker { transform: rotate(180deg); }
</style>
