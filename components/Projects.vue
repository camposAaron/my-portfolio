<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const showDialog = ref(false)
const selectedImage = ref('')
const currentImageIndex = ref(0)
const areProjectsVisible = ref(false)
let entranceAnimations = []

function openDialog(image) {
  selectedImage.value = image
  showDialog.value = true
}

function closeDialog() {
  selectedImage.value = false
  showDialog.value = false
}

function updateCurrentIndex(index) {
  currentImageIndex.value = index
}

function setupEntranceAnimations() {
  if (!gsap || !ScrollTrigger) return

  const projectsSection = document.querySelector('#projects')
  if (!projectsSection) return

  // Entrance animations for section elements
  const entranceTl = gsap.timeline({
    scrollTrigger: {
      trigger: projectsSection,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
  })

  // Animate heading and description
  entranceTl.from('.animate-fade-in', {
    opacity: 0,
    y: 30,
    duration: 0.3,
    ease: 'power2.out',
  })

  // Animate project text content
  entranceTl.from(
    '.project-text',
    {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: 'power2.out',
    },
    '-=0.4',
  )

  // Animate technology icons with stagger
  entranceTl.from(
    '.autSkills .flex',
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    },
    '-=0.2',
  )

  // Animate mobile slider items
  entranceTl.from(
    '.project-image-item-mobile',
    {
      opacity: 0,
      y: 50,
      duration: 0.3,
      stagger: 0.2,
      ease: 'power2.out',
    },
    '-=0.3',
  )

  // Animate slider dots
  entranceTl.from(
    '.slider-dots button',
    {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    },
    '-=0.2',
  )

  entranceAnimations.push(entranceTl)
}

onMounted(() => {
  // Setup entrance animations
  setupEntranceAnimations()

  // Setup intersection observer for Projects section
  const projectsSection = document.getElementById('projects')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        areProjectsVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.1 },
  ) // Trigger when at least 10% of the section is visible

  if (projectsSection) {
    observer.observe(projectsSection)
  }
})

onUnmounted(() => {
  // Clean up entrance animations
  entranceAnimations.forEach((anim) => {
    if (anim) {
      anim.kill()
    }
  })
  entranceAnimations = []
})

const images = [
  { name: 'Autogestion-login', src: '/projects/aut/profile.webm' },
  { name: 'PTOS', src: '/projects/aut/ptos.webm' },
  { name: 'Letters', src: '/projects/aut/letters.webm' },
]

const autSkills = [
  { name: 'Vue.js', icon: 'skill-icons:vuejs-dark' },
  { name: 'Typescript', icon: 'skill-icons:typescript' },
  { name: 'Express', icon: 'skill-icons:expressjs-dark' },
  { name: 'Postgres', icon: 'skill-icons:postgresql-dark' },
  { name: 'AWS', icon: 'skill-icons:aws-dark' },
  { name: 'K8s', icon: 'skill-icons:kubernetes' },
]
</script>
<template>
  <section id="projects"
    class="flex min-h-screen flex-col bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 pt-30 pb-20">
    <ProjectHeader />

    <div class="relative flex flex-row w-[90%] sm:w-[80%] m-auto">
      <div class="relative grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-6 lg:gap-12">
        <!-- Desktop Description -->
        <div class="project-text sticky top-32 col-span-3 hidden h-[calc(100vh-12rem)] w-full items-center lg:flex">
          <ProjectDescription :autSkills="autSkills" :showSkills="true" containerClass="w-full" />
        </div>

        <!-- Mobile Description -->
        <div class="mb-8 mt-8 md:mb-12 md:mt-12 lg:hidden">
          <ProjectDescription :autSkills="autSkills" :showSkills="true" containerClass="w-full" />
        </div>

        <!-- Project Images -->
        <div class="col-span-3 lg:pt-[28vh]">
          <!-- Mobile Slider -->
          <ProjectSlider :images="images" :currentImageIndex="currentImageIndex" @openDialog="openDialog"
            @updateCurrentIndex="updateCurrentIndex" />

          <!-- Desktop Gallery -->
          <ProjectGallery :images="images" :currentImageIndex="currentImageIndex" @openDialog="openDialog"
            @updateCurrentIndex="updateCurrentIndex" />
        </div>
      </div>
    </div>
  </section>

  <!-- Dialog -->
  <ProjectDialog :showDialog="showDialog" :selectedImage="selectedImage" @closeDialog="closeDialog" />
</template>
<style scoped>
@media (max-width: 1024px) {
  .project-image-item {
    opacity: 1;
    transform: none;
  }
}

@media(max-height: 800px) {

}
</style>
