<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const columns = computed(() => [
  {
    title: t('footer.company'),
    links: [
      { label: t('nav.work'), to: `${localePath('/')}#arbeiten` },
      { label: t('nav.process'), to: `${localePath('/')}#prozess` },
      { label: t('nav.team'), to: localePath('/team') },
      { label: t('nav.contact'), to: localePath('/kontakt') },
    ],
  },
  {
    title: t('footer.legal'),
    links: [
      { label: t('footer.imprint'), to: localePath('/impressum') },
      { label: t('footer.privacy'), to: localePath('/datenschutz') },
      { label: t('footer.terms'), to: localePath('/agb') },
    ],
  },
])
</script>

<template>
  <footer data-dock-stop="true" class="mt-2 rounded-stage bg-ink-950 px-2 text-white sm:mx-3 sm:mb-3">
    <div class="shell py-14 sm:py-16">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <!-- Identity -->
        <div>
          <!-- The wordmark is black artwork, so it is inverted to sit on ink. -->
          <img
            src="/consulsoft-logo.webp"
            alt="Consulsoft"
            width="1400"
            height="413"
            loading="lazy"
            decoding="async"
            class="h-[1.55rem] w-auto brightness-0 invert"
          />
          <p class="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-white/45">
            {{ t('footer.blurb') }}
          </p>
        </div>

        <div v-for="col in columns" :key="col.title">
          <p class="font-mono text-label uppercase text-white/35">{{ col.title }}</p>
          <ul class="mt-3 space-y-0.5">
            <li v-for="l in col.links" :key="l.label">
              <NuxtLink :to="l.to" class="-mx-2 inline-block rounded px-2 py-3 text-[0.9375rem] text-white/70 transition hover:text-white">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="font-mono text-label uppercase text-white/35">{{ t('footer.reach') }}</p>
          <a href="mailto:info@consulsoft.de" class="-mx-2 mt-3 inline-block rounded px-2 py-3 text-[0.9375rem] text-brass-300 underline-offset-4 transition hover:text-brass-200 hover:underline">
            info@consulsoft.de
          </a>
          <address class="mt-3 text-[0.9375rem] not-italic leading-relaxed text-white/45">
            Consulsoft UG<br>
            Nailaer Str. 39<br>
            95119 Naila
          </address>
        </div>
      </div>

      <!-- Wordmark: the one loud thing in an otherwise quiet footer -->
      <div class="mt-16 border-t border-white/10 pt-10">
        <img
          src="/consulsoft-logo.webp"
          alt=""
          width="1400"
          height="413"
          loading="lazy"
          decoding="async"
          class="w-full select-none opacity-20 brightness-0 invert"
        />
      </div>

      <div class="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/30">
          © {{ new Date().getFullYear() }} Consulsoft UG (haftungsbeschränkt)
        </p>
        <p class="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/30">
          {{ t('footer.made') }}
        </p>
      </div>
    </div>
  </footer>
</template>
