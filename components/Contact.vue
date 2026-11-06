<script setup>
import { ref } from 'vue'
import { contact } from '~/data/contact'
import { useResume } from '~/composables/useResume'
import ContactForm from './ContactForm.vue'
import ContactInfo from './ContactInfo.vue'
import SuccessMessage from './SuccessMessage.vue'

const { openResume, loading, failed } = useResume()
const isSuccess = ref(false)

const handleSuccess = () => {
  isSuccess.value = true
  setTimeout(() => {
    isSuccess.value = false
  }, 5000)
}
</script>
<template>
  <section id="contact" class="contact" aria-labelledby="contact-heading">
    <div class="container contact__grid">
      <div class="contact__aside">
        <h2 id="contact-heading">Let’s talk about your team or project.</h2>
        <p class="contact__intro">
          If you’re hiring a software engineer, I’d like to hear what your team is building and where I could
          contribute. For project work, tell me about the workflow you want to improve, the system you already
          have, and the scope you have in mind.
        </p>
        <div class="contact__resume">
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
          <p v-if="failed" class="hero__error" role="alert">
            The résumé didn’t open. Try again, or write to
            <a class="link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>.
          </p>
        </div>
        <ContactInfo />
      </div>

      <div class="contact__main">
        <ContactForm @success="handleSuccess" />
        <SuccessMessage :show="isSuccess" />
      </div>
    </div>
  </section>
</template>
