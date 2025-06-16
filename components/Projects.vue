<template>
  <section
    id="projects"
    class="bg-gradient-to-l from-gray-900 via-indigo-950 to-gray-950 px-4 py-10 sm:px-6 md:py-20 lg:px-8"
  >
    <div class="text-center">
      <h2
        class="animate-fade-in bg-gradient-to-b from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
      >
        Projects
      </h2>
      <p
        class="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-2xl"
      >
        Here are some of the projects I've worked on.
      </p>
    </div>
    <div class="relative flex min-h-screen flex-row">
      <!--Project left bar-->
      <div
        id="projects-searcher"
        class="fixed top-20 left-4 hidden w-48 rounded-lg bg-gray-900/50 p-4 backdrop-blur-sm transition-opacity duration-300 lg:block"
        :class="{ 'opacity-0': !areProjectsVisible, 'opacity-100': areProjectsVisible }"
      >
        <ul class="space-y-2">
          <li
            class="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-300 md:text-base"
          >
            Autogestion
          </li>
          <li
            class="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-300 md:text-base"
          >
            UCN Payroll System
          </li>
        </ul>
      </div>

      <!-- Project Container -->
      <div
        class="relative grid min-h-screen grid-cols-1 gap-4 md:gap-6 lg:ms-[12em] lg:grid-cols-6 lg:gap-8"
      >
        <!-- Sticky Description -->
        <div
          class="project-text sticky top-20 col-span-3 hidden h-[calc(100vh-8rem)] items-center lg:flex"
        >
          <div class="px-2 text-left md:px-4">
            <h3 class="mb-4 font-bold text-cyan-300 sm:text-2xl md:mb-6 lg:text-3xl">
              APS Autogestion
            </h3>
            <p class="mb-4 text-sm leading-relaxed text-gray-400 sm:text-base md:mb-6 md:text-xl">
              <strong class="text-gray-300">Web System for Employee Self-Management</strong><br />
              A web platform that allows employees to manage their own payroll-related tasks and
              requests through a modern, centralized interface.
            </p>
            <ul
              class="mb-4 list-inside list-disc space-y-1 text-sm text-gray-400 sm:text-base md:mb-6 md:space-y-2 md:text-lg"
            >
              <li>Download payment receipts</li>
              <li>Request vacation or leave days</li>
              <li>Access and download company policies</li>
              <li>Receive real-time notifications</li>
              <li>Use customizable report templates</li>
            </ul>
            <p class="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
              Designed to improve communication and streamline HR processes efficiently.
            </p>
          </div>
        </div>

        <!-- Mobile Description (shown only on smaller screens) -->
        <div class="mb-6 md:mb-8 lg:hidden">
          <div class="px-2 text-left md:px-4">
            <h3 class="mb-3 text-xl font-bold text-cyan-300 sm:text-2xl md:mb-4 md:text-3xl">
              APS Autogestion
            </h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-400 sm:text-base md:mb-4 md:text-lg">
              <strong class="text-gray-300">Web System for Employee Self-Management</strong><br />
              A web platform that allows employees to manage their own payroll-related tasks and
              requests through a modern, centralized interface.
            </p>
            <ul
              class="mb-3 list-inside list-disc space-y-1 text-sm text-gray-400 sm:text-base md:mb-4 md:space-y-2 md:text-lg"
            >
              <li>Download payment receipts</li>
              <li>Request vacation or leave days</li>
              <li>Access and download company policies</li>
              <li>Receive real-time notifications</li>
              <li>Use customizable report templates</li>
            </ul>
            <p class="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
              Designed to improve communication and streamline HR processes efficiently.
            </p>
          </div>
        </div>

        <!-- Scrolling Images -->
        <div class="col-span-3 lg:pt-[20vh]">
          <!-- Mobile Slider -->
          <div class="relative lg:hidden">
            <div
              class="image-slider -mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-4 md:-mx-4 md:gap-4 md:px-4 md:pb-6"
            >
              <div
                v-for="(image, index) in images"
                :key="image.name"
                class="project-image-item-mobile w-[85%] flex-none snap-center first:pl-2 last:pr-2 md:first:pl-4 md:last:pr-4"
              >
                <ProjectImage :name="image.name" :image="image.src" @openDialog="openDialog" />
              </div>
            </div>
            <!-- Slider Dots -->
            <div class="mt-3 mb-16 flex justify-center gap-2 md:mt-4 md:mb-20">
              <button
                v-for="(image, index) in images"
                :key="index"
                @click="scrollToImage(index)"
                class="h-2 w-2 rounded-full bg-gray-500 transition-colors"
                :class="{ 'bg-cyan-300': currentImageIndex === index }"
              ></button>
            </div>
          </div>

          <!-- Desktop Vertical Scroll -->
          <div class="hidden space-y-16 md:space-y-20 lg:block">
            <div
              v-for="(image, index) in images"
              :key="image.name"
              class="project-image-item"
              :class="{ 'mb-[20vh]': index === images.length - 1 }"
              :ref="
                (el) => {
                  if (el) projectRefs[index] = el
                }
              "
            >
              <ProjectImage
                :name="image.name"
                :image="image.src"
                @openDialog="openDialog"
                :ref="
                  (el) => {
                    if (el) videoRefs[index] = el
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Dialog -->
  <Transition name="fade">
    <div
      v-if="showDialog"
      class="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      @click.self="closeDialog"
    >
      <div class="relative w-full max-w-3xl rounded-xl bg-gray-900 p-4">
        <button
          class="absolute top-2 right-3 text-2xl text-white hover:text-red-400"
          @click="closeDialog"
        >
          &times;
        </button>
        <video
          :src="selectedImage"
          class="w-full rounded-lg"
          autoplay
          loop
          muted
          playsinline
          controls
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const showDialog = ref(false)
const selectedImage = ref('')
const currentImageIndex = ref(0)
const lenis = ref(null)
const rafId = ref(null)
const projectRefs = ref([])
const videoRefs = ref([])
const areProjectsVisible = ref(false)

function openDialog(image) {
  selectedImage.value = image
  showDialog.value = true
}

function closeDialog() {
  selectedImage.value = false
  showDialog.value = false
}

function scrollToImage(index) {
  const slider = document.querySelector('.image-slider')
  const images = slider.querySelectorAll('.project-image-item')
  if (images[index]) {
    images[index].scrollIntoView({ behavior: 'smooth', inline: 'center' })
    currentImageIndex.value = index
  }
}

const isMobile = ref(false)
function handleResize() {
  isMobile.value = window.innerWidth < 1024
  setupAnimations()
}

function initLenis() {
  if (lenis.value) {
    lenis.value.destroy()
    lenis.value = null
  }

  lenis.value = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  })

  function raf(time) {
    if (lenis.value) {
      lenis.value.raf(time)
      rafId.value = requestAnimationFrame(raf)
    }
  }

  rafId.value = requestAnimationFrame(raf)
}

