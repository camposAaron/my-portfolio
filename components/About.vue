<template>
  <section
    id="about"
    class="flex w-full flex-row items-center justify-center bg-gray-950 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 py-16 sm:py-24 dark:bg-gray-900"
  >
    <div
      class="flex flex-col items-center gap-12 px-4 sm:px-6 md:flex-row md:gap-16 lg:gap-20 lg:px-8"
    >
      <Picture class="picture-about"></Picture>
      <div class="animate-fade-in-on-scroll-delay max-w-3xl text-center md:text-left">
        <h2
          id="about-heading"
          class="font-heading mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl dark:text-slate-100"
        >
          About Me
        </h2>
        <p id="about-desc"
          class="font-body mb-8 text-lg leading-relaxed text-slate-400 sm:text-xl dark:text-slate-400"
        >
          I'm a passionate developer transitioning into the world of DevOps. With a background in
          web development and a love for automation, I'm focused on building efficient, scalable,
          and reliable systems. Always learning, always improving — ready to tackle challenges in
          Cloud, CI/CD, and Infrastructure as Code!
        </p>
        <a
          href="#projects"
          id="projects-button"
          class="inline-block rounded-md bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-offset-gray-900"
        >
          View My Projects
        </a>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'
import Picture from '../components/Picture.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let tl = null

onMounted(() => {
  nextTick(() => {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        // Remove markers in production
        markers: false,
      },
    })

    tl.from('.picture-about', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out',
    })

    tl.from(
      '#about-heading',
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5',
    )

    gsap.from(['#projects-button', '#about-desc'], {
      scrollTrigger:{
        trigger: '#about',
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: true
      },
      opacity: 0.1,
      duration: 1.5,
      x: 30
    })

  })
})

onUnmounted(() => {
  if (tl) {
    tl.kill()
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped></style>
