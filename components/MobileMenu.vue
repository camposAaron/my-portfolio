<script setup>
const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    required: true,
  },
  navLinks: {
    type: Array,
    required: true,
  },
  scrollToSection: {
    type: Function,
    required: false,
  },
})
const emit = defineEmits(['update:mobileMenuOpen'])

function handleMenuClick(href) {
  if (props.scrollToSection) {
    props.scrollToSection(href)
  }
  emit('update:mobileMenuOpen', false)
}
</script>

<template>
  <transition name="menu">
    <div
      v-show="mobileMenuOpen"
      class="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      @keydown.esc="emit('update:mobileMenuOpen', false)"
    >
      <div class="menu__top">
        <Logo />
        <button type="button" class="icon-btn" aria-label="Close the menu" @click="emit('update:mobileMenuOpen', false)">
          <Icon name="heroicons:x-mark-16-solid" />
        </button>
      </div>
      <nav class="menu__links" aria-label="Sections">
        <a
          v-for="link in navLinks"
          :key="link.href + '-mobile'"
          :href="link.href"
          @click.prevent="handleMenuClick(link.href)"
        >
          {{ link.text }}
        </a>
      </nav>
    </div>
  </transition>
</template>
