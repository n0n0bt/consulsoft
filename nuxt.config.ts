// Filenames under public/ are stable and hand-managed, so cache for 30 days
// rather than a year — shipping a corrected asset does not require a rename.
const IMAGE_CACHE = 'public, max-age=2592000, stale-while-revalidate=86400'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'de',
    baseUrl: 'https://consulsoft.de',
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
  },

  // Self-hosted, so no third-party DNS + TLS on the critical path. Replaces
  // @nuxtjs/google-fonts, which emitted no @font-face at all in production and,
  // with download enabled, pointed every weight at the 300 file.
  // Archivo carries the display voice (a DIN-adjacent grotesk, set tight and
  // heavy); IBM Plex Sans reads the body; IBM Plex Mono labels the OS chrome,
  // the stack and the process steps, where a technical register is the point.
  fonts: {
    families: [
      { name: 'Archivo', provider: 'google', weights: [500, 600, 700], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
      { name: 'IBM Plex Sans', provider: 'google', weights: [400, 500, 600], styles: ['normal'], subsets: ['latin', 'latin-ext'] },
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 500], styles: ['normal'], subsets: ['latin'] },
    ],
    defaults: { fallbacks: { 'sans-serif': ['system-ui', 'Arial'] } },
  },

  // Pages are static content, so build them to HTML and serve from the CDN edge
  // instead of invoking a serverless function on every request. /api/contact
  // stays a function (see routeRules below).
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/', '/en', '/danke', '/en/danke', '/anfrage', '/en/anfrage',
        '/leistungen/web-apps', '/leistungen/desktop-anwendungen',
        '/leistungen/mobile-apps', '/leistungen/ki-automatisierung',
        '/en/leistungen/web-apps', '/en/leistungen/desktop-anwendungen',
        '/en/leistungen/mobile-apps', '/en/leistungen/ki-automatisierung',
      ],
    },
  },

  routeRules: {
    '/api/**': { prerender: false },
    '/languages/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/partners/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/project-immoreels/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/project-pannenhilfe/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/project-365fitbody/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/project-infobalkan/**': { headers: { 'cache-control': IMAGE_CACHE } },
    '/team/**': { headers: { 'cache-control': IMAGE_CACHE } },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://consulsoft.de',
    name: 'Consulsoft',
  },

  app: {
    head: {
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
        { property: 'og:image', content: 'https://consulsoft.de/og-image.jpg' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://consulsoft.de/og-image.jpg' },

        // Additional SEO
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#1C1C22' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
