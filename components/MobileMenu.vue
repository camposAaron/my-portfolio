<script setup>
    defineProps({
        mobileMenuOpen: {
            type: Boolean,
            required: true
        },
        navLinks: {
            type: Array,
            required: true
        }
    })
</script>
<template>
     <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
      >
          <div v-show="mobileMenuOpen" class="md:hidden absolute w-full bg-gray-700
           dark:bg-gray-800 border-tborder-gray-500 dark:border-gray-700" id="mobile-menu">
              <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    v-for="link in navLinks"
                    :key="link.href + '-mobile'"
                    :href="link.href"
                    @click="mobileMenuOpen = false"  
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 dark:text-gray-300 
                    hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 
                    focus:ring-white transition duration-150 ease-in-out"
                  >
                    {{ link.text }}
                  </a>
              </div>
          </div>
      </transition>
</template>
