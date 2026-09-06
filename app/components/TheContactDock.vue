<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

/**
 * Appears once the hero is behind you, and gets out of the way again as soon as
 * the real CTA section is on screen — two calls to action competing in the same
 * viewport is worse than none.
 *
 * It earns its place by offering the one route the navbar does not: a direct
 * email. On mobile it matters more, because the navbar CTA collapses into the
 * menu there.
 */
const past = ref(false)
const atEnd = ref(false)

const hiddenOn = ['/kontakt', '/anfrage']
const suppressed = computed(() => hiddenOn.some(p => route.path.replace(/^\/en/, '').startsWith(p)))
const show = computed(() => past.value && !atEnd.value && !suppressed.value)

let observer: IntersectionObserver | undefined
const onScroll = () => { past.value = window.scrollY > window.innerHeight * 0.75 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const stops = document.querySelectorAll('[data-dock-stop]')
  if (stops.length) {
    observer = new IntersectionObserver(
      entries => { atEnd.value = entries.some(e => e.isIntersecting) },
      { rootMargin: '0px 0px -20% 0px' },
    )
    stops.forEach(el => observer!.observe(el))
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <Transition name="dock">
    <div
      v-if="show"
      class="fixed inset-x-3 bottom-3 z-40 flex justify-center sm:inset-x-auto sm:bottom-5 sm:right-5 sm:justify-end"
    >
      <div class="flex w-full items-center gap-1.5 rounded-full border border-chrome-300/70 bg-white/90 p-1.5 shadow-pill backdrop-blur-xl sm:w-auto">
        <a
          href="mailto:info@consulsoft.de"
          class="grid size-11 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-paper hover:text-ink"
          :aria-label="t('dock.email')"
          :title="t('dock.email')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7" />
            <path d="M4 7l8 5.5L20 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>

        <NuxtLink
          :to="{ path: localePath('/anfrage'), query: { intent: 'ready' } }"
          class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5
                 text-[0.9375rem] font-medium text-white transition duration-200
                 hover:bg-ink-700 active:scale-[0.98] sm:flex-none"
        >
          {{ t('dock.cta') }}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dock-enter-active,
.dock-leave-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.dock-enter-from,
.dock-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
