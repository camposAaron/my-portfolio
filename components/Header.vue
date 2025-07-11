<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const mobileMenuOpen = ref(false)
const isShortMobile = computed(() => window.innerHeight < 600)
const navLinks = ref([
  { href: '#about', text: 'About' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' },
])

const headerRef = ref(null)
let headerScrollTrigger = null
let animation = null

onMounted(async () => {
  await nextTick()
  
  if (gsap && ScrollTrigger && headerRef.value) {
    // Kill any existing ScrollTriggers for this element
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === headerRef.value) {
        trigger.kill()
      }
    })

    gsap.set(headerRef.value, {
      backgroundColor: 'rgba(17, 24, 39, 0.8)'
    })

    animation = gsap.to(headerRef.value, {
      width: '80%',
      top: '20px',
      borderRadius: '20px',
      duration: 0.3,
      ease: 'power2.inOut',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(17, 24, 39, 0.8)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top top',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
        markers: false
      },
    })
    
    headerScrollTrigger = animation.scrollTrigger
    
    ScrollTrigger.refresh()
  }
})

onUnmounted(() => {
  // Kill only the header's ScrollTrigger instance
  if (headerScrollTrigger) {
    headerScrollTrigger.kill()
    headerScrollTrigger = null
  }
  if (animation) {
    animation.kill()
    animation = null
  }
})

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
      if (id === 'about') {
        el.scrollIntoView({ behavior: 'smooth', block: !isShortMobile.value ? 'start' : 'end' })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
  }
}
</script>

<style scoped>
header {
  background-color: rgba(17, 24, 39, 0.8);
  transition-property: background-color, box-shadow, height, border-color;
}
</style>
<template>
  <header
    ref="headerRef"
    style="background-color: rgba(17, 24, 39, 0.8);"
    class="font-heading sticky top-0  m-auto h-16 w-full border-b border-gray-900 bg-gray-900 shadow-md z-90"
  >
    <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo class="flex-shrink-0 text-xl" />
      <NavMenu
        class="not-[]:hidden items-center space-x-6 text-[12pt] font-semibold md:flex lg:space-x-8"
        :navLinks="navLinks"
        :scrollToSection="scrollToSection"
      />
      <div class="flex items-center space-x-4">
        <div class="md:hidden">
          <ToggleButton aria-label="Toggle mobile menu" @toggle="mobileMenuOpen = !mobileMenuOpen">
            <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3-bottom-left-16-solid" />
            <Icon v-else name="heroicons:x-mark-16-solid" />
          </ToggleButton>
        </div>
      </div>
    </div>
  </header>
  <MobileMenu
    v-model:mobileMenuOpen="mobileMenuOpen"
    :navLinks="navLinks"
    :scrollToSection="scrollToSection"
  />
</template>
