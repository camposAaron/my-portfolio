<template>
  <nav class="hidden items-center space-x-6 md:flex lg:space-x-8">
    <NavLink
      class="px-1 focus:ring-2 focus:ring-white focus:ring-offset-gray-800 focus:outline-none dark:hover:bg-gray-700"
      v-for="link in navLinks"
      :key="link.href"
      :href="link.href"
      :text="link.text"
      @click.prevent="props.scrollToSection ? props.scrollToSection(link.href) : null"
    />
  </nav>
</template>
<script setup>
const props = defineProps({
  navLinks: {
    type: Array,
    required: true,
  },
  scrollToSection: {
    type: Function,
    required: false,
  },
})
</script>
