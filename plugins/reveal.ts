// v-reveal: fades an element in (opacity + 12px rise) the first time it enters the viewport.
//   <h2 v-reveal>          reveal on its own
//   <li v-reveal="i">      reveal with a 70ms stagger per index
// Content is only hidden once this script has run and marked <html> with .reveal-ready,
// so the page stays fully visible if JavaScript fails. Under prefers-reduced-motion
// nothing is hidden and nothing moves. Elements get .is-in once revealed (used by the
// skills diagram to start its one-time pulse).
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  function observer() {
    if (io) return io
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io!.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    return io
  }

  nuxtApp.vueApp.directive('reveal', {
    // Only the marker attribute is rendered on the server; the stagger index is set on the
    // client, so it never conflicts with an element's own :style during hydration.
    getSSRProps() {
      return { 'data-reveal': '' }
    },
    mounted(el: HTMLElement, binding) {
      el.setAttribute('data-reveal', '')
      if (typeof binding.value === 'number') el.style.setProperty('--i', String(binding.value))
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        el.classList.add('is-in')
        return
      }
      observer().observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })

  nuxtApp.hook('app:mounted', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('reveal-ready')
    }
  })
})
