<script setup lang="ts">
useScrollReveal()

useHead({
  title: 'Consulsoft – Moderne Softwareentwicklung für Unternehmen',
  titleTemplate: '',
})

useSeoMeta({
  description: 'Consulsoft entwickelt maßgeschneiderte Softwarelösungen für Unternehmen. Web-Apps, Mobile Apps, Cloud & DevOps, KI-Integration. Ihr Partner für digitale Innovation.',
  ogTitle: 'Consulsoft – Moderne Softwareentwicklung für Unternehmen',
  ogDescription: 'Maßgeschneiderte Softwarelösungen: Web-Apps, Mobile Apps, Cloud & DevOps, KI-Integration.',
  ogUrl: 'https://consulsoft.de',
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
        'logo': 'https://consulsoft.de/brand-mark.svg',
        'description': 'Moderne Softwareentwicklung für Unternehmen – Web-Apps, Mobile Apps, Cloud & DevOps, KI-Integration.',
        'foundingDate': '2024',
        'founders': [
          { '@type': 'Person', 'name': 'Naumche Joshevski' },
          { '@type': 'Person', 'name': 'Dimitar Manev' },
        ],
        'sameAs': [
          'https://github.com/n0n0bt/consulsoft',
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'info@consulsoft.de',
          'contactType': 'customer service',
          'availableLanguage': ['German', 'English'],
        },
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'DE',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SectionHero />
    <SectionPartners />
    <SectionServices />
    <SectionTech />
    <SectionAbout />
    <SectionProjects />
    <SectionProcess />
    <SectionTestimonial />
    <SectionCta />
  </div>
</template>
