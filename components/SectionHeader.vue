<template>
  <div class="text-center">
    <h2 
      :id="id"
      class="font-heading mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
    >
      {{ title }}
    </h2>
    <p class="mb-12 text-lg text-gray-600 dark:text-gray-300">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: ''
  }
})
</script> 