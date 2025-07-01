<script setup>
import { onMounted, onUnmounted } from 'vue'
import NavLink from '../components/NavLink.vue'

const { $gsap: gsap } = useNuxtApp()

let animations = []

onMounted(() => {
  if (gsap) {
    const greetingAnim = gsap.from('#greeting', {
      opacity: 0.1,
      y: 30,
      duration: 3,
      ease: 'elastic',
    })

    const fadeAnim = gsap.fromTo('.animate-fade-in-slow', {
      opacity: 0.1,
      duration: 1,
      y: 10
    }, {
      opacity: 1,
      duration: 1,
      y: 0
    })

    animations = [greetingAnim, fadeAnim]
  }
})

onUnmounted(() => {
  // Clean up animations
  animations.forEach(anim => {
    if (anim) {
      anim.kill()
    }
  })
  animations = []
})

const onLinkClicked = async (event, linkName) => {
  if (linkName === 'Resume') {
    try {
      const response = await $fetch('https://gshsimj431.execute-api.us-east-1.amazonaws.com/default/get-resume')
      const data = JSON.parse(response)
      const resumeUrl = data.resumeUrl

      window.open(resumeUrl, '_blank')

    } catch (error) {
      console.error('Error fetching resume:', error)
    }
  } else {
    console.log(`Link clicked: ${linkName}`)
  }
}

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/camposAaron', icon: 'entypo-social:github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/', icon: 'entypo-social:linkedin' },
  { name: 'Resume', icon: 'heroicons:document-arrow-down-solid' },
]
</script>

<template>
  <section id="hero"
    class="flex min-h-screen w-full flex-col items-center justify-center  bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 md:flex-row ">
    <div class="w-[80%] md:w-[90%] flex flex-row flex-wrap m-auto items-center justify-center space-y-10 space-x-10">
      <!-- Text Section -->
      <div class="max-w-xl text-left md:w-1/2 z-50">
        <h1 id="greeting" class="font-heading  mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">
          Hi, I'm <span class="text-cyan-400">Aaron Campos</span>
        </h1>
        <p class="font-body slow text-base text-gray-400 sm:text-lg md:text-2xl">
          Software Engineer passionate about Cloud, Automation, and Building Reliable Systems.
        </p>

        <!-- Social Links -->
        <div class="animate-fade-in-slow mt-8 flex flex-wrap gap-2 sm:gap-4 md:gap-6">
          <NavLink class="text-xl font-heading flex items-center gap-1" v-for="link in socialLinks" :key="link.name" :text="link.name"
            @click="onLinkClicked($event, link.name)" :href="link.url">
            <template #icon>
              <Icon :name="link.icon" class="h-5 w-5 sm:h-7 sm:w-7" />
            </template>
          </NavLink>
        </div>
      </div>
      <div id="cubeSlot" class="flex w-full justify-center md:w-1/3">
        <slot name="cube"></slot>
      </div>
    </div>
  </section>

</template>