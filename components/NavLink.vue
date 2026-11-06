<script setup>
const emit = defineEmits(['click'])
defineProps({
  href: String,
  text: String,
  customClass: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <a
    :key="href"
    :href="href"
    :class="customClass"
    @click="$emit('click', $event)"
  >
    <slot name="icon"></slot>
    <span>{{ text }}</span>
  </a>
</template>
