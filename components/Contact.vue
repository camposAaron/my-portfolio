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
      <div class="contact__aside" v-reveal>
        <h2 id="contact-heading">{{ $t('contactSection.title') }}</h2>
        <p class="contact__intro">{{ $t('contactSection.intro') }}</p>
        <div class="contact__resume">
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
          <p v-if="failed" class="hero__error" role="alert">
          <i18n-t keypath="resume.failed">
            <template #email><a class="link" :href="`mailto:${contact.email}`">{{ contact.email }}</a></template>
          </i18n-t>
        </p>
        </div>
        <ContactInfo />
      </div>

      <div class="contact__main" v-reveal="1">
        <ContactForm @success="handleSuccess" />
        <SuccessMessage :show="isSuccess" />
      </div>
    </div>
  </section>
</template>
