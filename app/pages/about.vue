<script setup lang="ts">
const { t } = useI18n()
useScrollReveal()

const team = [
  {
    key: 'naumche',
    image: '/team/team-naumche-joshevski.jpg',
    links: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    key: 'dimitar',
    image: '/team/dimitar.jpg',
    links: {
      linkedin: '#',
      github: '#',
    },
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-surface-50" />
      <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold-200/20 rounded-full blur-[120px]" />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-6">
            <span class="w-8 h-px bg-gold-600" />
            {{ t('teamPage.tag') }}
          </span>
          <h1 class="fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-900 tracking-tight leading-[1.1] mb-6" style="transition-delay: 0.1s">
            {{ t('teamPage.title') }}
          </h1>
          <p class="fade-up text-lg text-dark-400 leading-relaxed font-light max-w-lg" style="transition-delay: 0.2s">
            {{ t('teamPage.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Team members -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          v-for="(member, i) in team"
          :key="member.key"
          class="fade-up mb-32 last:mb-0"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div
            class="grid lg:grid-cols-2 gap-16 items-center"
            :class="i % 2 !== 0 ? 'lg:direction-rtl' : ''"
          >
            <!-- Photo -->
            <div :class="i % 2 !== 0 ? 'lg:order-2' : ''">
              <div class="relative">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden bg-dark-100">
                  <img
                    :src="member.image"
                    :alt="t(`teamPage.members.${member.key}.name`)"
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Decorative brand mark -->
                <img
                  src="/brand-mark.svg"
                  alt=""
                  class="absolute -bottom-6 -right-6 w-24 h-24 opacity-10 pointer-events-none select-none"
                  :class="i % 2 !== 0 ? '-left-6 -right-auto' : ''"
                />
              </div>
            </div>

            <!-- Info -->
            <div :class="i % 2 !== 0 ? 'lg:order-1' : ''">
              <span class="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-gold-600 mb-4">
                {{ t(`teamPage.members.${member.key}.role`) }}
              </span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-dark-900 tracking-tight mb-2">
                {{ t(`teamPage.members.${member.key}.name`) }}
              </h2>
              <p class="text-dark-400 text-[15px] font-medium mb-6">
                {{ t(`teamPage.members.${member.key}.position`) }}
              </p>
              <p class="text-dark-400 text-base leading-relaxed font-light mb-4">
                {{ t(`teamPage.members.${member.key}.bio1`) }}
              </p>
              <p class="text-dark-400 text-base leading-relaxed font-light mb-8">
                {{ t(`teamPage.members.${member.key}.bio2`) }}
              </p>

              <!-- Skills -->
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="skill in t(`teamPage.members.${member.key}.skills`).split(',')"
                  :key="skill"
                  class="text-[12px] font-medium text-dark-600 bg-dark-50 px-3 py-1.5 rounded-full"
                >
                  {{ skill.trim() }}
                </span>
              </div>

              <!-- Social links -->
              <div class="flex items-center gap-3">
                <a
                  :href="member.links.linkedin"
                  class="w-10 h-10 bg-dark-50 hover:bg-dark-100 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg class="w-4 h-4 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  :href="member.links.github"
                  class="w-10 h-10 bg-dark-50 hover:bg-dark-100 rounded-full flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <svg class="w-4 h-4 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values strip -->
    <section class="py-20 bg-dark-900 text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="fade-up text-3xl md:text-4xl font-extrabold tracking-tight mb-16 text-center">
          {{ t('teamPage.values.title') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-10">
          <div
            v-for="(value, i) in ['handshake', 'code', 'growth']"
            :key="value"
            class="fade-up text-center"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <div class="w-14 h-14 bg-gold-400/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg v-if="value === 'handshake'" class="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <svg v-else-if="value === 'code'" class="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <svg v-else class="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-3">{{ t(`teamPage.values.${value}.title`) }}</h3>
            <p class="text-dark-300 text-[15px] leading-relaxed font-light">{{ t(`teamPage.values.${value}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <SectionCta />
  </div>
</template>
