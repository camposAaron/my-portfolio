<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const mobileMenuOpen = ref(false)
const isShortMobile = computed(() => window.innerHeight < 600)
const navLinks = ref([
  { href: '#about', text: 'About' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' },
])

onMounted(() => {
  nextTick(() => {
    gsap.to('header', {
      width: '80%',
      top: '20',
      borderRadius: '20px',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: 'header',
        start: 'top top',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
        markers: true,
      },
    })
  })
})

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    if (id === 'about') {
      console.log('isShortMobile:', isShortMobile.value)
      el.scrollIntoView({ behavior: 'smooth', block: !isShortMobile ? 'start' : 'end' })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
header {
  transition-property:
    background-color, box-shadow, height, border-color; /* Include height and border */
}
</style>
<template>
  <header
    class="font-heading sticky top-0 z-50 m-auto h-16 w-full border-b border-gray-900 bg-gray-900 shadow-md transition-all duration-300 ease-in-out"
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
    <MobileMenu
      v-model:mobileMenuOpen="mobileMenuOpen"
      :navLinks="navLinks"
      :scrollToSection="scrollToSection"
    />
  </header>
</template>
