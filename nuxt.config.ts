import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
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
      title: "<aaronDev/>"
    }
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