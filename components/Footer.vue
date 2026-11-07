<script setup>
import { contact } from '~/data/contact'

const year = new Date().getFullYear()
</script>
<template>
  <footer class="footer">
    <div class="container footer__in">
      <div class="footer__sign">
        <p>{{ contact.name }}</p>
        <p>{{ $t('contact.role') }}, {{ contact.location }}</p>
      </div>
      <div class="footer__meta">
        <SocialLinks />
        <Logo size="lg" />
        <time :datetime="String(year)">{{ year }}</time>
      </div>
    </div>
  </footer>
</template>
