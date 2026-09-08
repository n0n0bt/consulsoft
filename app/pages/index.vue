<script setup lang="ts">
const { t } = useI18n()

useScrollReveal()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Consulsoft UG (haftungsbeschränkt)',
        'url': 'https://consulsoft.de',
        'logo': 'https://consulsoft.de/apple-touch-icon.png',
        'description': 'Individuelle Softwareentwicklung: Web-Apps, Desktop-Anwendungen für macOS und Windows, mobile Apps und KI-Automationen.',
        'foundingDate': '2024',
        'founders': [
          { '@type': 'Person', 'name': 'Naumche Joshevski' },
          { '@type': 'Person', 'name': 'Dimitar Manev' },
        ],
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Nailaer Str. 39',
          'postalCode': '95119',
          'addressLocality': 'Naila',
          'addressCountry': 'DE',
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'info@consulsoft.de',
          'contactType': 'customer service',
          'availableLanguage': ['German', 'English'],
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SectionHero />
    <SectionStack />
    <SectionServices />
    <SectionCompare />
    <SectionFounders />
    <SectionWork />
    <SectionProcess />
    <SectionFaq />
    <SectionCta />
  </div>
</template>
