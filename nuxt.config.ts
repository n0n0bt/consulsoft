export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
  },

  googleFonts: {
    families: {
      'Plus Jakarta Sans': [300, 400, 500, 600, 700, 800],
    },
    display: 'swap',
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://consulsoft.de',
    name: 'Consulsoft',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Consulsoft – Moderne Softwareentwicklung für Unternehmen',
      titleTemplate: '%s | Consulsoft',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Consulsoft entwickelt maßgeschneiderte Softwarelösungen für Unternehmen. Web-Apps, Mobile Apps, Cloud & DevOps, KI-Integration. Ihr Partner für digitale Innovation.' },
        { name: 'author', content: 'Consulsoft UG (haftungsbeschränkt)' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Consulsoft' },
        { property: 'og:title', content: 'Consulsoft – Moderne Softwareentwicklung für Unternehmen' },
        { property: 'og:description', content: 'Maßgeschneiderte Softwarelösungen: Web-Apps, Mobile Apps, Cloud & DevOps, KI-Integration. Ihr Partner für digitale Innovation in Deutschland.' },
        { property: 'og:image', content: 'https://consulsoft.de/og-image.png' },
        { property: 'og:url', content: 'https://consulsoft.de' },
        { property: 'og:locale', content: 'de_DE' },
        { property: 'og:locale:alternate', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Consulsoft – Moderne Softwareentwicklung' },
        { name: 'twitter:description', content: 'Maßgeschneiderte Softwarelösungen für Unternehmen. Web-Apps, Cloud, KI & mehr.' },
        { name: 'twitter:image', content: 'https://consulsoft.de/og-image.png' },

        // Additional SEO
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#1C1C22' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand-mark.svg' },
        { rel: 'apple-touch-icon', href: '/brand-mark.svg' },
        { rel: 'canonical', href: 'https://consulsoft.de' },
      ],
    },
  },
})
