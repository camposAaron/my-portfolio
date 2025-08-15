import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useShortHeightScreen composable
 * Tracks if the viewport height is less than or equal to 800px.
 * Returns a ref<boolean> that updates on resize.
 */
export function useShortHeightScreen(maxHeight = 800) {
  const isShortHeightScreen = ref(false)

  function update() {
    if (typeof window !== 'undefined') {
      isShortHeightScreen.value = window.matchMedia(`(max-height: ${maxHeight}px)`).matches
    }
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return isShortHeightScreen
}
