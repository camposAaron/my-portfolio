<template>
  <div class="contact-info space-y-8 md:col-span-1">
    <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 class="font-heading mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Direct Contact
      </h3>
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <a
            href="mailto:campos.aaron.15@gmail.com"
            class="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300"
          >
            campos.aaron.15@gmail.com
          </a>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-gray-600 dark:text-gray-300">managua, Nicaragua</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-gray-600 dark:text-gray-300">🟢 Available for new projects</span>
        </div>
      </div>
    </div>

    <div class="font-heading rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Let's Connect
      </h3>
      <div class="social-links flex justify-center space-x-6 hover:cursor-pointer">
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
</template>

<script setup>
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/camposAaron', icon: 'entypo-social:github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/',
    icon: 'entypo-social:linkedin',
  },
  { name: 'Instagram', url: '/resume.pdf', icon: 'entypo-social:instagram' },
]
</script> 