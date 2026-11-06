import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Runs a looping element (a CSS animation or a <video>) only while it is on screen,
 * holds it under prefers-reduced-motion, and exposes a toggle for a visible Pause button.
 * With `pauseOnHover`, hovering or focusing inside the element also pauses it.
 * The element carries `data-loop`; CSS pauses its animations unless it has `.is-running`.
 */
export function useLoop(el: Ref<HTMLElement | null>, { pauseOnHover = false } = {}) {
  const held = ref(false)
  const state = { seen: false, hover: false, focus: false }
  let io: IntersectionObserver | null = null
  const listeners: Array<[string, () => void]> = []

  function sync() {
    const node = el.value
    if (!node) return
    const run = state.seen && !state.hover && !state.focus && !held.value
    node.classList.toggle('is-running', run)
    node.querySelectorAll('video').forEach((v) => {
      if (run) v.play().catch(() => {})
      else v.pause()
    })
  }

  function toggle() {
    held.value = !held.value
    sync()
  }

  onMounted(() => {
    const node = el.value
    if (!node) return
    held.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pauseOnHover) {
      const pairs: Array<[string, keyof typeof state, boolean]> = [
        ['pointerenter', 'hover', true],
        ['pointerleave', 'hover', false],
        ['focusin', 'focus', true],
        ['focusout', 'focus', false],
      ]
      for (const [type, key, value] of pairs) {
        const fn = () => { state[key] = value; sync() }
        node.addEventListener(type, fn)
        listeners.push([type, fn])
      }
    }
    io = new IntersectionObserver(([entry]) => { state.seen = entry.isIntersecting; sync() })
    io.observe(node)
  })

  onUnmounted(() => {
    io?.disconnect()
    const node = el.value
    if (node) listeners.forEach(([type, fn]) => node.removeEventListener(type, fn))
  })

  return { held, toggle }
}