function setupAnimations() {
  // Clear any existing ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  if (!isMobile.value) {
    // Initialize Lenis only on desktop
    if (!lenis.value) {
      initLenis()
    }

    // Desktop animations
    const images = gsap.utils.toArray('.project-image-item')

    // Set initial state
    // $gsap.set(images, { opacity: 0, y: 0 })

    images.forEach((image, index) => {
      // Create a timeline for each images
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            currentImageIndex.value = index
            // Fade out all other images
            images.forEach((img, i) => {
              if (i !== index) {
                gsap.to(img, {
                  opacity: 0,
                  duration: 0.5,
                  x: 0,
                  ease: 'power2.inOut',
                })
                videoRefs.value[i].pause()
              }
            })
            // Fade in current image
            gsap.to(image, {
              opacity: 1,
              duration: 0.5,
              x: -20,
              ease: 'power2.inOut',
              onStart: () => {
                videoRefs.value[index].play()
              },
            })
          },
          onLeaveBack: () => {
            if (index > 0) {
              // Fade out current image
              gsap.to(image, {
                opacity: 0,
                duration: 0.5,
                x: 20,
                ease: 'power2.inOut',
              })
              // Fade in previous image
              gsap.to(images[index - 1], {
                opacity: 1,
                duration: 0.5,
                x: -20,
                ease: 'power2.inOut',
                onStart: () => {
                  videoRefs.value[index - 1].play()
                },
              })
            }
          },
        },
      })
    })
  } else {
    // Cleanup Lenis on mobile
    if (lenis.value) {
      lenis.value.destroy()
      lenis.value = null
    }
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
      rafId.value = null
    }

    // Reset all images to visible state on mobile
    gsap.utils.toArray('.project-image-item').forEach((image) => {
      gsap.set(image, {
        clearProps: 'all',
        opacity: 1,
        x: 0,
      })
    })
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

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

  // Setup intersection observer for slider
  const sliderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target)
          currentImageIndex.value = index
        }
      })
    },
    { threshold: 0.7 },
  )

  // Observe all slider items
  document.querySelectorAll('.project-image-item').forEach((image) => {
    sliderObserver.observe(image)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (lenis.value) {
    lenis.value.destroy()
    lenis.value = null
  }
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})

const images = [
  { name: 'Autogestion-login', src: '/projects/aut/profile.webm' },
  { name: 'PTOS', src: '/projects/aut/ptos.webm' },
  { name: 'Letters', src: '/projects/aut/letters.webm' },
]
</script>

<style scoped>
.project-text {
  will-change: transform;
}

.project-image-item {
  will-change: transform, opacity;
}

.image-slider {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.image-slider::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1024px) {
  .project-image-item {
    opacity: 1;
    transform: none;
  }
}
</style>
