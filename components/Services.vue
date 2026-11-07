<script setup>
// Scopes of work on offer, not a record of past contracts.
// Text for each one lives under services.items.<key> in i18n/locales.
const services = ['webapps', 'backend', 'cloud', 'automation']

function toContact(event) {
  const el = document.getElementById('contact')
  if (!el) return
  event.preventDefault()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
</script>

<template>
  <section id="services" class="services" aria-labelledby="services-heading">
    <div class="container services__grid">
      <div class="services__head" v-reveal>
        <h2 id="services-heading">{{ $t('services.title') }}</h2>
        <p>{{ $t('services.intro') }}</p>
        <a href="#contact" class="btn" @click="toContact">{{ $t('services.cta') }}</a>
      </div>
      <ol class="services__list">
        <li v-for="(service, i) in services" :key="service" v-reveal="i" class="service">
          <span class="service__num mono" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ $t(`services.items.${service}.title`) }}</h3>
          <p>{{ $t(`services.items.${service}.text`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
