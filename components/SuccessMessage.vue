<template>
  <div v-if="show" class="success-message mt-8 rounded-lg bg-green-100 p-4 text-green-800" role="alert">
    <div class="flex items-center">
      <Icon name="heroicons:check-circle" class="mr-2 h-5 w-5" />
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Message sent successfully! I\'ll get back to you soon.'
  }
})
</script> 