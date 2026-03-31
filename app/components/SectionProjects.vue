<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const projects = [
  {
    key: 'immoreels',
    color: 'from-dark-900 to-dark-800',
    tech: ['Nuxt', 'TypeScript', 'Go', 'PostgreSQL'],
    image: '/project-immoreels/Xnapper-2026-03-31-13.21.16.png',
  },
  // {
  //   key: 'pannenhilfe',
  //   color: 'from-dark-700 to-dark-600',
  //   tech: ['Nuxt', 'TypeScript', 'Go', 'Stripe'],
  //   image: '/project-pannenhilfe/Xnapper-2026-03-31-13.28.33.png',
  // },
]

const activeProject = ref<number | null>(null)
</script>

<template>
  <section id="projects" class="section-padding bg-white relative overflow-hidden">
    <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-100/40 rounded-full blur-[120px]" />

    <div class="max-w-7xl mx-auto relative">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <span class="fade-up inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-gold-700 mb-5">
            <span class="w-8 h-px bg-gold-400" />
            {{ t('projects.tag') }}
          </span>
          <h2 class="fade-up text-4xl md:text-5xl font-extrabold text-dark-900 tracking-tight leading-[1.1]">
            {{ t('projects.title') }}
          </h2>
        </div>
        <p class="fade-up text-dark-400 text-[15px] font-light max-w-sm leading-relaxed">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <!-- Project cards -->
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="(project, i) in projects"
          :key="project.key"
          :to="localePath(`/projects/${project.key}`)"
          class="fade-up group relative rounded-3xl overflow-hidden cursor-pointer"
          :style="{ transitionDelay: `${i * 0.1}s` }"
          @mouseenter="activeProject = i"
          @mouseleave="activeProject = null"
        >
          <!-- Image -->
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="project.image"
              :alt="t(`projects.items.${project.key}.title`)"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
          </div>

          <!-- Content overlay -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
            <!-- Tech tags -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="text-[10px] font-semibold tracking-wide text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10"
              >
                {{ tech }}
              </span>
            </div>

            <h3 class="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1.5">
              {{ t(`projects.items.${project.key}.title`) }}
            </h3>
            <p class="text-[13px] text-white/60 font-light leading-relaxed line-clamp-2">
              {{ t(`projects.items.${project.key}.short`) }}
            </p>

            <!-- Arrow indicator -->
            <div class="mt-4 flex items-center gap-2 text-gold-400 text-[13px] font-semibold opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {{ t('projects.viewProject') }}
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
