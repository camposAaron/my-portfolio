<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isDarkMode = ref(false) 

// Scroll handling
const handleScroll = () => {
	isScrolled.value = window.scrollY > 20 // Trigger scroll effect slightly earlier
}

const navLinks = ref([
    { href: "#about", text: "About" },
    { href: "#skills", text: "Skills" },
    { href: "#projects", text: "Projects" },
    { href: "#contact", text: "Contact" },
])

// Dark mode handling
const checkDarkModePreference = () => {
	// Check local storage first, then system preference
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark") // Use documentElement for Tailwind 'class' strategy
		isDarkMode.value = true
		localStorage.setItem("theme", "dark") // Explicitly set storage if using system preference initially
	} else {
		document.documentElement.classList.remove("dark")
		isDarkMode.value = false
		localStorage.setItem("theme", "light")
	}
}

const toggleDarkMode = () => {
	if (isDarkMode.value) {
		document.documentElement.classList.remove("dark")
		localStorage.theme = "light"
		isDarkMode.value = false
	} else {
		document.documentElement.classList.add("dark")
		localStorage.theme = "dark"
		isDarkMode.value = true
	}
}

onMounted(() => {
	window.addEventListener("scroll", handleScroll)
	checkDarkModePreference() // Check dark mode on mount

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", checkDarkModePreference)
})

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll)
	// Optional: Clean up system preference listener
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.removeEventListener("change", checkDarkModePreference)
})
</script>
  
  <style scoped>
  header {
    transition-property: background-color, box-shadow, height, border-color; /* Include height and border */
  }
  </style>
<template>
    <header
      class="sticky top-0 z-50 w-full transition-all duration-300 ease-in-out"
      :class="[
        isScrolled
          ? ' dark:bg-gray-900 shadow-md h-16' // Scrolled state: slightly darker, shadow, standard height
          : ' dark:bg-gray-900 h-20', // Initial state: slightly taller
        'border-b border-gray-500 dark:border-gray-700' // Consistent bottom border
      ]"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        <Logo class="flex-shrink-0 text-xl"/>
        <NavMenu class="text-sm not-[]:hidden md:flex space-x-6 lg:space-x-8 items-center" :navLinks="navLinks"/>  
        <div class="flex items-center space-x-4">
          <ToggleButton :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'" @toggle="toggleDarkMode">
          </ToggleButton>
          <div class="md:hidden">
            <ToggleButton aria-label="Toggle mobile menu" @toggle="mobileMenuOpen = !mobileMenuOpen">
            </ToggleButton> 
          </div>
        </div>
      </div>
      <MobileMenu :mobileMenuOpen="mobileMenuOpen" :navLinks="navLinks"/>
    </header>
  </template>