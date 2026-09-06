<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const links = computed(() => [
  { label: t('nav.services'), to: `${localePath('/')}#leistungen` },
  { label: t('nav.work'), to: `${localePath('/')}#arbeiten` },
  { label: t('nav.process'), to: `${localePath('/')}#prozess` },
  { label: t('nav.team'), to: localePath('/team') },
])

const other = computed(() => (locales.value as { code: string, name: string }[]).find(l => l.code !== locale.value))

const open = ref(false)

/**
 * At rest the bar is wide and hangs from the top edge of the hero, square on
 * top and rounded below. Once the hero is behind you it detaches: narrower,
 * fully rounded, lifted off the edge. Same object, two states.
 */
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(() => route.fullPath, () => { open.value = false })
watch(open, v => { document.body.style.overflow = v ? 'hidden' : '' })
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-300 ease-out sm:px-4 lg:px-3"
    :class="scrolled ? 'pt-3 sm:pt-4' : 'pt-4 sm:pt-5 lg:pt-3'"
  >
    <!--
      The bar hugs its own content and is pinned flush to the top edge, matching
      the hero card inset, so it reads as attached rather than floating.
    -->
    <div class="mx-auto flex max-w-shell justify-center">
      <!--
        Square on top, rounded on the bottom: the bar hangs from the top edge of
        the hero card rather than floating below it, so the two read as one
        piece of geometry.
      -->
      <nav
        class="flex w-full items-center border border-chrome-200
               px-3 transition-all duration-[450ms] ease-out lg:px-2.5"
        :class="[
          scrolled
            ? 'h-[3.25rem] max-w-4xl bg-white shadow-pill'
            : 'h-14 max-w-5xl bg-paper shadow-pill lg:border-t-transparent lg:shadow-[0_10px_30px_-18px_rgba(18,20,26,0.25)]',
          scrolled
            ? 'rounded-[1.75rem]'
            : 'rounded-[1.75rem] lg:rounded-t-none lg:rounded-b-[1.75rem]',
        ]"
      >
        <NuxtLink :to="localePath('/')" class="flex flex-1 items-center py-2.5 pl-1 pr-2" aria-label="Consulsoft">
          <img
            src="/consulsoft-logo.webp"
            alt="Consulsoft"
            width="1400"
            height="413"
            fetchpriority="high"
            class="h-[1.55rem] w-auto"
          />
        </NuxtLink>

        <!-- Centre column: empty on mobile, so the actions still sit right -->
        <div class="hidden shrink-0 items-center lg:flex">
          <NuxtLink
            v-for="l in links"
            :key="l.label"
            :to="l.to"
            class="whitespace-nowrap rounded-full px-3 py-2 text-[0.875rem] text-ink/75 transition hover:bg-paper hover:text-ink"
          >
            {{ l.label }}
          </NuxtLink>
        </div>

        <div class="flex flex-1 items-center justify-end gap-1.5 pl-4">
          <!-- A flag reads faster than a language code -->
          <button
            v-if="other"
            type="button"
            class="grid size-11 shrink-0 place-items-center rounded-full transition hover:bg-paper lg:size-9"
            :aria-label="`${other.name}`"
            :title="other.name"
            @click="setLocale(other.code as 'de' | 'en')"
          >
            <span class="block h-[15px] w-[21px] overflow-hidden rounded-[3px] ring-1 ring-ink/10">
              <svg v-if="other.code === 'de'" viewBox="0 0 5 3" class="size-full" aria-hidden="true">
                <rect width="5" height="3" fill="#FFCE00" />
                <rect width="5" height="2" fill="#DD0000" />
                <rect width="5" height="1" fill="#000000" />
              </svg>
              <svg v-else viewBox="0 0 60 30" class="size-full" aria-hidden="true">
                <rect width="60" height="30" fill="#012169" />
                <path d="M0 0l60 30m0-30L0 30" stroke="#FFFFFF" stroke-width="6" />
                <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="3" />
                <path d="M30 0v30M0 15h60" stroke="#FFFFFF" stroke-width="10" />
                <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6" />
              </svg>
            </span>
          </button>

          <NuxtLink
            :to="localePath('/anfrage')"
            class="hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[0.875rem]
                   font-medium text-white transition duration-200 hover:bg-ink-700 active:scale-[0.98] sm:inline-flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 015.5 4h2.2a1 1 0 01.96.72l.9 3a1 1 0 01-.3 1.05L7.9 10a12 12 0 006.1 6.1l1.23-1.36a1 1 0 011.05-.3l3 .9a1 1 0 01.72.96v2.2a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 014 5.5z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {{ t('nav.cta') }}
          </NuxtLink>

          <button
            type="button"
            class="grid size-11 place-items-center rounded-full text-ink transition hover:bg-paper lg:hidden"
            :aria-expanded="open"
            :aria-label="t('nav.menu')"
            @click="open = !open"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path :d="open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile sheet -->
    <Transition name="sheet">
      <div v-if="open" class="mx-auto mt-2 max-w-shell rounded-panel border border-chrome-300/70 bg-white p-3 shadow-pill lg:hidden">
        <NuxtLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          class="block rounded-card px-4 py-3.5 text-[1.0625rem] text-ink transition hover:bg-paper"
        >
          {{ l.label }}
        </NuxtLink>
        <NuxtLink :to="localePath('/anfrage')" class="btn-ink mt-2 w-full">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 015.5 4h2.2a1 1 0 01.96.72l.9 3a1 1 0 01-.3 1.05L7.9 10a12 12 0 006.1 6.1l1.23-1.36a1 1 0 011.05-.3l3 .9a1 1 0 01.72.96v2.2a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 014 5.5z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {{ t('nav.cta') }}
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
