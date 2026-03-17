<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()
const scrolled = ref(false)
const mobileOpen = ref(false)

const otherLocale = computed(() =>
  locales.value.find((l) => (typeof l === 'string' ? l : l.code) !== locale.value)
)

function getCode(l: string | { code: string }) {
  return typeof l === 'string' ? l : l.code
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})

const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.process'), href: '#process' },
  { label: t('nav.team'), to: localePath('/about') },
  { label: t('nav.contact'), href: '#contact' },
])
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
    <nav
      :class="[
        'max-w-5xl mx-auto rounded-full px-3 py-2 transition-all duration-500 flex items-center justify-between',
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/[0.03] border border-dark-100/60'
          : 'bg-white/40 backdrop-blur-md border border-transparent',
      ]"
    >
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center pl-3">
        <img src="/consulsoft-logo.svg" alt="Consulsoft" class="h-7" />
      </NuxtLink>

      <!-- Center links -->
      <div class="hidden md:flex items-center gap-1">
        <template v-for="link in navLinks" :key="link.label">
          <NuxtLink
            v-if="link.to"
            :to="link.to"
            class="text-[13px] font-medium text-dark-500 hover:text-dark-900 transition-colors px-4 py-2 rounded-full hover:bg-dark-50"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="text-[13px] font-medium text-dark-500 hover:text-dark-900 transition-colors px-4 py-2 rounded-full hover:bg-dark-50"
          >
            {{ link.label }}
          </a>
        </template>
      </div>

      <!-- Right -->
      <div class="hidden md:flex items-center gap-2">
        <button
          v-if="otherLocale"
          class="text-[13px] font-medium text-dark-400 hover:text-dark-900 transition-colors px-3 py-2 rounded-full hover:bg-dark-50"
          @click="setLocale(getCode(otherLocale))"
        >
          {{ getCode(otherLocale).toUpperCase() }}
        </button>
        <a
          href="#contact"
          class="bg-dark-900 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-dark-800 transition-all hover:shadow-lg hover:shadow-dark-900/20 active:scale-[0.97]"
        >
          {{ t('hero.cta') }}
        </a>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2.5 text-dark-700 hover:bg-dark-50 rounded-full transition-colors"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!mobileOpen"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden mt-2 max-w-5xl mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl border border-dark-100/60 shadow-xl shadow-black/[0.05] p-6"
      >
        <div class="flex flex-col gap-1">
          <template v-for="link in navLinks" :key="link.label">
            <NuxtLink
              v-if="link.to"
              :to="link.to"
              class="text-[15px] font-medium text-dark-700 hover:text-dark-900 py-3 px-4 rounded-2xl hover:bg-dark-50 transition-colors"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="text-[15px] font-medium text-dark-700 hover:text-dark-900 py-3 px-4 rounded-2xl hover:bg-dark-50 transition-colors"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </template>
          <hr class="my-2 border-dark-100" />
          <div class="flex items-center gap-3 px-4">
            <button
              v-if="otherLocale"
              class="text-[13px] font-medium text-dark-400 hover:text-dark-900 py-2 px-3 rounded-full border border-dark-100 hover:bg-dark-50"
              @click="setLocale(getCode(otherLocale)); mobileOpen = false"
            >
              {{ getCode(otherLocale).toUpperCase() }}
            </button>
            <a
              href="#contact"
              class="flex-1 bg-dark-900 text-white text-[13px] font-semibold py-3 rounded-full text-center"
              @click="mobileOpen = false"
            >
              {{ t('hero.cta') }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
