import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis: Lenis | null = null
  let rafId: number | null = null

  const initLenis = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    const raf = (time: number) => {
      if (lenis) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
    }

    rafId = requestAnimationFrame(raf)
  }

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  // Initialize Lenis on client side
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      initLenis()
    })
  }

  return {
    provide: {
      lenis: () => lenis,
      initLenis,
      destroyLenis,
    },
  }
}) 