<script setup>
import { ref, reactive } from 'vue'
import * as yup from 'yup'
import FormField from './FormField.vue'

const emit = defineEmits(['success'])


// Form Handling
const formData = reactive({
  name: '',
  email: '',
  message: '',
  phoneNumber: '',
})

const errors = reactive({})
const isSubmitting = ref(false)

// Validation messages are i18n keys; the template translates them, so they follow a language switch.
const { t } = useI18n()
const errorText = (key) => (key ? t(key) : '')

const contactSchema = yup.object().shape({
  name: yup.string().required('form.errors.nameRequired'),
  email: yup.string().email('form.errors.emailInvalid').required('form.errors.emailRequired'),
  message: yup.string().required('form.errors.messageRequired'),
  phoneNumber: yup.string().optional(),
})

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

const handleSubmit = async () => {
  isSubmitting.value = true
  clearErrors()
  try {
    await contactSchema.validate(formData, { abortEarly: false })

    console.log(formData)
    const response = await $fetch('https://gshsimj431.execute-api.us-east-1.amazonaws.com/default/send-contact-email', {
      method: 'POST',
      body: formData,
    })

    if (!response)
      throw new Error('Failed to send message')

    emit('success')

    // Clear form data
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
    clearErrors()
  } catch (err) {
    // Show each validation message under its field and move focus to the first one.
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((e) => {
        if (e.path && !errors[e.path]) errors[e.path] = e.message
      })
      const first = ['name', 'email', 'message'].find((key) => errors[key])
      if (first) document.getElementById(first)?.focus()
    }
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form contact-form" novalidate>
    <FormField v-model="formData.name" :label="$t('form.name')" type="text" id="name" autocomplete="name" :error="errorText(errors.name)" />

    <FormField v-model="formData.email" :label="$t('form.email')" type="email" id="email" autocomplete="email" :error="errorText(errors.email)" />

    <FormField v-model="formData.message" :label="$t('form.message')" type="textarea" id="message" :error="errorText(errors.message)"
      :rows="5" />

    <button type="submit" :disabled="isSubmitting" :aria-busy="isSubmitting ? 'true' : undefined" class="btn btn--primary">
      {{ isSubmitting ? $t('form.sending') : $t('form.send') }}
    </button>
  </form>
</template>
