<script setup>
// Scopes of work on offer, not a record of past contracts.
const services = [
  {
    title: 'Business web applications',
    text: 'Build or extend internal tools, dashboards, and self-service applications for specific business workflows, using Vue.js, TypeScript, and a Node.js backend.',
  },
  {
    title: 'Backend services & integrations',
    text: 'Develop APIs and backend features, connect application components, and work with PostgreSQL to support the data behind business processes.',
  },
  {
    title: 'Cloud deployment & containers',
    text: 'Help prepare and deploy web applications using AWS and container-based tooling, with the scope defined around the application’s requirements.',
  },
  {
    title: 'Workflow automation',
    text: 'Identify repetitive steps in an existing process and build focused tools or integrations to reduce manual handling.',
  },
]

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
        <h2 id="services-heading">Ways I can help</h2>
        <p>
          Alongside my search for a software engineering role, I’m open to discussing focused development
          projects. These are the areas where my current experience can contribute.
        </p>
        <a href="#contact" class="btn" @click="toContact">Discuss a project</a>
      </div>
      <ol class="services__list">
        <li v-for="(service, i) in services" :key="service.title" v-reveal="i" class="service">
          <span class="service__num mono" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
