<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'
import Picture from '../components/Picture.vue'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

let tl = null
let scrollTrigger = null

onMounted(async () => {
  await nextTick()

  if (gsap && ScrollTrigger) {
    const aboutSection = document.querySelector('#about')

    if (aboutSection) {
      gsap.set(['.picture-about'], {
        opacity: 0,
        x: -50,
      })
      gsap.set('#about-heading', {
        opacity: 0,
        y: -20
      })
      gsap.set(['#about-desc', '#projects-button'], {
        opacity: 0,
        x: 20
      })

      // Create main timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      })

      // Store ScrollTrigger instance for cleanup
      scrollTrigger = tl.scrollTrigger

      // Animate picture
      tl.to('.picture-about', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Animate heading
      tl.to('#about-heading', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.5')

      // Animate description and button together
      tl.to(['#about-desc', '#projects-button'], {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.3')
    }
  }
})

onUnmounted(() => {
  // Clean up timeline and ScrollTrigger
  if (scrollTrigger) {
    scrollTrigger.kill()
    scrollTrigger = null
  }
  if (tl) {
    tl.kill()
    tl = null
  }
})
</script>
<template>
  <section id="about"
    class="font-body flex w-full flex-col items-center justify-center bg-gray-950 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 py-16 sm:py-24">
    <div
      class="w-[80%] md:w-[90%] flex flex-row flex-wrap items-center justify-center gap-12 px-4 sm:px-6 md:flex-row md:gap-16 lg:gap-20 lg:px-8">
      <Picture class="picture-about  shadow-[0_0_15px_rgba(34,211,238,0.5)"></Picture>
      <div class="animate-fade-in-on-scroll-delay max-w-3xl text-center md:text-left">
        <h2 id="about-heading"
          class="font-heading mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-[#fcfdff] from-33%  to-[#818dc0] to-100%">
          About Me
        </h2>
        <p id="about-desc" class="font-body mb-8 text-lg leading-relaxed text-slate-400 sm:text-xl dark:text-slate-400">
          I'm a passionate developer transitioning into the world of DevOps. With a background in
          web development and a love for automation, I'm focused on building efficient, scalable,
          and reliable systems. Always learning, always improving — ready to tackle challenges in
          Cloud, CI/CD, and Infrastructure as Code!
        </p>
        <a href="#projects" id="projects-button"
          class="inline-block rounded-md bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-[0_0_15px_rgba(34,211,238,0.5)] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none">
          View My Projects
        </a>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* Ensure elements are visible by default */
.picture-about,
#about-heading,
#about-desc,
#projects-button {
  opacity: 1;
  transform: translateY(0);
}
</style>
