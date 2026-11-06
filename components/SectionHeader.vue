<template>
  <div class="head">
    <h2 :id="id">
      {{ title }}
    </h2>
    <p class="lead">
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
