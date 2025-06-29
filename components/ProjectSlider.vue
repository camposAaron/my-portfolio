<template>
  <div class="relative lg:hidden">
    <div
      ref="sliderRef"
      class="image-slider flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-6 md:gap-6 md:px-6 md:pb-8"
      style="-webkit-overflow-scrolling: touch; touch-action: pan-x; scrollbar-width: none"
    >
      <div
        v-for="(image, index) in images"
        :key="image.name"
        class="project-image-item-mobile w-[calc(100vw-6rem)] max-w-[calc(100vw-2rem)] flex-none snap-center md:w-[calc(100vw-3rem)] md:max-w-[calc(100vw-3rem)]"
      >
        <ProjectImage :name="image.name" :image="image.src" @openDialog="$emit('openDialog', $event)" />
      </div>
    </div>
    <ProjectSliderDots 
      :images="images" 
      :currentImageIndex="currentImageIndex" 
      @scrollToImage="scrollToImage" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

const sliderRef = ref(null)

function scrollToImage(index) {
  const slider = sliderRef.value
  if (!slider) return
  
  const images = slider.querySelectorAll('.project-image-item-mobile')
  if (images[index]) {
    images[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    emit('updateCurrentIndex', index)
  }
}

onMounted(() => {
  // Setup intersection observer for slider
  const sliderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target)
          emit('updateCurrentIndex', index)
        }
      })
    },
    { threshold: 0.7 },
  )

  // Observe all slider items
  if (sliderRef.value) {
    sliderRef.value.querySelectorAll('.project-image-item-mobile').forEach((image) => {
      sliderObserver.observe(image)
    })
  }
})
</script>

<style scoped>
.image-slider {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-x;
}

.image-slider::-webkit-scrollbar {
  display: none;
}

.project-image-item-mobile {
  min-width: 0;
  flex-shrink: 0;
}
</style> 