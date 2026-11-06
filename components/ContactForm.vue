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
    <FormField v-model="formData.name" label="Name *" type="text" id="name" autocomplete="name" :error="errors.name" />

    <FormField v-model="formData.email" label="Email *" type="email" id="email" autocomplete="email" :error="errors.email" />

    <FormField v-model="formData.message" label="Message *" type="textarea" id="message" :error="errors.message"
      :rows="5" />

    <button type="submit" :disabled="isSubmitting" :aria-busy="isSubmitting ? 'true' : undefined" class="btn btn--primary">
      {{ isSubmitting ? 'Sending…' : 'Send message' }}
    </button>
  </form>
</template>
