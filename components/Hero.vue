<template>
  <section
    class="flex min-h-screen w-full flex-col items-center justify-center space-y-10 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 p-6 md:flex-row md:space-y-0 md:space-x-12"
  >
    <!-- Text Section -->
    <div class="max-w-xl text-left md:w-1/2">
      <h1 class="animate-fade-in mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">
        Hi, I'm <span class="text-cyan-400">Aaron Campos</span>
      </h1>
      <p class="animate-fade-in-slow text-base text-gray-400 sm:text-lg md:text-2xl">
        Software Engineer passionate about Cloud, Automation, and Building Reliable Systems.
      </p>

      <!-- Social Links -->
      <div class="animate-fade-in-slow mt-8 flex flex-wrap gap-6">
        <NavLink
          class="text-xl"
          v-for="link in socialLinks"
          :key="link.name"
          :text="link.name"
          :href="link.url"
        >
          <template #icon>
            <Icon :name="link.icon" class="h-6 w-6 sm:h-7 sm:w-7" />
          </template>
        </NavLink>
      </div>
    </div>

    <div class="flex w-full justify-center md:w-1/3">
      <slot name="cube"></slot>
    </div>
  </section>
</template>
<script setup>
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import NavLink from '../components/NavLink.vue'

onMounted(() => {
  gsap.from('.text-left', {
    opacity: 0,
    duration: 4,
    ease: 'power2.out',
  })
})

const socialLinks = ref([
  {
    name: 'GitHub',
    url: 'https://github.com/camposAaron',
    icon: 'entypo-social:github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/',
    icon: 'entypo-social:linkedin',
  },
  {
    name: 'Resume',
    url: '/resume.pdf',
    icon: 'heroicons:document-arrow-down-solid',
  },
])
</script>
