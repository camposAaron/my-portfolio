import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],
  i18n: {
    // English stays at /, Spanish lives at /es.
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'es', language: 'es-NI', name: 'Español' },
    ],
    // First visit to /: send Spanish-speaking browsers to /es once, then respect the choice.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head:{
      title: "</AaronDev>",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=coral-ac-1', sizes: '16x16 32x32 48x48 64x64 128x128 256x256' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32.png?v=coral-ac-1', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=coral-ac-1', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=coral-ac-1', sizes: '180x180' },
      ],
      script: [
        { innerHTML: "document.documentElement.classList.add('js')", tagPosition: 'head' },
      ],
    },

  },
  googleFonts: {
    display: 'swap',
    families: {
      'Space Grotesk': [500, 600],
      'Host Grotesk': [400, 500],
      'Atkinson Hyperlegible Mono': [400],
    }
  },
  icon:{
    mode: 'svg'
  }
})
