<template>
    <section class="flex flex-col md:flex-row items-center justify-center w-full 
      min-h-screen p-6 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 space-y-10 md:space-y-0 md:space-x-12">
  
      <!-- Text Section -->
      <div class="text-left max-w-xl md:w-1/2">
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Hi, I'm <span class="text-cyan-400">Aaron Campos</span>
        </h1>
        <p class="text-base sm:text-lg md:text-2xl text-gray-400 animate-fade-in-slow">
          Software Engineer passionate about Cloud, Automation, and Building Reliable Systems.
        </p>
  
        <!-- Social Links -->
        <div class="mt-8 flex flex-wrap gap-6 animate-fade-in-slow">
          <NavLink class="text-xl" v-for="link in socialLinks" :key="link.name" :text="link.name" :href="link.url">
            <template #icon>
              <component :is="link.icon" class="w-6 h-6 sm:w-7 sm:h-7" />
            </template>
          </NavLink>
        </div>
      </div>
  
      <div class="w-full md:w-1/3 flex justify-center">
        <slot name="cube"></slot>
      </div>
    </section>
  </template>
  <script setup>
  import { gsap } from "gsap"
  import { onMounted, ref } from "vue"
  import NavLink from "../components/NavLink.vue"

//   import {
//       LinkedinIcon,
//       GithubIcon,
//       InstagramIcon,
//       FileArchiveIcon,
//   } from "lucide-vue-next"
  
  onMounted(() => {
      gsap.from(".text-left", {
          opacity: 0,
          duration: 4,
          ease: "power2.out",
      })
  })
  
  const socialLinks = ref([
      { name: "GitHub", url: "https://github.com/camposAaron", icon: null },
      {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/",
          icon: null,
      },
      { name: "Resume", url: "/resume.pdf", icon: null },
  ])
  </script>
  