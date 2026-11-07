<script setup>
import { contact } from '~/data/contact'
import { useResume } from '~/composables/useResume'

const { openResume, loading, failed } = useResume()

// Same behaviour as the header links: smooth unless reduced motion, then move focus there.
function goTo(event, id) {
  const el = document.getElementById(id)
  if (!el) return
  event.preventDefault()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
</script>

<template>
  <section id="hero" class="hero" aria-labelledby="greeting">
    <HeroField />
    <div class="container hero__grid">
      <div class="hero__text">
        <p class="hero__id">
          <span class="hero__name">{{ contact.name }}</span>
          <span class="hero__role">· {{ $t('contact.role') }}</span>
        </p>
        <h1 id="greeting">
          {{ $t('hero.line1') }}<br />
          {{ $t('hero.line2') }}<br />
          {{ $t('hero.line3') }}
        </h1>
        <p class="hero__intro">{{ $t('hero.intro') }}</p>
        <p class="status"><span class="status__dot" aria-hidden="true"></span>{{ $t('contact.status') }}</p>
        <div class="hero__actions">
          <a href="#contact" class="btn btn--primary" @click="goTo($event, 'contact')">{{ $t('hero.startProject') }}</a>
          <button
            type="button"
            class="btn"
            :aria-busy="loading ? 'true' : undefined"
            :disabled="loading"
            @click="openResume"
          >
            <Icon name="heroicons:arrow-down-tray-20-solid" />
            {{ loading ? $t('resume.opening') : $t('resume.download') }}
          </button>
          <SocialLinks />
        </div>
        <p v-if="failed" class="hero__error" role="alert">
          <i18n-t keypath="resume.failed">
            <template #email><a class="link" :href="`mailto:${contact.email}`">{{ contact.email }}</a></template>
          </i18n-t>
        </p>
      </div>
      <div id="cubeSlot">
        <slot name="cube"></slot>
      </div>
    </div>
  </section>
</template>
