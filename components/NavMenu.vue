<template>
  <nav class="nav" aria-label="Sections">
    <NavLink
      v-for="link in navLinks"
      :key="link.href"
      :href="link.href"
      :text="link.text"
      :class="{ 'is-active': props.activeHref === link.href }"
      :aria-current="props.activeHref === link.href ? 'true' : undefined"
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
  activeHref: {
    type: String,
    default: '',
  },
})
</script>
