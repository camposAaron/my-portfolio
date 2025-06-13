<script setup>
defineProps({
  customClass: String,
})
</script>
<template>
  <div :class="customClass">
    <a
      href="/"
      class="flex items-center font-bold text-gray-100 transition duration-150 ease-in-out hover:text-white dark:text-gray-200 dark:hover:text-white"
    >
      <span
        >&lt;/Aaron<span class="font-mono text-cyan-400 text-shadow-cyan-800"
          >DEV</span
        >&gt;</span
      >
    </a>
  </div>
</template>
