<template>
  <section id="contact" class="h-full  bg-gradient-to-t from-gray-600 to-white dark:from-gray-800 dark:to-gray-900 ">
      <div class="max-w-3xl mx-auto text-center px-6 py-20">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-fade-in bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text">
              Get in Touch
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-12 text-lg">
              Have a project in mind? Let's collaborate! I typically reply within 24 hours.
          </p>

          <div class="grid md:grid-cols-2 gap-8 text-left">
              <!-- Contact Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6 md:col-span-1">
                  <div>
                      <label for="name" class="block mb-2 text-gray-700 dark:text-gray-300">Name *</label>
                      <input v-model="formData.name" type="text" id="name"
                          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                          :class="{ 'border-red-500': errors.name }">
                      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                  </div>

                  <div>
                      <label for="email" class="block mb-2 text-gray-700 dark:text-gray-300">Email *</label>
                      <input v-model="formData.email" type="email" id="email"
                          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                          :class="{ 'border-red-500': errors.email }">
                      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                  </div>

                  <div>
                      <label for="message" class="block mb-2 text-gray-700 dark:text-gray-300">Message *</label>
                      <textarea v-model="formData.message" id="message" rows="4"
                          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                          :class="{ 'border-red-500': errors.message }"></textarea>
                      <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
                  </div>

                  <button type="submit" 
                      class="w-full bg-cyan-600 hover:bg-cyan-700 hover:cursor-pointer text-sm text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95">
                      Send Message
                  </button>
              </form>

              <!-- Contact Info & Social Links -->
              <div class="md:col-span-1 space-y-8">
                  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Direct Contact</h3>
                      <div class="space-y-4">
                          <div class="flex items-center space-x-3">
                              <MailIcon class="w-6 h-6 text-cyan-400" />
                              <a href="mailto:hi@yourdomain.com" class="text-gray-600 dark:text-gray-300 hover:text-cyan-600 transition-colors">
                                  hi@yourdomain.com
                              </a>
                          </div>
                          <div class="flex items-center space-x-3">
                              <MapPin class="w-6 h-6 text-cyan-400" />
                              <span class="text-gray-600 dark:text-gray-300">managua, Nicaragua</span>
                          </div>
                          <div class="flex items-center space-x-3">
                              <ClockIcon class="w-6 h-6 text-cyan-400" />
                              <span class="text-gray-600 dark:text-gray-300">🟢 Available for new projects</span>
                          </div>
                      </div>
                  </div>

                  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Let's Connect</h3>
                      <div class="flex justify-center space-x-6 hover:cursor-pointer">
                          <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                              class="text-gray-600  hover:text-cyan-400 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
                              :aria-label="social.name">
                              <component :is="social.icon" class="w-8 h-8 hover:bg-cyan-400" />
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div v-if="isSuccess" class="mt-8 p-4 bg-green-100 text-green-800 rounded-lg" role="alert">
               Message sent successfully! I'll get back to you soon.
          </div>
      </div>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue"
import * as yup from "yup"
// import {
// MailIcon,
// LinkedinIcon,
// GithubIcon,
// FileDownIcon,
// InstagramIcon,
// ClockIcon,
// MapPin,
// } from "lucide-vue-next"

// Form Handling
const formData = reactive({
name: "",
email: "",
message: "",
phoneNumber: "",
})

const errors = reactive({})
const isSubmitting = ref(false)
const isSuccess = ref(false)

const contactSchema = yup.object().shape({
name: yup.string().required("Name is required"),
email: yup
  .string()
  .email("Invalid email format")
  .required("Email is required"),
message: yup.string().required("Message is required"),
phoneNumber: yup.string().optional(),
})

const handleSubmit = async () => {
isSubmitting.value = true
try {
  await contactSchema.validate(formData, { abortEarly: false })

      // Reset form
      Object.keys(formData).forEach((key) => {
          formData[key] = ""
      })
      errors.value = {}
      isSuccess.value = true
      setTimeout(() => { isSuccess.value = false }, 5000)
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
{ name: "GitHub", url: "https://github.com/yourusername", icon: null },
{
  name: "LinkedIn",
  url: "https://linkedin.com/in/yourprofile",
  icon: null,
},
{ name: "Resume", url: "/resume.pdf", icon: null },
]
</script>