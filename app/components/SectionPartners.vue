<script setup lang="ts">
const { t } = useI18n()

const partners = [
  { name: 'ImmoReels', url: 'https://immoreels24.de', logo: '/partners/logo-immoreels.svg' },
  // { name: 'MAT-C', url: 'https://mat-club.de', logo: '/partners/logo-matc.svg' },
]
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <p class="text-center text-[11px] font-semibold text-dark-300 tracking-[0.2em] mb-10 uppercase">
        {{ t('partners.title') }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
        <a
          v-for="partner in partners"
          :key="partner.name"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          class="opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <img :src="partner.logo" :alt="partner.name" class="h-10 w-auto" />
        </a>
      </div>
    </div>
  </section>
</template>
