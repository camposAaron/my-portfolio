<template>
  <div v-if="show" class="success-message notice" role="alert">
    <Icon name="heroicons:check-circle" />
    <span>{{ message || $t('form.sent') }}</span>
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
    default: ''
  }
})
</script>
