<template>
  <section id="about" class="flex flex-row items-center justify-center w-full
     bg-gray-950 dark:bg-gray-900 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 py-16 sm:py-24">
    <div class="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
      <Picture class="picture-about"></Picture>
      <div class="max-w-3xl text-center md:text-left animate-fade-in-on-scroll-delay">
        <h2 id="about-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-6  dark:text-slate-100
          bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text
          ">
          About Me
        </h2>
        <p class="text-lg sm:text-xl font-body text-slate-400 dark:text-slate-400 leading-relaxed mb-8">
          I'm a passionate developer transitioning into the world of DevOps.
          With a background in web development and a love for automation,
          I'm focused on building efficient, scalable, and reliable systems.
          Always learning, always improving — ready to tackle challenges in Cloud, CI/CD, and Infrastructure as Code!
        </p>

        <a href="#projects"
          class="inline-block rounded-md bg-cyan-600 dark:bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-gray-900 transition ease-in-out duration-150">
          View My Projects
        </a>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from "vue"
import Picture from "../components/Picture.vue"
import { gsap } from "gsap"

onMounted(() => {
	gsap.from(".picture-about", {
		opacity: 0,
		duration: 2,
		ease: "power2.out",
	})
})
</script>

<style scoped>
</style>