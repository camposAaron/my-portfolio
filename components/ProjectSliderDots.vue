<template>
  <div class="slider-dots mt-6 mb-20 flex justify-center gap-3 md:mt-8 md:mb-24">
    <button
      v-for="(image, index) in images"
      :key="index"
      @click="$emit('scrollToImage', index)"
      class="h-3 w-3 rounded-full bg-gray-600 transition-all duration-200 hover:bg-gray-400"
      :class="{ 'scale-110 bg-cyan-300': currentImageIndex === index }"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true
  },
  currentImageIndex: {
    type: Number,
    default: 0
  }
})

defineEmits(['scrollToImage'])
</script> 