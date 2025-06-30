import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head:{ 
      title: "</AaronDev>",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      ]
    },
    
  },
  googleFonts: {
    display: 'swap',
    families: {
       'Space Grotesk': {
        wght: '300..700'
       },
       'Inter': {
         wght: '300..700'
      }
    }
  },
  icon:{
    mode: 'svg'
  }
})