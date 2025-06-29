<template>
  <div class="hidden space-y-20 md:space-y-24 lg:block">
    <div
      v-for="(image, index) in images"
      :key="image.name"
      class="project-image-item"
      :class="{ 'mb-[24vh]': index === images.length - 1 }"
      :ref="
        (el) => {
          if (el) projectRefs[index] = el
        }
      "
    >
      <ProjectImage
        :name="image.name"
        :image="image.src"
        @openDialog="$emit('openDialog', $event)"
        :ref="
          (el) => {
            if (el) videoRefs[index] = el
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  currentImageIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['openDialog', 'updateCurrentIndex'])

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const projectRefs = ref([])
const videoRefs = ref([])
let scrollTriggers = []

function setupAnimations() {
  // Clear any existing ScrollTriggers
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  if (!gsap || !ScrollTrigger) return

  // Desktop animations
  const images = gsap.utils.toArray('.project-image-item')

  images.forEach((image, index) => {
    // Create a timeline for each image
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          emit('updateCurrentIndex', index)
          // Fade out all other images
          images.forEach((img, i) => {
            if (i !== index) {
              gsap.to(img, {
                opacity: 0,
                duration: 0.5,
                x: 0,
                ease: 'power2.inOut',
              })
              if (videoRefs.value[i]) {
                videoRefs.value[i].pause()
              }
            }
          })
          // Fade in current image
          gsap.to(image, {
            opacity: 1,
            duration: 0.5,
            x: -20,
            ease: 'power2.inOut',
            onStart: () => {
              if (videoRefs.value[index]) {
                videoRefs.value[index].play()
              }
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
                if (videoRefs.value[index - 1]) {
                  videoRefs.value[index - 1].play()
                }
              },
            })
          }
        },
      },
    })

    // Store ScrollTrigger for cleanup
    if (tl.scrollTrigger) {
      scrollTriggers.push(tl.scrollTrigger)
    }
  })
}

onMounted(() => {
  setupAnimations()
})

onUnmounted(() => {
  // Clean up ScrollTriggers
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
})
</script>

<style scoped>
.project-image-item {
  will-change: transform, opacity;
}
</style> 