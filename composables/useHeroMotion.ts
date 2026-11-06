import { ref } from 'vue'

// Shared pause state for everything that moves in the hero (the cube and the ASCII field),
// so the one Pause button under the cube stops both.
const held = ref(false)

export function useHeroMotion() {
  return { held }
}
