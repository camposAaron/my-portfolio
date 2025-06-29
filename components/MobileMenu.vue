<script setup>
import { ref } from 'vue'
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
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-show="mobileMenuOpen"
      class="fixed inset-0 z-100 md:hidden flex items-center justify-center"
      @click="emit('update:mobileMenuOpen', false)"
    >
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <div 
          class="w-full max-w-sm bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col justify-center mx-auto"
          @click.stop
        >
          <div class="px-6 py-8 text-center border-b border-gray-700/50">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Menu
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mt-3"></div>
          </div>
          <div class="px-4 py-6 space-y-2">
            <transition-group
              name="menu-item"
              appear
              tag="div"
              class="space-y-2"
            >
              <a
                v-for="(link, index) in navLinks"
                :key="link.href + '-mobile'"
                :href="link.href"
                @click.prevent="handleMenuClick(link.href)"
                class="group block relative overflow-hidden rounded-2xl px-6 py-4 text-lg font-semibold text-gray-200 transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                :style="{ animationDelay: `${index * 40}ms` }"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div class="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-400/30 transition-colors duration-200"></div>
                <div class="relative flex items-center justify-between">
                  <span class="group-hover:text-cyan-300 transition-colors duration-200">
                    {{ link.text }}
                  </span>
                  <div class="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110 flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </transition-group>
          </div>
          <div class="px-6 py-4 text-center border-t border-gray-700/50">
            <button
              @click="emit('update:mobileMenuOpen', false)"
              class="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.menu-item-enter-active,
.menu-item-leave-active {
  transition: all 0.3s ease;
}

.menu-item-enter-from {
  opacity: 0;
  transform: translateX(-16px);
}

.menu-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.menu-item-move {
  transition: transform 0.3s ease;
}
</style>
