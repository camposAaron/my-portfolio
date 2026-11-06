<script setup>
import { contact } from '~/data/contact'
import { useResume } from '~/composables/useResume'

const { openResume, loading, failed } = useResume()

function viewWork(event) {
  const el = document.getElementById('projects')
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
          <span class="hero__role">· {{ contact.role }}</span>
        </p>
        <h1 id="greeting">
          Web applications.<br />
          Backend services.<br />
          Cloud infrastructure.
        </h1>
        <p class="hero__intro">
          I’m a software engineer based in Managua, Nicaragua, with 3+ years of experience building web
          applications. My work spans interfaces, backend services, and cloud technologies, including an
          employee self-service platform for payroll documents, leave requests, and internal workflows.
        </p>
        <p class="status"><span class="status__dot" aria-hidden="true"></span>{{ contact.status }}</p>
        <div class="hero__actions">
          <a href="#projects" class="btn btn--primary" @click="viewWork">View my work</a>
          <button
            type="button"
            class="btn"
            :aria-busy="loading ? 'true' : undefined"
            :disabled="loading"
            @click="openResume"
          >
            <Icon name="heroicons:arrow-down-tray-20-solid" />
            {{ loading ? 'Opening…' : 'Download résumé' }}
          </button>
          <SocialLinks />
        </div>
        <p v-if="failed" class="hero__error" role="alert">
          The résumé didn’t open. Try again, or write to
          <a class="link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>.
        </p>
      </div>
      <div id="cubeSlot">
        <slot name="cube"></slot>
      </div>
    </div>
  </section>
</template>
