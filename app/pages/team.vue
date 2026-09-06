<script setup lang="ts">
const { t } = useI18n()

useScrollReveal()

useHead({ title: () => t('teamPage.title') })
useSeoMeta({
  description: () => t('teamPage.subtitle'),
  ogTitle: () => t('teamPage.title'),
  ogDescription: () => t('teamPage.subtitle'),
})

const team = [
  { key: 'naumche', image: '/team/team-naumche-joshevski.webp' },
  { key: 'dimitar', image: '/team/dimitar-manev.webp' },
]

const values = ['handshake', 'code', 'growth'] as const
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('teamPage.tag')"
      :title="t('teamPage.title')"
      :lede="t('teamPage.subtitle')"
    />

    <!-- Founders. Two people, so they get room rather than a card grid. -->
    <section class="shell py-20 sm:py-24">
      <div class="space-y-20 sm:space-y-24">
        <article
          v-for="(member, i) in team"
          :key="member.key"
          class="reveal grid gap-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-12"
        >
          <div class="aspect-[3/4] overflow-hidden rounded-panel bg-paper-sunk">
            <img
              :src="member.image"
              :alt="t(`teamPage.members.${member.key}.name`)"
              width="900"
              height="1200"
              :loading="i === 0 ? 'eager' : 'lazy'"
              decoding="async"
              class="size-full object-cover object-top"
            />
          </div>

          <div class="sm:pt-2">
            <p class="eyebrow">{{ t(`teamPage.members.${member.key}.role`) }}</p>
            <h2 class="mt-4 text-display-md font-semibold text-ink">
              {{ t(`teamPage.members.${member.key}.name`) }}
            </h2>
            <p class="mt-1.5 text-[0.9375rem] text-slate-400">
              {{ t(`teamPage.members.${member.key}.position`) }}
            </p>

            <div class="mt-6 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-pretty text-slate-500">
              <p>{{ t(`teamPage.members.${member.key}.bio1`) }}</p>
              <p>{{ t(`teamPage.members.${member.key}.bio2`) }}</p>
            </div>

            <ul class="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-chrome-200 pt-5">
              <li
                v-for="skill in t(`teamPage.members.${member.key}.skills`).split(',')"
                :key="skill"
                class="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-400"
              >
                {{ skill.trim() }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Values, on ink so the page has one dark beat before the footer -->
    <section class="mx-2 rounded-stage bg-ink-950 text-white sm:mx-3">
      <div class="shell py-20 sm:py-24">
        <h2 class="reveal max-w-2xl text-display-lg font-semibold text-balance">
          {{ t('teamPage.values.title') }}
        </h2>

        <div class="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            v-for="(value, i) in values"
            :key="value"
            class="reveal border-t-2 border-brass-500 pt-5"
            :style="{ transitionDelay: `${i * 70}ms` }"
          >
            <h3 class="text-[1.1875rem] font-semibold tracking-tight">{{ t(`teamPage.values.${value}.title`) }}</h3>
            <p class="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-white/50">
              {{ t(`teamPage.values.${value}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>
