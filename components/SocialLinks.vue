<script setup>
import { contact, whatsappUrl } from '~/data/contact'

// One icon set for every social link on the page (Entypo Social), drawn at the same size.
defineProps({
  /** 'icons' shows round icon buttons; 'list' shows icon + label rows. */
  variant: { type: String, default: 'icons' },
  showEmail: { type: Boolean, default: false },
})

const links = [
  ...[{ name: 'Email', label: contact.email, url: `mailto:${contact.email}`, icon: 'heroicons:envelope-20-solid', email: true }],
  { name: 'LinkedIn', label: 'Josué Aaron Campos', url: contact.linkedin, icon: 'entypo-social:linkedin' },
  { name: 'GitHub', label: 'github.com/camposAaron', url: contact.github, icon: 'entypo-social:github' },
  ...(whatsappUrl ? [{ name: 'WhatsApp', label: 'Message me on WhatsApp', url: whatsappUrl, icon: 'heroicons:chat-bubble-left-right-20-solid' }] : []),
]
</script>

<template>
  <ul v-if="variant === 'icons'" class="socials">
    <li v-for="link in links.filter((l) => showEmail || !l.email)" :key="link.name">
      <a
        class="social"
        :href="link.url"
        :target="link.email ? undefined : '_blank'"
        :rel="link.email ? undefined : 'noopener'"
        :aria-label="link.name"
        :title="link.name"
      >
        <Icon :name="link.icon" />
      </a>
    </li>
  </ul>
  <ul v-else class="contact-links social-links">
    <li v-for="link in links.filter((l) => showEmail || !l.email)" :key="link.name">
      <a
        class="contact-link"
        :href="link.url"
        :target="link.email ? undefined : '_blank'"
        :rel="link.email ? undefined : 'noopener'"
      >
        <span class="contact-link__icon"><Icon :name="link.icon" /></span>
        <span class="contact-link__text">
          <span class="contact-link__name">{{ link.name }}</span>
          <span class="contact-link__label">{{ link.label }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>
