export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
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

  app: {
    head: {
      title: 'Consulsoft – Moderne Softwareentwicklung',
      meta: [
        { name: 'description', content: 'Consulsoft – Ihr Partner für moderne Softwareentwicklung in Deutschland.' },
      ],
    },
  },
})
