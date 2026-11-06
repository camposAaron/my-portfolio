<script setup>
import Picture from '../components/Picture.vue'
import { contact } from '~/data/contact'
</script>
<template>
  <section id="about" class="about" aria-labelledby="about-heading">
    <div class="container about__grid">
      <Picture class="picture-about" />
      <div class="about__text">
        <h2 id="about-heading">About me</h2>
        <div id="about-desc" class="about__copy">
          <p>
            I’m a systems engineer working in software development, with experience across frontend, backend,
            and cloud technologies. My work includes employee self-service software, where interfaces and
            services support specific tasks such as downloading payroll documents, requesting leave, and
            managing internal information.
          </p>
          <p>
            My main tools include TypeScript, Vue.js, Node.js, and PostgreSQL, alongside AWS, Docker, and
            Kubernetes. I’m looking for a software engineering role where I can contribute to useful products
            and continue developing my skills in cloud infrastructure and automation.
          </p>
        </div>
        <ul class="about__facts">
          <li><Icon name="heroicons:map-pin-20-solid" />Based in {{ contact.location }}</li>
          <li><Icon name="heroicons:briefcase-20-solid" />3+ years in software development</li>
        </ul>
      </div>
    </div>
  </section>
</template>
