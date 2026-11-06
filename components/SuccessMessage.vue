<template>
  <div v-if="show" class="success-message notice" role="alert">
    <Icon name="heroicons:check-circle" />
    <span>{{ message }}</span>
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
    default: 'Message sent. Thanks for writing.'
  }
})
</script>
