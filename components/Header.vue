<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)
const activeHref = ref('')

const navLinks = computed(() => [
  { href: '#projects', text: t('nav.work') },
  { href: '#about', text: t('nav.about') },
  { href: '#skills', text: t('nav.skills') },
  { href: '#services', text: t('nav.services') },
  { href: '#contact', text: t('nav.contact') },
])

// Current section: the one crossing a band just below the header.
let sectionObserver = null
onMounted(() => {
  const visible = new Map()
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) visible.set(e.target.id, e.isIntersecting)
      const current = navLinks.value.find((l) => visible.get(l.href.slice(1)))
      activeHref.value = current ? current.href : ''
    },
    { rootMargin: '-35% 0px -60% 0px' },
  )
  for (const l of navLinks.value) {
    const el = document.getElementById(l.href.slice(1))
    if (el) sectionObserver.observe(el)
  }
})
onUnmounted(() => {
  sectionObserver?.disconnect()
})

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
      <NavMenu :navLinks="navLinks" :scrollToSection="scrollToSection" :activeHref="activeHref" />
      <div class="bar__end">
        <LangSwitch />
        <div class="bar__toggle">
          <ToggleButton :ariaLabel="$t('nav.openMenu')" @toggle="mobileMenuOpen = !mobileMenuOpen">
            <Icon name="heroicons:bars-3-16-solid" />
          </ToggleButton>
        </div>
      </div>
    </div>
  </header>
  <MobileMenu
    v-model:mobileMenuOpen="mobileMenuOpen"
    :navLinks="navLinks"
    :scrollToSection="scrollToSection"
    :activeHref="activeHref"
  />
</template>
