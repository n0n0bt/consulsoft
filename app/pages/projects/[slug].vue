<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
useScrollReveal()

const slug = route.params.slug as string

const projectData: Record<string, {
  tech: string[]
  hero: string
  screenshots: { src: string; alt: string }[]
  color: string
}> = {
  erp: {
    tech: ['Angular', 'Java', 'Spring Boot', 'Azure', 'PostgreSQL', 'Docker'],
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=600&fit=crop',
    color: 'from-dark-900 to-dark-800',
    screenshots: [
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', alt: 'Dashboard view' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', alt: 'Analytics module' },
      { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop', alt: 'Reporting interface' },
    ],
  },
  logistics: {
    tech: ['Vue.js', 'Kotlin', '.NET Core', 'AWS', 'Redis', 'Kubernetes'],
    hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=600&fit=crop',
    color: 'from-gold-500 to-gold-600',
    screenshots: [
      { src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop', alt: 'Tracking dashboard' },
      { src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop', alt: 'Route optimization' },
      { src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=500&fit=crop', alt: 'Fleet management' },
    ],
  },
  healthportal: {
    tech: ['React', 'Python', 'Azure', 'AI/ML', 'FHIR', 'Terraform'],
    hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=600&fit=crop',
    color: 'from-dark-700 to-dark-600',
    screenshots: [
      { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop', alt: 'Patient portal' },
      { src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop', alt: 'Appointment system' },
      { src: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=500&fit=crop', alt: 'Analytics dashboard' },
    ],
  },
}

const project = projectData[slug]

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const otherProjects = Object.keys(projectData).filter(k => k !== slug)

useHead({ title: t(`projects.items.${slug}.title`) })
useSeoMeta({
  description: t(`projects.items.${slug}.short`),
  ogTitle: t(`projects.items.${slug}.title`),
  ogDescription: t(`projects.items.${slug}.short`),
  ogImage: project.hero,
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0">
        <img :src="project.hero" alt="" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-dark-900/70 backdrop-blur-sm" />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <!-- Back link -->
          <NuxtLink
            :to="localePath('/')"
            class="fade-up inline-flex items-center gap-2 text-white/50 hover:text-white text-[13px] font-medium mb-8 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {{ t('projects.backToHome') }}
          </NuxtLink>

          <span class="fade-up block text-[12px] font-semibold tracking-widest text-gold-400 mb-4 mt-2" style="transition-delay: 0.05s">
            {{ t('projects.tag') }}
          </span>

          <h1 class="fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6" style="transition-delay: 0.1s">
            {{ t(`projects.items.${slug}.title`) }}
          </h1>

          <p class="fade-up text-lg text-white/60 leading-relaxed font-light max-w-xl mb-8" style="transition-delay: 0.15s">
            {{ t(`projects.items.${slug}.short`) }}
          </p>

          <!-- Tech stack -->
          <div class="fade-up flex flex-wrap gap-2" style="transition-delay: 0.2s">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="text-[12px] font-medium text-white/80 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Project details -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-[1fr_340px] gap-16">
          <!-- Main content -->
          <div>
            <h2 class="fade-up text-2xl md:text-3xl font-extrabold text-dark-900 tracking-tight mb-6">
              {{ t(`projects.items.${slug}.overviewTitle`) }}
            </h2>
            <div class="fade-up space-y-4 text-dark-400 text-base leading-relaxed font-light" style="transition-delay: 0.05s">
              <p>{{ t(`projects.items.${slug}.description1`) }}</p>
              <p>{{ t(`projects.items.${slug}.description2`) }}</p>
            </div>

            <!-- Screenshots -->
            <div class="mt-14">
              <h3 class="fade-up text-xl font-bold text-dark-900 mb-6">{{ t('projects.screenshots') }}</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="(screenshot, i) in project.screenshots"
                  :key="i"
                  class="fade-up rounded-2xl overflow-hidden border border-dark-100/60 group"
                  :class="i === 0 ? 'md:col-span-2' : ''"
                  :style="{ transitionDelay: `${i * 0.08}s` }"
                >
                  <img
                    :src="screenshot.src"
                    :alt="screenshot.alt"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    :class="i === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:sticky lg:top-28 lg:self-start">
            <!-- Challenge -->
            <div class="fade-up bg-surface-50 rounded-2xl p-6 mb-6">
              <h4 class="text-sm font-bold text-dark-900 mb-3">{{ t('projects.challenge') }}</h4>
              <p class="text-[14px] text-dark-400 leading-relaxed font-light">
                {{ t(`projects.items.${slug}.challenge`) }}
              </p>
            </div>

            <!-- Solution -->
            <div class="fade-up bg-surface-50 rounded-2xl p-6 mb-6" style="transition-delay: 0.05s">
              <h4 class="text-sm font-bold text-dark-900 mb-3">{{ t('projects.solution') }}</h4>
              <p class="text-[14px] text-dark-400 leading-relaxed font-light">
                {{ t(`projects.items.${slug}.solution`) }}
              </p>
            </div>

            <!-- Results -->
            <div class="fade-up bg-dark-900 rounded-2xl p-6" style="transition-delay: 0.1s">
              <h4 class="text-sm font-bold text-white mb-4">{{ t('projects.results') }}</h4>
              <div class="space-y-3">
                <div
                  v-for="(result, i) in t(`projects.items.${slug}.results`).split('|')"
                  :key="i"
                  class="flex items-start gap-3"
                >
                  <div class="w-5 h-5 bg-gold-400/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-[13px] text-dark-300 font-light">{{ result.trim() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other projects -->
    <section class="py-20 bg-surface-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="fade-up text-2xl font-extrabold text-dark-900 tracking-tight mb-10">
          {{ t('projects.otherProjects') }}
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="(otherKey, i) in otherProjects"
            :key="otherKey"
            :to="localePath(`/projects/${otherKey}`)"
            class="fade-up group relative rounded-2xl overflow-hidden aspect-[16/9]"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <img
              :src="projectData[otherKey].hero"
              :alt="t(`projects.items.${otherKey}.title`)"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-lg font-bold text-white mb-1">
                {{ t(`projects.items.${otherKey}.title`) }}
              </h3>
              <p class="text-[13px] text-white/50 font-light">
                {{ t(`projects.items.${otherKey}.short`) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>
