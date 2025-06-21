<template>
  <section
    id="contact"
    class="font-body bg-gradient-to-b from-gray-800 to-white dark:to-gray-900 pt-20"
  >
    <div class="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2
        class="font-heading animate-fade-in mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
      >
        Get in Touch
      </h2>
      <p class="mb-12 text-lg text-gray-600 dark:text-gray-300">
        Have a project in mind? Let's collaborate! I typically reply within 24 hours.
      </p>

      <div class="grid gap-8 text-left md:grid-cols-2">
        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6 md:col-span-1">
          <div>
            <label for="name" class="mb-2 block text-gray-700 dark:text-gray-300">Name *</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="mb-2 block text-gray-700 dark:text-gray-300">Email *</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <label for="message" class="mb-2 block text-gray-700 dark:text-gray-300"
              >Message *</label
            >
            <textarea
              v-model="formData.message"
              id="message"
              rows="4"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800"
              :class="{ 'border-red-500': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
          </div>

          <button
            type="submit"
            class="w-full transform rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:cursor-pointer hover:bg-cyan-700 active:scale-95"
          >
            Send Message
          </button>
        </form>

        <!-- Contact Info & Social Links -->
        <div class="space-y-8 md:col-span-1">
          <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 class="font-heading mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              Direct Contact
            </h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <!-- <MailIcon class="w-6 h-6 text-cyan-400" /> -->
                <a
                  href="mailto:hi@yourdomain.com"
                  class="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300"
                >
                  hi@yourdomain.com
                </a>
              </div>
              <div class="flex items-center space-x-3">
                <!-- <MapPin class="w-6 h-6 text-cyan-400" /> -->
                <span class="text-gray-600 dark:text-gray-300">managua, Nicaragua</span>
              </div>
              <div class="flex items-center space-x-3">
                <!-- <ClockIcon class="w-6 h-6 text-cyan-400" /> -->
                <span class="text-gray-600 dark:text-gray-300">🟢 Available for new projects</span>
              </div>
            </div>
          </div>

          <div class="font-heading rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              Let's Connect
            </h3>
            <div class="flex justify-center space-x-6 hover:cursor-pointer">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="text-gray-400 transition-colors hover:text-cyan-400"
                :aria-label="social.name"
              >
                <Icon :name="social.icon" size="1.8em" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isSuccess" class="mt-8 rounded-lg bg-green-100 p-4 text-green-800" role="alert">
        Message sent successfully! I'll get back to you soon.
      </div>
    </div>
    
  </section>

</template>
<script setup>
import { ref, reactive } from 'vue'
import * as yup from 'yup'
// Form Handling
const formData = reactive({
  name: '',
  email: '',
  message: '',
  phoneNumber: '',
})

const errors = reactive({})
const isSubmitting = ref(false)
const isSuccess = ref(false)

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

    // Reset form
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
    errors.value = {}
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
    }, 5000)
  } catch (err) {
    err.inner.forEach((error) => {
      errors[error.path] = error.message
    })
  } finally {
    isSubmitting.value = false
  }
}

// Social Links
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'entypo-social:github' },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
    icon: 'entypo-social:linkedin',
  },
  { name: 'Instagran', url: '/resume.pdf', icon: 'entypo-social:instagram' },
]
</script>
