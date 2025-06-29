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
    class="hover:cursor-pointer flex flex-row items-center rounded-md font-medium text-gray-300 transition duration-150 ease-in-out hover:text-cyan-400 dark:text-gray-300"
    @click="$emit('click', $event)"
  >
    <slot name="icon"></slot>
    <span class="m-1 font-heading">{{ text }}</span>
  </a>
</template>
