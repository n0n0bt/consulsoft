<script setup lang="ts">
const { t } = useI18n()

const partners = ['SAP', 'Siemens', 'Deutsche Bahn', 'Bosch', 'Allianz', 'BMW']
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <p class="text-center text-[11px] font-semibold text-dark-300 tracking-[0.2em] mb-10 uppercase">
        {{ t('partners.title') }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        <span
          v-for="partner in partners"
          :key="partner"
          class="text-dark-200 text-xl font-bold tracking-tight hover:text-dark-400 transition-colors duration-300 cursor-default"
        >
          {{ partner }}
        </span>
      </div>
    </div>
  </section>
</template>
