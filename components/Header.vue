<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const navLinks = ref([
  { href: '#projects', text: 'Work' },
  { href: '#about', text: 'About' },
  { href: '#skills', text: 'Skills' },
  { href: '#services', text: 'Services' },
  { href: '#contact', text: 'Contact' },
])

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    // Move focus to the section so keyboard and screen reader users land there too.
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}
</script>

<template>
  <header class="bar">
    <div class="container bar__in">
      <Logo />
      <NavMenu :navLinks="navLinks" :scrollToSection="scrollToSection" />
      <div class="bar__toggle">
        <ToggleButton ariaLabel="Open the menu" @toggle="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="heroicons:bars-3-16-solid" />
        </ToggleButton>
      </div>
    </div>
  </header>
  <MobileMenu
    v-model:mobileMenuOpen="mobileMenuOpen"
    :navLinks="navLinks"
    :scrollToSection="scrollToSection"
  />
</template>
