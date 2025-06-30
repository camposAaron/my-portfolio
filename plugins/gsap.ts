import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {

    gsap.registerPlugin(ScrollTrigger)
    
    // Integrate GSAP ScrollTrigger with Lenis
    nuxtApp.hook('app:mounted', () => {
      const { $lenis } = useNuxtApp()
      
      if ($lenis) {
        const lenisInstance = $lenis()
        if (lenisInstance) {
          lenisInstance.on('scroll', ScrollTrigger.update)
          
          gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000)
          })
          
          gsap.ticker.lagSmoothing(0)
        }
      }
    })

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
