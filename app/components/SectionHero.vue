<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const localeRoute = useLocaleRoute()
const router = useRouter()

/**
 * The hero does two things: say what we build, and open the conversation.
 * The surface demo used to live here too and was a second focal point fighting
 * the headline — it now anchors the services section, where it argues for
 * something.
 */
const email = ref('')
const emailInput = ref<HTMLInputElement>()

function startBrief() {
  const value = email.value.trim()
  if (value && !emailInput.value?.checkValidity()) {
    emailInput.value?.reportValidity()
    return
  }
  router.push(localeRoute({
    path: '/anfrage',
    query: { intent: 'ready', ...(value ? { email: value } : {}) },
  })!)
}
</script>

<template>
  <section class="p-2 sm:p-3">
    <div class="relative flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-stage
                bg-ink-950 sm:min-h-[calc(100svh-1.5rem)]">
      <!-- The photograph, cropped above the saturated green band -->
      <img
        src="/hero/valley-1600.webp"
        srcset="/hero/valley-960.webp 960w, /hero/valley-1600.webp 1600w, /hero/valley-2400.webp 2400w"
        sizes="100vw"
        alt=""
        width="2400"
        height="1184"
        fetchpriority="high"
        decoding="async"
        class="absolute inset-0 size-full object-cover"
      >
      <div class="hero-scrim absolute inset-0" aria-hidden="true" />

      <div class="shell relative flex flex-1 items-center pb-12 pt-24 sm:pb-16 sm:pt-28">
        <div class="mx-auto max-w-6xl text-center">
          <h1 class="text-display-xl font-semibold text-balance text-white">
            <span class="text-white/60">{{ t('hero.titleLine1') }}</span><br>
            {{ t('hero.titleLine2') }}
            <span class="text-brass-300">{{ t('hero.titleAccent') }}</span>
          </h1>

          <p class="mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-pretty text-white/85">
            {{ t('hero.subtitle') }}
          </p>

          <!-- One field. The real questions get asked on their own page. -->
          <form class="mx-auto mt-8 w-full max-w-xl rounded-[1.6rem] bg-white p-1.5 shadow-card" @submit.prevent="startBrief">
            <div class="flex items-center gap-1.5">
              <input
                ref="emailInput"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                :placeholder="t('hero.emailPlaceholder')"
                :aria-label="t('hero.emailLabel')"
                class="h-12 min-w-0 flex-1 rounded-full bg-paper-sunk px-5 text-[0.9375rem] text-ink
                       transition placeholder:text-slate-400 focus:bg-white focus:outline-none
                       focus:ring-2 focus:ring-brass-500/30"
              >
              <button
                type="submit"
                class="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink
                       px-4 text-[0.9375rem] font-medium text-white transition duration-200
                       hover:bg-ink-700 active:scale-[0.98] sm:px-5"
              >
                <span class="hidden sm:inline">{{ t('hero.cta') }}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
            </div>
            <p class="px-4 pb-2 pt-1.5 text-center text-[0.8125rem] text-slate-400">
              {{ t('hero.emailHint') }}
            </p>
          </form>

          <NuxtLink :to="`${localePath('/')}#leistungen`" class="mt-4 inline-block py-3 text-[0.9375rem] text-white/80 underline-offset-4 transition hover:text-white hover:underline">
            {{ t('hero.secondary') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Proof strip -->
      <div class="relative border-t border-white/10 bg-ink-950/55 backdrop-blur">
        <div class="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4">
          <span v-for="p in [t('hero.proof1'), t('hero.proof2')]" :key="p" class="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/75">
            {{ p }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
