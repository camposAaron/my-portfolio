<script setup>
defineProps({
  containerClass: {
    type: String,
    default: ''
  },
  showSkills: {
    type: Boolean,
    default: true
  },
  autSkills: {
    type: Array,
    default: () => []
  }
})
</script> 
<template>
  <div :class="containerClass">
    <div class="flex flex-col px-4 text-left md:px-6">
      <h3
        class="font-heading mb-6 font-bold text-cyan-300 sm:text-2xl md:mb-8 md:text-xl lg:text-3xl"
      >
        APS Autogestion
      </h3>
      <p
        class="font-body mb-6 text-sm leading-relaxed text-gray-400 sm:text-base md:mb-8 md:text-xl"
      >
        <strong class="text-gray-300">Web System for Employee Self-Management</strong><br />
        A web platform that allows employees to manage their own payroll-related tasks and
        requests through a modern, centralized interface.
      </p>
      <ul
        class="mb-6 list-inside list-disc space-y-2 text-sm text-gray-400 sm:text-base md:mb-8 md:space-y-3 md:text-lg"
      >
        <li>Download payment receipts</li>
        <li>Request vacation or leave days</li>
        <li>Access and download company policies</li>
        <li>Receive real-time notifications</li>
        <li>Use customizable report templates</li>
      </ul>
      <p class="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
        Designed to improve communication and streamline HR processes efficiently.
      </p>
      <ProjectSkills v-if="showSkills" :autSkills="autSkills" class="mt-6" />
    </div>
  </div>
</template>
<style scoped>

</style>
