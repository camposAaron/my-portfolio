<script setup>
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
    class="hover:cursor-pointerdark:hover:text-white flex flex-row items-center rounded-md font-medium text-gray-300 transition duration-150 ease-in-out hover:text-cyan-400 dark:text-gray-300"
  >
    <slot name="icon"></slot>
    <span class="ml-1 mt-1">{{ text }}</span>
  </a>
</template>
