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

const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().required('Message is required'),
  phoneNumber: yup.string().optional(),
})

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await contactSchema.validate(formData, { abortEarly: false })

    // Clear form data
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
    errors.value = {}

    const response = await $fetch('https://gshsimj431.execute-api.us-east-1.amazonaws.com/default/send-contact-email', {
      method: 'POST',
      body: formData,
    })

    if (!response || response.status !== 200)
      throw new Error('Failed to send message')

    emit('success')
  } catch (err) {
    err.inner.forEach((error) => {
      errors[error.path] = error.message
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col space-y-6 md:col-span-1">
    <FormField v-model="formData.name" label="Name *" type="text" id="name" :error="errors.name" />

    <FormField v-model="formData.email" label="Email *" type="email" id="email" :error="errors.email" />

    <FormField v-model="formData.message" label="Message *" type="textarea" id="message" :error="errors.message"
      :rows="4" />

    <button type="submit" :disabled="isSubmitting"
      class="w-full opacity-100 transform rounded-lg bg-cyan-600 py-3 px-6 text-sm font-semibold text-white transition-all hover:cursor-pointer hover:bg-cyan-700 active:scale-95">
      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>