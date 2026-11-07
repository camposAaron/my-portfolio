<script setup>
import Picture from '../components/Picture.vue'
import { contact } from '~/data/contact'
</script>
<template>
  <section id="about" class="about" aria-labelledby="about-heading">
    <div class="container about__grid">
      <Picture class="picture-about" v-reveal />
      <div class="about__text" v-reveal="1">
        <h2 id="about-heading">{{ $t('about.title') }}</h2>
        <div id="about-desc" class="about__copy">
          <p>{{ $t('about.p1') }}</p>
          <p>{{ $t('about.p2') }}</p>
        </div>
        <ul class="about__facts">
          <li><Icon name="heroicons:map-pin-20-solid" />{{ $t('about.based', { location: contact.location }) }}</li>
          <li><Icon name="heroicons:briefcase-20-solid" />{{ $t('about.years') }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
