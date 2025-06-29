import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  ssr: false,
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
  },
  runtimeConfig: {
     awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
     awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     awsRegion: process.env.AWS_REGION,
     contactFormReceiverEmail: process.env.CONTACT_FORM_RECEIVER_EMAIL,
     cvBucketName: process.env.CV_BUCKET_NAME,
     cvFileName: process.env.CV_FILE_NAME,
  }
})