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
    <div id="description-container" class="flex flex-col px-4 text-left md:px-6">
      <h3
        class="font-heading mb-4 font-bold text-cyan-300 sm:mb-6 sm:text-2xl md:mb-8 md:text-xl lg:mb-6 lg:text-3xl"
      >
        APS Autogestion
      </h3>
      <p id="description-paragraph"
        class="short-screen font-body mb-4 text-sm leading-relaxed text-gray-400 sm:mb-6 sm:text-base md:mb-8 md:text-xl"
      >
        <strong class="text-gray-300">Web System for Employee Self-Management</strong><br />
        A web platform that allows employees to manage their own payroll-related tasks and
        requests through a modern, centralized interface.
      </p>
      <ul id="description-list"
        class="short-screen mb-4 list-inside list-disc space-y-1.5 text-sm text-gray-400 sm:mb-6 sm:space-y-2 sm:text-base md:mb-8 md:space-y-3 md:text-lg"
      >
        <li>Download payment receipts</li>
        <li>Request vacation or leave days</li>
        <li>Access and download company policies</li>
        <li>Receive real-time notifications</li>
        <li>Use customizable report templates</li>
      </ul>
      <p class="short-screen text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
        Designed to improve communication and streamline HR processes efficiently.
      </p>
      <ProjectSkills v-if="showSkills" :autSkills="autSkills" class="mt-6 short-screen" />
    </div>
  </div>
</template>
<style scoped>
  @media(max-height: 800px) {

    h3 {
      padding-top: 2rem;
      font-size: 1.5rem;
    }

    #description-container{
      padding: 0 16px;
    }

    .short-screen {
      font-size: 14px;
    }
  }
</style>
